import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle, Navigation, Loader2, TrendingUp, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/JobCard";
import StatusBadge from "@/components/StatusBadge";
import PullToRefresh from "@/components/PullToRefresh";
import { format, startOfWeek, startOfMonth } from "date-fns";

const NEXT_STATUS = { accepted: "en_route", en_route: "arrived", arrived: "completed" };
const NEXT_LABEL  = { accepted: "🚗 Mark En Route", en_route: "📍 Mark Arrived", arrived: "✅ Mark Job Complete" };

export default function MechanicDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeJob, setActiveJob] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [mechanicNotes, setMechanicNotes] = useState("");
  const [statusRecord, setStatusRecord] = useState(null);
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [view, setView] = useState("jobs");

  const load = useCallback(async () => {
    const all = await base44.entities.Job.list("-created_date", 100);
    setJobs(all);
    const active = all.find(j => ["accepted","en_route","arrived"].includes(j.status));
    if (active) { setActiveJob(active); setMechanicNotes(active.mechanic_notes || ""); }
    else setActiveJob(null);
    setLoading(false);
  }, []);

  const loadStatus = useCallback(async () => {
    const records = await base44.entities.MechanicStatus.list();
    if (records.length > 0) setStatusRecord(records[0]);
    else {
      const rec = await base44.entities.MechanicStatus.create({ is_available: true, last_active: new Date().toISOString() });
      setStatusRecord(rec);
    }
  }, []);

  useEffect(() => {
    load();
    loadStatus();
    const i = setInterval(load, 8000);
    return () => clearInterval(i);
  }, [load, loadStatus]);

  const handleRefresh = useCallback(async () => {
    await Promise.all([load(), loadStatus()]);
  }, [load, loadStatus]);

  const toggleAvailability = async () => {
    if (!statusRecord) return;
    setTogglingStatus(true);
    const updated = await base44.entities.MechanicStatus.update(statusRecord.id, {
      is_available: !statusRecord.is_available,
      last_active: new Date().toISOString(),
    });
    setStatusRecord(updated);
    setTogglingStatus(false);
  };

  const accept = async (job) => {
    setUpdating(true);
    // Optimistic update
    const optimistic = { ...job, status: "accepted", accepted_at: new Date().toISOString() };
    setActiveJob(optimistic);
    setJobs(prev => prev.map(j => j.id === job.id ? optimistic : j));
    setMechanicNotes("");
    const updated = await base44.entities.Job.update(job.id, { status: "accepted", accepted_at: optimistic.accepted_at });
    setActiveJob(updated);
    await load();
    setUpdating(false);
    base44.integrations.Core.SendEmail({
      to: "sustainthevoices@gmail.com",
      subject: `✅ Job Accepted — ${job.service_type_name} — ${job.member_name}`,
      body: `Prince Waiyaki has accepted a job.\n\nJob ID: ${job.id}\nService: ${job.service_type_name} — KES ${job.price_kes}\nMember: ${job.member_name} — ${job.member_phone}\nVehicle: ${job.vehicle_type}\nLocation: ${job.location_description}\n\nAccepted at: ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}`,
    }).catch(() => {});
  };

  const decline = async (job) => {
    setUpdating(true);
    await base44.entities.Job.update(job.id, { status: "cancelled" });
    await load();
    setUpdating(false);
  };

  const advance = async () => {
    if (!activeJob) return;
    setUpdating(true);
    const next = NEXT_STATUS[activeJob.status];
    // Optimistic update
    setActiveJob(prev => prev ? { ...prev, status: next } : null);
    const extra = {};
    if (next === "arrived") extra.arrived_at = new Date().toISOString();
    if (next === "completed") extra.completed_at = new Date().toISOString();
    if (mechanicNotes) extra.mechanic_notes = mechanicNotes;
    const updated = await base44.entities.Job.update(activeJob.id, { status: next, ...extra });
    if (next === "completed") {
      setActiveJob(null);
      base44.integrations.Core.SendEmail({
        to: "sustainthevoices@gmail.com",
        subject: `🏁 Job Complete — ${activeJob.service_type_name} — ${activeJob.member_name}`,
        body: `Job complete.\n\nJob ID: ${activeJob.id}\nService: ${activeJob.service_type_name} — KES ${activeJob.price_kes}\nMember: ${activeJob.member_name} — ${activeJob.member_phone}\nMechanic Notes: ${mechanicNotes || "None"}\n\nCompleted at: ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}`,
      }).catch(() => {});
    } else setActiveJob(updated);
    await load();
    setUpdating(false);
  };

  const pending = jobs.filter(j => j.status === "pending");
  const history = jobs.filter(j => ["completed","cancelled"].includes(j.status));
  const completed = jobs.filter(j => j.status === "completed");

  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const monthStart = startOfMonth(now);
  const weekEarnings = completed.filter(j => new Date(j.created_date) >= weekStart).reduce((s, j) => s + Math.round((j.price_kes || 0) * 0.8), 0);
  const monthEarnings = completed.filter(j => new Date(j.created_date) >= monthStart).reduce((s, j) => s + Math.round((j.price_kes || 0) * 0.8), 0);
  const todayJobs = completed.filter(j => format(new Date(j.created_date), "yyyy-MM-dd") === format(now, "yyyy-MM-dd"));

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <span className="text-amber-400 font-black text-lg">W</span>
          </div>
          <div className="flex-1">
            <h1 className="font-black text-gray-900 text-xl">WAIYAKI — Mechanic</h1>
            <p className="text-sm text-gray-500">Prince Waiyaki (Boss) · Limuru Area</p>
          </div>
        </div>

        {/* Availability Toggle */}
        {statusRecord && (
          <div className={`rounded-2xl p-4 mb-5 flex items-center justify-between ${statusRecord.is_available ? "bg-green-50 border-2 border-green-400" : "bg-gray-100 border-2 border-gray-300"}`}>
            <div>
              <p className={`font-black text-lg ${statusRecord.is_available ? "text-green-800" : "text-gray-600"}`}>
                {statusRecord.is_available ? "🟢 Available" : "🔴 Busy / Off"}
              </p>
              <p className="text-sm text-gray-500">Tap to change your status</p>
            </div>
            <button onClick={toggleAvailability} disabled={togglingStatus} className="text-gray-600">
              {togglingStatus ? <Loader2 className="w-7 h-7 animate-spin" /> :
                statusRecord.is_available ? <ToggleRight className="w-12 h-12 text-green-500" /> : <ToggleLeft className="w-12 h-12 text-gray-400" />}
            </button>
          </div>
        )}

        {/* View Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5">
          {[{ id: "jobs", label: "Jobs" }, { id: "earnings", label: "My Earnings" }].map(t => (
            <button key={t.id} onClick={() => setView(t.id)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${view === t.id ? "bg-white shadow text-gray-900" : "text-gray-500"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {loading && <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-amber-500" /></div>}

        {view === "jobs" && !loading && (
          <>
            {activeJob && (
              <div className="bg-gray-900 text-white rounded-2xl p-5 mb-6 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-amber-400 font-bold text-sm uppercase tracking-wide">🔧 Active Job</span>
                  <StatusBadge status={activeJob.status} />
                </div>
                <p className="font-black text-2xl mb-1">{activeJob.service_type_name}</p>
                <p className="text-amber-400 font-bold text-xl mb-4">KES {activeJob.price_kes?.toLocaleString()}</p>
                <div className="space-y-1.5 text-sm text-gray-300 mb-4">
                  <p>👤 <strong className="text-white">{activeJob.member_name}</strong></p>
                  <p>📱 <a href={`tel:${activeJob.member_phone}`} className="text-amber-400 font-bold text-lg">{activeJob.member_phone}</a></p>
                  <p>🚗 {activeJob.vehicle_type}</p>
                  <p>📍 {activeJob.location_description}</p>
                  {activeJob.member_notes && <p>📝 {activeJob.member_notes}</p>}
                  {activeJob.latitude && (
                    <a href={`https://maps.google.com/?q=${activeJob.latitude},${activeJob.longitude}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 text-amber-400 hover:underline">
                      <Navigation className="w-3.5 h-3.5" /> Open in Google Maps
                    </a>
                  )}
                </div>
                <div className="mb-4">
                  <label className="text-xs text-gray-400 block mb-1">Mechanic notes (optional)</label>
                  <textarea
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
                    rows={2}
                    placeholder="e.g. Nail in tyre, patched successfully"
                    value={mechanicNotes}
                    onChange={e => setMechanicNotes(e.target.value)}
                  />
                </div>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-black py-4 text-lg rounded-xl" onClick={advance} disabled={updating}>
                  {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : NEXT_LABEL[activeJob.status]}
                </Button>
              </div>
            )}

            {!activeJob && pending.length > 0 && (
              <div className="mb-6">
                <h2 className="font-bold text-gray-800 mb-3 text-lg">Incoming Requests ({pending.length})</h2>
                <div className="space-y-3">
                  {pending.map(job => (
                    <JobCard key={job.id} job={job} actions={
                      <>
                        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3" onClick={() => accept(job)} disabled={updating}>
                          {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : "✓ Accept Job"}
                        </Button>
                        <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 py-3" onClick={() => decline(job)} disabled={updating}>
                          Decline
                        </Button>
                      </>
                    } />
                  ))}
                </div>
              </div>
            )}

            {!activeJob && pending.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <CheckCircle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="font-medium text-gray-500">No pending requests</p>
                <p className="text-sm mt-1">New jobs will appear here automatically.</p>
              </div>
            )}

            {todayJobs.length > 0 && (
              <div className="mb-4">
                <h2 className="font-bold text-gray-800 mb-3">Completed Today ({todayJobs.length})</h2>
                <div className="space-y-2">
                  {todayJobs.map(job => (
                    <div key={job.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex justify-between items-center">
                      <div><p className="font-semibold text-gray-900 text-sm">{job.service_type_name}</p><p className="text-xs text-gray-500">{job.member_name}</p></div>
                      <div className="text-right"><p className="font-black text-green-700">KES {Math.round((job.price_kes || 0) * 0.8).toLocaleString()}</p><p className="text-xs text-gray-400">your share</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {history.filter(j => !todayJobs.includes(j)).length > 0 && (
              <div>
                <h2 className="font-bold text-gray-800 mb-3">Recent Jobs</h2>
                <div className="space-y-2">
                  {history.filter(j => !todayJobs.includes(j)).slice(0,8).map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {view === "earnings" && !loading && (
          <div className="space-y-4">
            <div className="bg-gray-900 text-white rounded-2xl p-5">
              <TrendingUp className="w-6 h-6 text-amber-400 mb-3" />
              <p className="text-gray-400 text-sm mb-1">This Week's Earnings</p>
              <p className="text-4xl font-black text-amber-400">KES {weekEarnings.toLocaleString()}</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-gray-500 text-sm mb-1">This Month's Earnings</p>
              <p className="text-3xl font-black text-gray-900">KES {monthEarnings.toLocaleString()}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-bold mb-1">💡 How your pay works</p>
              <p>You receive <strong>80% of every job fee</strong>. Tex Wambui pays you via M-PESA within 24 hours of every confirmed job.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Completed Jobs ({completed.length} total)</h3>
              <div className="space-y-2">
                {completed.slice(0,20).map(job => (
                  <div key={job.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex justify-between items-center">
                    <div><p className="font-semibold text-gray-900 text-sm">{job.service_type_name}</p><p className="text-xs text-gray-500">{job.member_name} · {format(new Date(job.created_date), "dd MMM")}</p></div>
                    <div className="text-right"><p className="font-black text-green-700">KES {Math.round((job.price_kes || 0) * 0.8).toLocaleString()}</p><p className="text-xs text-gray-400">{job.mechanic_payment_sent ? "✓ Paid" : "Pending"}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PullToRefresh>
  );
}