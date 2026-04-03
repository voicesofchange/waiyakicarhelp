import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, DollarSign, CheckCircle, Clock, TrendingUp, Send, Download, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileSelect from "@/components/MobileSelect";
import StatusBadge from "@/components/StatusBadge";
import PullToRefresh from "@/components/PullToRefresh";
import { format, isToday, isThisWeek } from "date-fns";

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "en_route", label: "En Route" },
  { value: "arrived", label: "Arrived" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const PAYMENT_OPTIONS = [
  { value: "all", label: "All Payments" },
  { value: "unpaid", label: "Unpaid" },
  { value: "paid_to_waiyaki", label: "Paid to Waiyaki" },
  { value: "confirmed", label: "Confirmed" },
  { value: "mechanic_paid", label: "Mechanic Paid" },
];

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("jobs");
  const [updating, setUpdating] = useState(null);
  const [newService, setNewService] = useState({ name: "", description: "", price_kes: "", duration_estimate: "" });
  const [addingService, setAddingService] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [adminMpesa, setAdminMpesa] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [mechanicStatus, setMechanicStatus] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");

  const load = useCallback(async () => {
    const [j, s, ms] = await Promise.all([
      base44.entities.Job.list("-created_date", 200),
      base44.entities.ServiceType.list("name"),
      base44.entities.MechanicStatus.list(),
    ]);
    setJobs(j);
    setServices(s);
    if (ms.length > 0) setMechanicStatus(ms[0]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); const i = setInterval(load, 10000); return () => clearInterval(i); }, [load]);

  const openJob = (job) => { setSelectedJob(job); setAdminNotes(job.admin_notes || ""); setAdminMpesa(job.admin_mpesa_reference || ""); };
  const closeJob = () => { setSelectedJob(null); setAdminNotes(""); setAdminMpesa(""); };

  const saveNotes = async () => {
    if (!selectedJob) return;
    setSavingNotes(true);
    const updated = await base44.entities.Job.update(selectedJob.id, { admin_notes: adminNotes, admin_mpesa_reference: adminMpesa || undefined });
    setSelectedJob(updated);
    await load();
    setSavingNotes(false);
  };

  const markConfirmed = async (job) => {
    setUpdating(job.id + "_confirm");
    const updated = await base44.entities.Job.update(job.id, { payment_status: "confirmed" });
    if (selectedJob?.id === job.id) setSelectedJob(updated);
    await load();
    setUpdating(null);
  };

  const markMechanicPaid = async (job) => {
    setUpdating(job.id + "_mech");
    const updated = await base44.entities.Job.update(job.id, { payment_status: "mechanic_paid", mechanic_payment_sent: true });
    if (selectedJob?.id === job.id) setSelectedJob(updated);
    await load();
    setUpdating(null);
  };

  const changeStatus = async (job, newStatus) => {
    setUpdating(job.id + "_status");
    const extra = {};
    if (newStatus === "accepted") extra.accepted_at = new Date().toISOString();
    if (newStatus === "arrived") extra.arrived_at = new Date().toISOString();
    if (newStatus === "completed") extra.completed_at = new Date().toISOString();
    const updated = await base44.entities.Job.update(job.id, { status: newStatus, ...extra });
    setSelectedJob(updated);
    await load();
    setUpdating(null);
  };

  const cancelJob = async (job) => {
    if (!window.confirm("Cancel this job?")) return;
    setUpdating(job.id + "_cancel");
    await base44.entities.Job.update(job.id, { status: "cancelled" });
    closeJob();
    await load();
    setUpdating(null);
  };

  const addService = async () => {
    if (!newService.name || !newService.price_kes) return;
    setAddingService(true);
    await base44.entities.ServiceType.create({ ...newService, price_kes: Number(newService.price_kes), is_active: true });
    setNewService({ name: "", description: "", price_kes: "", duration_estimate: "" });
    await load();
    setAddingService(false);
  };

  const toggleService = async (s) => {
    await base44.entities.ServiceType.update(s.id, { is_active: !s.is_active });
    await load();
  };

  const exportCSV = () => {
    const headers = ["Job Id","Date","Member Name","Member Phone","Service Type","Vehicle Type","Location","Member Notes","Status","Accepted At","Mechanic Notes","Payment Status","Amount(KES)","Mechanic Amount(KES)","MPESA-Code","Admin MPESA Ref","Rating","Admin Notes"];
    const rows = jobs.map(j => [
      j.id, j.created_date ? format(new Date(j.created_date), "dd/MM/yyyy HH:mm") : "",
      j.member_name, j.member_phone, j.service_type_name, j.vehicle_type,
      j.location_description, j.member_notes || "", j.status,
      j.accepted_at ? format(new Date(j.accepted_at), "dd/MM/yyyy HH:mm") : "",
      j.mechanic_notes || "", j.payment_status,
      j.price_kes || "", Math.round((j.price_kes || 0) * 0.8),
      j.mpesa_reference || "", j.admin_mpesa_reference || "",
      j.rating_stars || "", j.admin_notes || "",
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `WaiyakiDispatch_${format(new Date(), "yyyyMMdd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const completed = jobs.filter(j => j.status === "completed");
  const todayJobs = jobs.filter(j => j.created_date && isToday(new Date(j.created_date)));
  const weekJobs = jobs.filter(j => j.created_date && isThisWeek(new Date(j.created_date), { weekStartsOn: 1 }));
  const totalRevenue = completed.reduce((s, j) => s + (j.price_kes || 0), 0);
  const weekRevenue = weekJobs.filter(j => j.status === "completed").reduce((s, j) => s + (j.price_kes || 0), 0);
  const mechanicEarnings = Math.round(totalRevenue * 0.8);
  const waiyakiFee = Math.round(totalRevenue * 0.2);
  const pendingPayout = completed.filter(j => !j.mechanic_payment_sent).reduce((s, j) => s + Math.round((j.price_kes || 0) * 0.8), 0);
  const avgRating = completed.filter(j => j.rating_stars).reduce((s, j, _, a) => s + j.rating_stars / a.length, 0);

  const filteredJobs = jobs.filter(j => {
    if (filterStatus !== "all" && j.status !== filterStatus) return false;
    if (filterPayment !== "all" && j.payment_status !== filterPayment) return false;
    return true;
  });

  const TABS = [{ id: "jobs", label: "Live Jobs" }, { id: "payments", label: "Payments" }, { id: "services", label: "Services" }];

  return (
    <PullToRefresh onRefresh={load}>
      <div className="min-h-screen bg-[#0F0F0F]">
        {/* Header */}
        <div className="px-5 pt-12 pb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <span className="text-black font-black text-lg">W</span>
            </div>
            <div>
              <p className="text-white font-black text-base">WAIYAKI</p>
              <p className="text-gray-400 text-xs">Admin · Tex Wambui</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportCSV} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
              <Download className="w-4 h-4 text-gray-300" />
            </button>
            <button onClick={() => base44.auth.logout()} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
              <LogOut className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Stats row */}
        {!loading && (
          <div className="px-5 pb-4 grid grid-cols-2 gap-3">
            <div className="bg-amber-500 rounded-2xl p-4">
              <p className="text-black/60 text-xs font-bold uppercase">Week Revenue</p>
              <p className="text-black font-black text-2xl">KES {weekRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-gray-400 text-xs font-bold uppercase">Pending Payout</p>
              <p className="text-white font-black text-2xl">KES {pendingPayout.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-gray-400 text-xs font-bold uppercase">Today's Jobs</p>
              <p className="text-white font-black text-2xl">{todayJobs.length}</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-gray-400 text-xs font-bold uppercase">Avg Rating</p>
              <p className="text-white font-black text-2xl">{avgRating > 0 ? `⭐ ${avgRating.toFixed(1)}` : "—"}</p>
            </div>
          </div>
        )}

        {/* Mechanic status */}
        {mechanicStatus && !loading && (
          <div className="mx-5 mb-4">
            <div className={`rounded-xl px-4 py-3 flex items-center justify-between ${mechanicStatus.is_available ? "bg-green-600/20 border border-green-500/30" : "bg-red-600/20 border border-red-500/30"}`}>
              <p className={`font-bold text-sm ${mechanicStatus.is_available ? "text-green-400" : "text-red-400"}`}>
                Prince Waiyaki: {mechanicStatus.is_available ? "🟢 Available" : "🔴 Off Duty"}
              </p>
              {mechanicStatus.last_active && (
                <p className="text-xs text-gray-400">Last active {format(new Date(mechanicStatus.last_active), "HH:mm")}</p>
              )}
            </div>
          </div>
        )}

        {/* Tabs + Content */}
        <div className="mx-5 mb-4 flex gap-1 bg-white/10 rounded-xl p-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === t.id ? "bg-white text-gray-900" : "text-gray-400"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="bg-white rounded-t-3xl min-h-[60vh] px-5 pt-5 pb-16">
          {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 animate-spin text-amber-500" /></div>}

          {!loading && tab === "jobs" && (
            <>
              <div className="flex gap-2 mb-4">
                <MobileSelect value={filterStatus} onValueChange={setFilterStatus} options={STATUS_OPTIONS} placeholder="All Statuses" className="flex-1" />
                <MobileSelect value={filterPayment} onValueChange={setFilterPayment} options={PAYMENT_OPTIONS} placeholder="All Payments" className="flex-1" />
              </div>
              <div className="space-y-3">
                {filteredJobs.length === 0 && <p className="text-center text-gray-400 py-10">No jobs match the filters.</p>}
                {filteredJobs.map(job => (
                  <div key={job.id} onClick={() => openJob(job)}
                    className="bg-white border-2 border-gray-100 rounded-2xl p-4 cursor-pointer hover:border-amber-300 active:scale-95 transition-all shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{job.service_type_name}</p>
                        <p className="text-amber-500 font-bold text-sm">KES {job.price_kes?.toLocaleString()}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <StatusBadge status={job.status} />
                        <StatusBadge status={job.payment_status} />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 space-y-0.5">
                      <p>👤 {job.member_name} · {job.member_phone}</p>
                      <p>📍 {job.location_description}</p>
                      {job.mpesa_reference && <p className="text-green-700 font-mono text-xs">M-PESA: {job.mpesa_reference}</p>}
                      <p className="text-xs text-gray-400">{format(new Date(job.created_date), "dd MMM yyyy · HH:mm")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!loading && tab === "payments" && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-2">
                <p className="text-amber-900 font-bold text-sm">80% Prince / 20% Waiyaki House</p>
                <p className="text-xs text-amber-700 mt-1">
                  Total: <strong>KES {totalRevenue.toLocaleString()}</strong> ·
                  House: <strong>KES {waiyakiFee.toLocaleString()}</strong> ·
                  Prince: <strong>KES {mechanicEarnings.toLocaleString()}</strong>
                </p>
              </div>
              {completed.length === 0 && <p className="text-center text-gray-400 py-10">No completed jobs yet.</p>}
              {completed.map(job => {
                const mechAmt = Math.round((job.price_kes || 0) * 0.8);
                return (
                  <div key={job.id} className="bg-white border-2 border-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{job.service_type_name}</p>
                        <p className="text-xs text-gray-400">{format(new Date(job.created_date), "dd MMM · HH:mm")}</p>
                      </div>
                      <StatusBadge status={job.payment_status} />
                    </div>
                    <p className="text-sm text-gray-500 mb-2">👤 {job.member_name} · {job.member_phone}</p>
                    {job.mpesa_reference && (
                      <p className="text-xs bg-green-50 border border-green-200 rounded-lg px-2 py-1 text-green-800 font-mono mb-2">
                        M-PESA: <strong>{job.mpesa_reference}</strong>
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Total: <strong className="text-gray-900">KES {job.price_kes?.toLocaleString()}</strong></p>
                        <p className="text-xs text-gray-400">Prince: <strong className="text-green-700">KES {mechAmt.toLocaleString()}</strong></p>
                      </div>
                      <div className="flex gap-2">
                        {job.payment_status === "paid_to_waiyaki" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-xl"
                            onClick={() => markConfirmed(job)} disabled={updating === job.id + "_confirm"}>
                            {updating === job.id + "_confirm" ? <Loader2 className="w-3 h-3 animate-spin" /> : "Confirm"}
                          </Button>
                        )}
                        {job.payment_status === "confirmed" && !job.mechanic_payment_sent && (
                          <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-black text-xs rounded-xl"
                            onClick={() => markMechanicPaid(job)} disabled={updating === job.id + "_mech"}>
                            {updating === job.id + "_mech" ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Send className="w-3 h-3 mr-1" />Pay Prince</>}
                          </Button>
                        )}
                        {job.mechanic_payment_sent && <span className="text-xs text-green-600 font-bold">✓ Paid</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && tab === "services" && (
            <div>
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <p className="font-bold text-gray-800 mb-3">Add New Service</p>
                <div className="space-y-2">
                  <Input className="h-11 rounded-xl border-2 border-gray-100" placeholder="Service name *" value={newService.name} onChange={e => setNewService(s => ({ ...s, name: e.target.value }))} />
                  <Input className="h-11 rounded-xl border-2 border-gray-100" placeholder="Description (optional)" value={newService.description} onChange={e => setNewService(s => ({ ...s, description: e.target.value }))} />
                  <Input className="h-11 rounded-xl border-2 border-gray-100" placeholder="Price (KES) *" type="number" value={newService.price_kes} onChange={e => setNewService(s => ({ ...s, price_kes: e.target.value }))} />
                  <Input className="h-11 rounded-xl border-2 border-gray-100" placeholder="Duration e.g. 20-30 min" value={newService.duration_estimate} onChange={e => setNewService(s => ({ ...s, duration_estimate: e.target.value }))} />
                  <Button className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl" onClick={addService} disabled={addingService}>
                    {addingService ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Service"}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {services.map(s => (
                  <div key={s.id} className="bg-white border-2 border-gray-100 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{s.name}</p>
                      {s.description && <p className="text-xs text-gray-400">{s.description}</p>}
                      <p className="text-amber-500 font-bold text-sm">KES {s.price_kes?.toLocaleString()}</p>
                    </div>
                    <button onClick={() => toggleService(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${s.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {s.is_active ? "Active" : "Inactive"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b">
              <div>
                <h2 className="font-black text-gray-900 text-lg">{selectedJob.service_type_name}</h2>
                <p className="text-xs text-gray-400 font-mono">#{selectedJob.id?.slice(-10).toUpperCase()}</p>
              </div>
              <button onClick={closeJob} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-2 flex-wrap">
                <StatusBadge status={selectedJob.status} />
                <StatusBadge status={selectedJob.payment_status} />
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-gray-400 mb-0.5">Member</p><p className="font-semibold">{selectedJob.member_name}</p></div>
                <div><p className="text-xs text-gray-400 mb-0.5">Phone</p><p className="font-semibold">{selectedJob.member_phone}</p></div>
                <div><p className="text-xs text-gray-400 mb-0.5">Vehicle</p><p className="font-semibold">{selectedJob.vehicle_type}</p></div>
                <div><p className="text-xs text-gray-400 mb-0.5">Amount</p><p className="font-black text-amber-500">KES {selectedJob.price_kes?.toLocaleString()}</p></div>
              </div>
              <div className="text-sm space-y-2">
                <div><p className="text-xs text-gray-400">Location</p><p className="font-medium">{selectedJob.location_description}</p></div>
                {selectedJob.member_notes && <div><p className="text-xs text-gray-400">Member Notes</p><p>{selectedJob.member_notes}</p></div>}
                {selectedJob.mechanic_notes && <div><p className="text-xs text-gray-400">Mechanic Notes</p><p>{selectedJob.mechanic_notes}</p></div>}
                {selectedJob.rating_stars && <div><p className="text-xs text-gray-400">Rating</p><p>⭐ {selectedJob.rating_stars}/5 {selectedJob.rating_note && `— "${selectedJob.rating_note}"`}</p></div>}
              </div>
              <div className="bg-[#0F0F0F] rounded-2xl p-4">
                <p className="text-gray-400 text-xs mb-1">Prince Waiyaki receives (80%)</p>
                <p className="font-black text-amber-400 text-2xl">KES {Math.round((selectedJob.price_kes || 0) * 0.8).toLocaleString()}</p>
              </div>
              {selectedJob.mpesa_reference && (
                <div className="bg-green-50 border border-green-300 rounded-xl p-3">
                  <p className="text-xs text-green-600 mb-1">Member M-PESA Code</p>
                  <p className="font-mono font-black text-green-800 text-lg">{selectedJob.mpesa_reference}</p>
                </div>
              )}
              <div>
                <label className="text-xs text-gray-400 block mb-1">Your verified M-PESA ref</label>
                <Input className="font-mono h-11 rounded-xl border-2 border-gray-100" placeholder="Enter ref" value={adminMpesa} onChange={e => setAdminMpesa(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Admin Notes</label>
                <textarea className="w-full border-2 border-gray-100 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-amber-400" rows={3} placeholder="Internal notes..." value={adminNotes} onChange={e => setAdminNotes(e.target.value)} />
              </div>
              <Button className="w-full h-11 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded-xl" onClick={saveNotes} disabled={savingNotes}>
                {savingNotes ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Notes"}
              </Button>
              <div className="flex gap-2">
                {selectedJob.payment_status === "paid_to_waiyaki" && (
                  <Button className="flex-1 h-11 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                    onClick={() => markConfirmed(selectedJob)} disabled={updating === selectedJob.id + "_confirm"}>
                    {updating === selectedJob.id + "_confirm" ? <Loader2 className="w-4 h-4 animate-spin" /> : "✓ Confirm Payment"}
                  </Button>
                )}
                {selectedJob.payment_status === "confirmed" && !selectedJob.mechanic_payment_sent && (
                  <Button className="flex-1 h-11 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl"
                    onClick={() => markMechanicPaid(selectedJob)} disabled={updating === selectedJob.id + "_mech"}>
                    {updating === selectedJob.id + "_mech" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-3 h-3" />Pay Prince KES {Math.round((selectedJob.price_kes || 0) * 0.8).toLocaleString()}</>}
                  </Button>
                )}
                {selectedJob.mechanic_payment_sent && <div className="flex-1 text-center text-green-600 font-bold py-3">✅ Prince Waiyaki Paid</div>}
              </div>
              {/* Manual status override */}
              {!["completed","cancelled"].includes(selectedJob.status) && (
                <div className="border-2 border-gray-100 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-2">Manually change job status:</p>
                  <div className="flex flex-wrap gap-2">
                    {["pending","accepted","en_route","arrived","completed"].filter(s => s !== selectedJob.status).map(s => (
                      <button key={s} onClick={() => changeStatus(selectedJob, s)}
                        disabled={!!updating}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg capitalize transition-colors">
                        {updating === selectedJob.id + "_status" ? "..." : s.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {!["completed","cancelled"].includes(selectedJob.status) && (
                <Button variant="outline" className="w-full h-11 border-2 border-red-200 text-red-500 hover:bg-red-50 rounded-xl"
                  onClick={() => cancelJob(selectedJob)} disabled={updating === selectedJob.id + "_cancel"}>
                  {updating === selectedJob.id + "_cancel" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cancel Job"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </PullToRefresh>
  );
}