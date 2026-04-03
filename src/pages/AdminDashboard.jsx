import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, DollarSign, CheckCircle, Clock, Star, TrendingUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";
import { formatDistanceToNow, format } from "date-fns";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("jobs");
  const [updating, setUpdating] = useState(null);
  const [newService, setNewService] = useState({ name: "", description: "", price_kes: "", duration_estimate: "" });
  const [addingService, setAddingService] = useState(false);

  const load = async () => {
    const [j, s] = await Promise.all([
      base44.entities.Job.list("-created_date", 100),
      base44.entities.ServiceType.list("name"),
    ]);
    setJobs(j);
    setServices(s);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markPaid = async (job) => {
    setUpdating(job.id + "_pay");
    await base44.entities.Job.update(job.id, { payment_status: "paid_to_waiyaki" });
    await load();
    setUpdating(null);
  };

  const markMechanicPaid = async (job) => {
    setUpdating(job.id + "_mech");
    await base44.entities.Job.update(job.id, { payment_status: "paid_to_mechanic", mechanic_payment_sent: true });
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

  // Stats
  const completed = jobs.filter(j => j.status === "completed");
  const totalRevenue = completed.reduce((s, j) => s + (j.price_kes || 0), 0);
  const mechanicEarnings = Math.round(totalRevenue * 0.8);
  const waiyakiFee = Math.round(totalRevenue * 0.2);
  const avgRating = completed.filter(j => j.rating_stars).reduce((s, j, _, a) => s + j.rating_stars / a.length, 0);
  const pendingPayout = completed.filter(j => !j.mechanic_payment_sent).reduce((s, j) => s + Math.round((j.price_kes || 0) * 0.8), 0);

  const TABS = [
    { id: "jobs", label: "Jobs" },
    { id: "payments", label: "Payments" },
    { id: "services", label: "Services" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
          <span className="text-gray-900 font-black text-lg">T</span>
        </div>
        <div>
          <h1 className="font-black text-gray-900 text-xl">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Tex Wambui · Waiyaki House LLC</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-amber-500" /></div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total Jobs", value: completed.length, icon: CheckCircle, color: "text-green-600" },
              { label: "Total Revenue", value: `KES ${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-amber-600" },
              { label: "Pending Payout", value: `KES ${pendingPayout.toLocaleString()}`, icon: Clock, color: "text-red-500" },
              { label: "Avg Rating", value: avgRating ? avgRating.toFixed(1) + " ⭐" : "N/A", icon: Star, color: "text-amber-500" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                <Icon className={`w-5 h-5 ${color} mb-2`} />
                <p className="text-xs text-gray-500">{label}</p>
                <p className="font-black text-gray-900 text-lg leading-tight">{value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-colors ${tab === t.id ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "jobs" && (
            <div className="space-y-3">
              {jobs.length === 0 && <p className="text-center text-gray-400 py-8">No jobs yet.</p>}
              {jobs.map(job => (
                <div key={job.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{job.service_type_name}</p>
                      <p className="text-amber-600 font-semibold text-sm">KES {job.price_kes?.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StatusBadge status={job.status} />
                      <StatusBadge status={job.payment_status} />
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-0.5">
                    <p>👤 {job.member_name} · {job.member_phone}</p>
                    <p>🚗 {job.vehicle_type}</p>
                    <p>📍 {job.location_description}</p>
                    {job.rating_stars && <p>⭐ {job.rating_stars}/5 {job.rating_note && `— "${job.rating_note}"`}</p>}
                    <p className="text-xs text-gray-400">{format(new Date(job.created_date), "dd MMM yyyy · HH:mm")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "payments" && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                <p className="text-amber-900 font-bold">Split: 80% to David (Boss) / 20% Waiyaki</p>
                <p className="text-sm text-amber-700 mt-1">Waiyaki fee: KES {waiyakiFee.toLocaleString()} · Mechanic earnings: KES {mechanicEarnings.toLocaleString()}</p>
              </div>
              {completed.length === 0 && <p className="text-center text-gray-400 py-8">No completed jobs yet.</p>}
              {completed.map(job => {
                const mechAmt = Math.round((job.price_kes || 0) * 0.8);
                return (
                  <div key={job.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{job.service_type_name}</p>
                        <p className="text-xs text-gray-400">{format(new Date(job.created_date), "dd MMM yyyy")}</p>
                      </div>
                      <StatusBadge status={job.payment_status} />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">👤 {job.member_name} · {job.member_phone}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="text-xs text-gray-500">Member pays: <strong>KES {job.price_kes?.toLocaleString()}</strong></p>
                        <p className="text-xs text-gray-500">David gets: <strong className="text-green-700">KES {mechAmt.toLocaleString()}</strong></p>
                      </div>
                      <div className="flex gap-2">
                        {job.payment_status === "unpaid" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white text-xs"
                            onClick={() => markPaid(job)}
                            disabled={updating === job.id + "_pay"}
                          >
                            {updating === job.id + "_pay" ? <Loader2 className="w-3 h-3 animate-spin" /> : "Mark Paid"}
                          </Button>
                        )}
                        {job.payment_status === "paid_to_waiyaki" && !job.mechanic_payment_sent && (
                          <Button
                            size="sm"
                            className="bg-amber-500 hover:bg-amber-600 text-gray-900 text-xs"
                            onClick={() => markMechanicPaid(job)}
                            disabled={updating === job.id + "_mech"}
                          >
                            {updating === job.id + "_mech" ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Send className="w-3 h-3 mr-1" />Pay David</>}
                          </Button>
                        )}
                        {job.mechanic_payment_sent && <span className="text-xs text-green-600 font-semibold">✓ Paid</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "services" && (
            <div>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-4">
                <h3 className="font-bold text-gray-800 mb-3">Add New Service</h3>
                <div className="space-y-2">
                  <Input placeholder="Service name" value={newService.name} onChange={e => setNewService(s => ({ ...s, name: e.target.value }))} />
                  <Input placeholder="Description (optional)" value={newService.description} onChange={e => setNewService(s => ({ ...s, description: e.target.value }))} />
                  <Input placeholder="Price (KES)" type="number" value={newService.price_kes} onChange={e => setNewService(s => ({ ...s, price_kes: e.target.value }))} />
                  <Input placeholder="Duration estimate, e.g. 20-30 min" value={newService.duration_estimate} onChange={e => setNewService(s => ({ ...s, duration_estimate: e.target.value }))} />
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold" onClick={addService} disabled={addingService}>
                    {addingService ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Service"}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {services.map(s => (
                  <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{s.name}</p>
                      {s.description && <p className="text-xs text-gray-500">{s.description}</p>}
                      <p className="text-amber-600 font-semibold text-sm">KES {s.price_kes?.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => toggleService(s)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${s.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {s.is_active ? "Active" : "Inactive"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}