import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle, Navigation, MapPin, Phone, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/JobCard";
import StatusBadge from "@/components/StatusBadge";

const NEXT_STATUS = { accepted: "en_route", en_route: "arrived", arrived: "completed" };
const NEXT_LABEL = { accepted: "🚗 Mark En Route", en_route: "📍 Mark Arrived", arrived: "✅ Mark Complete" };

export default function MechanicDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeJob, setActiveJob] = useState(null);
  const [updating, setUpdating] = useState(false);

  const load = async () => {
    const all = await base44.entities.Job.list("-created_date", 50);
    setJobs(all);
    const active = all.find(j => ["accepted","en_route","arrived"].includes(j.status));
    if (active) setActiveJob(active);
    setLoading(false);
  };

  useEffect(() => { load(); const i = setInterval(load, 8000); return () => clearInterval(i); }, []);

  const accept = async (job) => {
    setUpdating(true);
    const updated = await base44.entities.Job.update(job.id, { status: "accepted", accepted_at: new Date().toISOString() });
    setActiveJob(updated);
    await load();
    setUpdating(false);
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
    const extra = next === "completed" ? { completed_at: new Date().toISOString() } : {};
    const updated = await base44.entities.Job.update(activeJob.id, { status: next, ...extra });
    if (next === "completed") setActiveJob(null);
    else setActiveJob(updated);
    await load();
    setUpdating(false);
  };

  const pending = jobs.filter(j => j.status === "pending");
  const history = jobs.filter(j => ["completed","cancelled"].includes(j.status)).slice(0, 10);

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
          <span className="text-amber-400 font-black text-lg">D</span>
        </div>
        <div>
          <h1 className="font-black text-gray-900 text-xl">Mechanic View</h1>
          <p className="text-sm text-gray-500">Prince Waiyaki (Boss) · Limuru Area</p>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-amber-500" /></div>
      )}

      {/* Active Job */}
      {activeJob && (
        <div className="bg-gray-900 text-white rounded-2xl p-5 mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-amber-400 font-bold text-sm uppercase tracking-wide">Active Job</span>
            <StatusBadge status={activeJob.status} />
          </div>
          <p className="font-black text-xl mb-1">{activeJob.service_type_name}</p>
          <p className="text-amber-400 font-bold text-lg mb-3">KES {activeJob.price_kes?.toLocaleString()}</p>
          <div className="space-y-1.5 text-sm text-gray-300 mb-4">
            <p>👤 {activeJob.member_name}</p>
            <p>📱 {activeJob.member_phone}</p>
            <p>🚗 {activeJob.vehicle_type}</p>
            <p>📍 {activeJob.location_description}</p>
            {activeJob.latitude && (
              <a
                href={`https://maps.google.com/?q=${activeJob.latitude},${activeJob.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-amber-400 hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" /> Open in Google Maps
              </a>
            )}
          </div>
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 rounded-xl"
            onClick={advance}
            disabled={updating}
          >
            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : NEXT_LABEL[activeJob.status]}
          </Button>
        </div>
      )}

      {/* Pending Jobs */}
      {!activeJob && pending.length > 0 && (
        <div className="mb-6">
          <h2 className="font-bold text-gray-800 mb-3">Incoming Requests ({pending.length})</h2>
          <div className="space-y-3">
            {pending.map(job => (
              <JobCard
                key={job.id}
                job={job}
                actions={
                  <>
                    <Button
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold"
                      onClick={() => accept(job)}
                      disabled={updating}
                    >
                      {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Accept"}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => decline(job)}
                      disabled={updating}
                    >
                      Decline
                    </Button>
                  </>
                }
              />
            ))}
          </div>
        </div>
      )}

      {!activeJob && pending.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-400">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-8 h-8 text-gray-300" />
          </div>
          <p className="font-medium">No pending requests</p>
          <p className="text-sm mt-1">New jobs will appear here automatically.</p>
        </div>
      )}

      {/* Job History */}
      {history.length > 0 && (
        <div>
          <h2 className="font-bold text-gray-800 mb-3">Recent Jobs</h2>
          <div className="space-y-2">
            {history.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}