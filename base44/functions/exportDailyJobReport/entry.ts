import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SPREADSHEET_TITLE = "Waiyaki Roadside — Daily Job Reports";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("googlesheets");

    // Determine date range for "yesterday" or use provided date
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const targetDate = body.date
      ? new Date(body.date)
      : (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d; })();

    const dateStr = targetDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const startOfDay = new Date(dateStr + 'T00:00:00.000Z').toISOString();
    const endOfDay   = new Date(dateStr + 'T23:59:59.999Z').toISOString();

    // Fetch all jobs for that day
    const allJobs = await base44.asServiceRole.entities.Job.list('-created_date', 500);
    const dayJobs = allJobs.filter(j => j.created_date >= startOfDay && j.created_date <= endOfDay);

    // --- Find or create the master spreadsheet ---
    // Search Drive for existing spreadsheet
    const searchRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=name='${SPREADSHEET_TITLE}'+and+mimeType='application/vnd.google-apps.spreadsheet'+and+trashed=false&fields=files(id,name)`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const searchData = await searchRes.json();
    let spreadsheetId = searchData.files?.[0]?.id;

    if (!spreadsheetId) {
      // Create a new spreadsheet
      const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ properties: { title: SPREADSHEET_TITLE } }),
      });
      const created = await createRes.json();
      spreadsheetId = created.spreadsheetId;
    }

    // --- Ensure a sheet tab for this date exists ---
    const sheetTitle = dateStr;

    // Get existing sheets
    const ssRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const ssData = await ssRes.json();
    const existingSheets = ssData.sheets?.map(s => s.properties.title) || [];

    if (!existingSheets.includes(sheetTitle)) {
      // Add new sheet tab
      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{ addSheet: { properties: { title: sheetTitle } } }]
        })
      });
    }

    // --- Build rows ---
    const headers = [
      'Job ID', 'Member Name', 'Member Phone', 'Service', 'Vehicle Type',
      'Location', 'Status', 'Price (KES)', 'Mechanic Share (KES)',
      'Payment Status', 'M-PESA Ref', 'Rating', 'Rating Note',
      'Accepted At', 'Arrived At', 'Completed At', 'Created At'
    ];

    const rows = dayJobs.map(j => [
      j.id,
      j.member_name || '',
      j.member_phone || '',
      j.service_type_name || '',
      j.vehicle_type || '',
      j.location_description || '',
      j.status || '',
      j.price_kes || 0,
      j.price_kes ? Math.round(j.price_kes * 0.8) : 0,
      j.payment_status || '',
      j.mpesa_reference || '',
      j.rating_stars || '',
      j.rating_note || '',
      j.accepted_at ? new Date(j.accepted_at).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }) : '',
      j.arrived_at ? new Date(j.arrived_at).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }) : '',
      j.completed_at ? new Date(j.completed_at).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }) : '',
      new Date(j.created_date).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
    ]);

    // Summary row
    const totalRevenue = dayJobs.reduce((s, j) => s + (j.price_kes || 0), 0);
    const completedJobs = dayJobs.filter(j => j.status === 'completed');
    const avgRating = completedJobs.filter(j => j.rating_stars).length > 0
      ? (completedJobs.filter(j => j.rating_stars).reduce((s, j) => s + j.rating_stars, 0) / completedJobs.filter(j => j.rating_stars).length).toFixed(1)
      : 'N/A';

    const summaryRows = [
      [],
      ['SUMMARY'],
      ['Total Jobs', dayJobs.length],
      ['Completed', completedJobs.length],
      ['Cancelled', dayJobs.filter(j => j.status === 'cancelled').length],
      ['Total Revenue (KES)', totalRevenue],
      ['Mechanic Payout (KES)', Math.round(totalRevenue * 0.8)],
      ['Waiyaki Commission (KES)', Math.round(totalRevenue * 0.2)],
      ['Average Rating', avgRating],
    ];

    const allRows = [headers, ...rows, ...summaryRows];

    // --- Write to sheet ---
    const range = `'${sheetTitle}'!A1`;
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ range, majorDimension: 'ROWS', values: allRows })
      }
    );

    const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;

    return Response.json({
      success: true,
      date: dateStr,
      jobs_exported: dayJobs.length,
      spreadsheet_url: sheetUrl,
      message: `Exported ${dayJobs.length} jobs for ${dateStr} to Google Sheets.`
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});