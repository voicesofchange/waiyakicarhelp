import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { CheckCircle, Navigation, Loader2, TrendingUp, ToggleLeft, ToggleRight, Phone, LogOut } from "lucide-react";
import IncomingJobAlert from "@/components/IncomingJobAlert";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/JobCard";
import StatusBadge from "@/components/StatusBadge";
import PullToRefresh from "@/components/PullToRefresh";
import { format, startOfWeek, startOfMonth } from "date-fns";

const NEXT_STATUS = { accepted: "en_route", en_route: "arrived", arrived: "completed" };
const NEXT_LABEL  = { accepted: "🚗 Mark En Route", en_route: "📍 Mark Arrived", arrived: "✅ Complete Job" };

export default function MechanicDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeJob, setActiveJob] = useState(null);
  const [incomingJob, setIncomingJob] = useState(null);
  const currentAlertJobId = useRef(null);
  const [accepting, setAccepting] = useState(false);
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

    const pendingJobs = all.filter(j => j.status === "pending");
    if (!active && pendingJobs.length > 0) {
      const firstPending = pendingJobs[0];
      if (currentAlertJobId.current !== firstPending.id) {
        currentAlertJobId.current = firstPending.id;
        setIncomingJob(firstPending);
      }
    } else if (active || pendingJobs.length === 0) {
      if (pendingJobs.length === 0) currentAlertJobId.current = null;
    }

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
    // Request browser notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    load();
    loadStatus();
    const i = setInterval(load, 5000);

    // Real-time subscribe for instant alerts
    const unsub = base44.entities.Job.subscribe((event) => {
      if (event.type === "create" && Notification.permission === "granted") {
        new Notification("🔧 New Job Request!", {
          body: `${event.data?.service_type_name} — ${event.data?.member_name}`,
          icon: "/favicon.ico",
        });
      }
      load();
    });

    return () => { clearInterval(i); unsub(); };
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
    setIncomingJob(null);
    currentAlertJobId.current = null;
    setAccepting(true);
    setUpdating(true);
    const optimistic = { ...job, status: "accepted", accepted_at: new Date().toISOString() };
    setActiveJob(optimistic);
    setJobs(prev => prev.map(j => j.id === job.id ? optimistic : j));
    setMechanicNotes("");
    const updated = await base44.entities.Job.update(job.id, { status: "accepted", accepted_at: optimistic.accepted_at });
    setActiveJob(updated);
    await load();
    setUpdating(false);
    setAccepting(false);
    base44.integrations.Core.SendEmail({
      to: "sustainthevoices@gmail.com",
      subject: `✅ Job Accepted — ${job.service_type_name} — ${job.member_name}`,
      body: `Job accepted.\n\nJob ID: ${job.id}\nService: ${job.service_type_name} — KES ${job.price_kes}\nMember: ${job.member_name} — ${job.member_phone}\nVehicle: ${job.vehicle_type}\nLocation: ${job.location_description}\n\nAccepted: ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}`,
    }).catch(() => {});
  };

  const dismiss = () => {
    // Timer expired — just hide the alert, don't cancel the job
    setIncomingJob(null);
    currentAlertJobId.current = null;
  };

  const decline = async (job) => {
    setIncomingJob(null);
    currentAlertJobId.current = null;
    setUpdating(true);
    await base44.entities.Job.update(job.id, { status: "cancelled" });
    await load();
    setUpdating(false);
  };

  const advance = async () => {
    if (!activeJob) return;
    setUpdating(true);
    const next = NEXT_STATUS[activeJob.status];
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
        body: `Job complete.\n\nJob ID: ${activeJob.id}\nService: ${activeJob.service_type_name} — KES ${activeJob.price_kes}\nMember: ${activeJob.member_name} — ${activeJob.member_phone}\nNotes: ${mechanicNotes || "None"}\n\nCompleted: ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}`,
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
    <>
      {incomingJob && (
        <IncomingJobAlert job={incomingJob} onAccept={accept} onDecline={decline} onTimeout={dismiss} accepting={accepting} />
      )}

      <div className="min-h-screen bg-[#0F0F0F]">
        {/* Header */}
        <div className="px-5 pt-12 pb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <span className="text-black font-black text-lg">W</span>
            </div>
            <div>
              <p className="text-white font-black text-base">WAIYAKI</p>
              <p className="text-gray-400 text-xs">Mechanic Portal</p>
            </div>
          </div>
          <Link to="/mechanic/profile" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
            <UserCircle className="w-4 h-4 text-gray-300" />
          </Link>
          <button onClick={() => base44.auth.logout()} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
            <LogOut className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {/* Availability toggle */}
        {statusRecord && (
          <div className="mx-5 mb-4">
            <button
              onClick={toggleAvailability}
              disabled={togglingStatus}
              className={`w-full rounded-2xl p-4 flex items-center justify-between transition-all ${statusRecord.is_available ? "bg-green-600" : "bg-gray-700"}`}
            >
              <div>
                <p className="text-white font-black text-base">{statusRecord.is_available ? "🟢 Available for Jobs" : "🔴 Not Available"}</p>
                <p className="text-white/70 text-xs mt-0.5">Tap to {statusRecord.is_available ? "go offline" : "go online"}</p>
              </div>
              {togglingStatus ? <Loader2 className="w-6 h-6 text-white animate-spin" /> :
                statusRecord.is_available ? <ToggleRight className="w-10 h-10 text-white" /> : <ToggleLeft className="w-10 h-10 text-white/60" />}
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="mx-5 mb-4 flex gap-1 bg-white/10 rounded-xl p-1">
          {[{ id: "jobs", label: "Jobs" }, { id: "earnings", label: "Earnings" }].map(t => (
            <button key={t.id} onClick={() => setView(t.id)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${view === t.id ? "bg-white text-gray-900" : "text-gray-400"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="bg-white rounded-t-3xl min-h-[60vh] px-5 pt-5 pb-10">
          {loading && <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 animate-spin text-amber-500" /></div>}

          {view === "jobs" && !loading && (
            <>
              {/* Active Job */}
              {activeJob && (
                <div className="bg-[#0F0F0F] rounded-2xl p-5 mb-6 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">🔧 Active Job</span>
                    <StatusBadge status={activeJob.status} />
                  </div>
                  <p className="font-black text-white text-2xl mb-0.5">{activeJob.service_type_name}</p>
                  <p className="text-amber-400 font-black text-xl mb-4">KES {activeJob.price_kes?.toLocaleString()}</p>

                  <div className="space-y-2 text-sm text-gray-300 mb-4">
                    <p>👤 <span className="text-white font-semibold">{activeJob.member_name}</span></p>
                    <p>📱 <a href={`tel:${activeJob.member_phone}`} className="text-amber-400 font-bold text-base">{activeJob.member_phone}</a></p>
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
                      className="w-full bg-white/10 text-white border border-white/20 rounded-xl p-2.5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-amber-400"
                      rows={2}
                      placeholder="e.g. Nail in tyre, patched successfully"
                      value={mechanicNotes}
                      onChange={e => setMechanicNotes(e.target.value)}
                    />
                  </div>

                  <Button className="w-full h-13 bg-amber-500 hover:bg-amber-400 text-black font-black py-4 text-base rounded-xl" onClick={advance} disabled={updating}>
                    {updating ? <Loader2 className="w-5 h-5 animate-spin" /> : NEXT_LABEL[activeJob.status]}
                  </Button>
                </div>
              )}

              {/* Pending Jobs */}
              {!activeJob && pending.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-3">Incoming Requests ({pending.length})</p>
                  <div className="space-y-3">
                    {pending.map(job => (
                      <JobCard key={job.id} job={job} actions={
                        <>
                          <Button className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl" onClick={() => accept(job)} disabled={updating}>
                            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : "✓ Accept"}
                          </Button>
                          <Button variant="outline" className="flex-1 border-red-200 text-red-500 hover:bg-red-50 py-3 rounded-xl" onClick={() => decline(job)} disabled={updating}>
                            Decline
                          </Button>
                        </>
                      } />
                    ))}
                  </div>
                </div>
              )}

              {!activeJob && pending.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="font-bold text-gray-500">No pending requests</p>
                  <p className="text-sm text-gray-400 mt-1">New jobs will pop up automatically.</p>
                </div>
              )}

              {todayJobs.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-3">Completed Today ({todayJobs.length})</p>
                  <div className="space-y-2">
                    {todayJobs.map(job => (
                      <div key={job.id} className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{job.service_type_name}</p>
                          <p className="text-xs text-gray-400">{job.member_name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-green-600">KES {Math.round((job.price_kes || 0) * 0.8).toLocaleString()}</p>
                          <p className="text-xs text-gray-400">your share</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {history.filter(j => !todayJobs.includes(j)).length > 0 && (
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-3">Recent Jobs</p>
                  <div className="space-y-2">
                    {history.filter(j => !todayJobs.includes(j)).slice(0, 8).map(job => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {view === "earnings" && !loading && (
            <div className="space-y-4">
              <div className="bg-[#0F0F0F] rounded-2xl p-5">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">This Week</p>
                <p className="text-amber-400 font-black text-4xl">KES {weekEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">This Month</p>
                <p className="text-gray-900 font-black text-3xl">KES {monthEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <p className="font-bold mb-1">💡 Your Pay</p>
                <p>You receive <strong>80% of every job fee</strong>. Paid via M-PESA within 24 hours.</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-3">All Completed Jobs ({completed.length})</p>
                <div className="space-y-2">
                  {completed.slice(0, 20).map(job => (
                    <div key={job.id} className="bg-gray-50 rounded-xl p-3 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{job.service_type_name}</p>
                        <p className="text-xs text-gray-400">{job.member_name} · {format(new Date(job.created_date), "dd MMM")}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-green-600">KES {Math.round((job.price_kes || 0) * 0.8).toLocaleString()}</p>
                        <p className="text-xs text-gray-400">{job.mechanic_payment_sent ? "✓ Paid" : "Pending"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}