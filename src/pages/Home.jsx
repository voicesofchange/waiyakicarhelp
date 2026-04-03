import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { MapPin, Phone, User, Car, CheckCircle, Loader2, Star, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileSelect from "@/components/MobileSelect";
import StatusBadge from "@/components/StatusBadge";
import PullToRefresh from "@/components/PullToRefresh";

const VEHICLE_TYPES = ["Regular Car / Saloon", "SUV / 4WD", "Truck / Lorry", "Matatu / Minibus", "Pickup"];

const STATUS_MESSAGES = {
  pending: "⏳ Waiting for Prince Waiyaki to accept your request...",
  accepted: "✅ Job accepted! Prince Waiyaki is preparing to come to you.",
  en_route: "🚗 Prince Waiyaki is on his way to you!",
  arrived: "📍 Prince Waiyaki has arrived at your location.",
  completed: "🎉 Job complete! Please pay via M-PESA below.",
  cancelled: "❌ This job was cancelled. Please call 0712 550 245.",
};

export default function Home() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [step, setStep] = useState("select");
  const [form, setForm] = useState({ member_name: "", member_phone: "", vehicle_type: "", location_description: "", member_notes: "" });
  const [errors, setErrors] = useState({});
  const [locating, setLocating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeJob, setActiveJob] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingNote, setRatingNote] = useState("");
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [mpesaCode, setMpesaCode] = useState("");
  const [mpesaSubmitting, setMpesaSubmitting] = useState(false);
  const [mpesaSubmitted, setMpesaSubmitted] = useState(false);

  const loadServices = useCallback(async () => {
    const data = await base44.entities.ServiceType.filter({ is_active: true });
    setServices(data);
  }, []);

  useEffect(() => { loadServices(); }, [loadServices]);

  useEffect(() => {
    if (!activeJob) return;
    const interval = setInterval(async () => {
      const updated = await base44.entities.Job.filter({ id: activeJob.id });
      if (updated[0]) setActiveJob(updated[0]);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeJob?.id]);

  const getLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setForm(f => ({ ...f, latitude: pos.coords.latitude, longitude: pos.coords.longitude })); setLocating(false); },
      () => setLocating(false),
      { timeout: 10000 }
    );
  };

  const validate = () => {
    const e = {};
    if (!form.member_name.trim()) e.member_name = "Please enter your name";
    if (!form.member_phone.trim()) e.member_phone = "Please enter your M-PESA number";
    if (!form.vehicle_type) e.vehicle_type = "Please select your vehicle type";
    if (!form.location_description.trim()) e.location_description = "Please describe your location";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    const job = await base44.entities.Job.create({
      ...form,
      service_type_name: selectedService.name,
      price_kes: selectedService.price_kes,
      status: "pending",
      payment_status: "unpaid",
    });
    setActiveJob(job);
    setStep("tracking");
    setSubmitting(false);
    base44.integrations.Core.SendEmail({
      to: "sustainthevoices@gmail.com",
      subject: `🔧 New Waiyaki Job — ${selectedService.name} — ${form.member_name}`,
      body: `New job submitted on Waiyaki Dispatch.\n\nJob ID: ${job.id}\nService: ${selectedService.name} — KES ${selectedService.price_kes}\nMember: ${form.member_name}\nPhone: ${form.member_phone}\nVehicle: ${form.vehicle_type}\nLocation: ${form.location_description}\nNotes: ${form.member_notes || "None"}\n\nTime: ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}`,
    }).catch(() => {});
  };

  const submitMpesa = async () => {
    if (!mpesaCode.trim()) return;
    setMpesaSubmitting(true);
    await base44.entities.Job.update(activeJob.id, { mpesa_reference: mpesaCode.trim(), payment_status: "paid_to_waiyaki" });
    setMpesaSubmitted(true);
    setMpesaSubmitting(false);
    base44.integrations.Core.SendEmail({
      to: "sustainthevoices@gmail.com",
      subject: `💰 M-PESA Code Received — ${activeJob.member_name}`,
      body: `M-PESA code submitted.\n\nJob ID: ${activeJob.id}\nMember: ${activeJob.member_name} — ${activeJob.member_phone}\nService: ${activeJob.service_type_name} — KES ${activeJob.price_kes}\nM-PESA Code: ${mpesaCode.trim()}`,
    }).catch(() => {});
  };

  const submitRating = async () => {
    await base44.entities.Job.update(activeJob.id, { rating_stars: rating, rating_note: ratingNote });
    setRatingSubmitted(true);
  };

  const reset = () => {
    setStep("select");
    setActiveJob(null);
    setForm({ member_name: "", member_phone: "", vehicle_type: "", location_description: "", member_notes: "" });
    setErrors({});
    setRating(0);
    setRatingNote("");
    setRatingSubmitted(false);
    setMpesaCode("");
    setMpesaSubmitted(false);
  };

  if (step === "select") return (
    <PullToRefresh onRefresh={loadServices}>
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-gray-900 font-black text-3xl">W</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">WAIYAKI</h1>
          <p className="text-gray-500 text-base">Tyre help in the Limuru area.<br />Fixed price. M-PESA payment.</p>
        </div>
        <h2 className="font-bold text-gray-800 text-lg mb-4">Select a service</h2>
        {services.length === 0 ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-amber-500" /></div>
        ) : (
          <div className="space-y-3">
            {services.map(s => (
              <button key={s.id} onClick={() => { setSelectedService(s); setStep("form"); }}
                className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:border-amber-400 hover:shadow-md transition-all text-left group">
                <div>
                  <p className="font-bold text-gray-900 text-lg group-hover:text-amber-700">{s.name}</p>
                  {s.description && <p className="text-sm text-gray-500 mt-0.5">{s.description}</p>}
                  {s.duration_estimate && <p className="text-xs text-gray-400 mt-1">⏱ {s.duration_estimate}</p>}
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="font-black text-amber-600 text-2xl">KES {s.price_kes?.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">fixed rate</p>
                </div>
              </button>
            ))}
          </div>
        )}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-800 text-sm font-semibold">💳 Payment via M-PESA only after job is complete.</p>
          <p className="text-green-700 text-xs mt-1">No cash. No upfront payment.</p>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.origin + '/mechanic')}
            className="text-xs text-gray-300 hover:text-gray-500 transition-colors"
          >
            Staff Login
          </button>
        </div>
      </div>
    </PullToRefresh>
  );

  if (step === "form") return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <button onClick={() => setStep("select")} className="text-amber-600 font-medium text-sm mb-6 flex items-center gap-1">← Back to services</button>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
        <p className="font-bold text-amber-900 text-lg">{selectedService?.name}</p>
        <p className="text-3xl font-black text-amber-700">KES {selectedService?.price_kes?.toLocaleString()}</p>
      </div>
      <h2 className="font-bold text-gray-800 text-lg mb-4">Your details</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input className="pl-9" placeholder="e.g. James Mwangi" value={form.member_name} onChange={e => setForm(f => ({ ...f, member_name: e.target.value }))} />
          </div>
          {errors.member_name && <p className="text-red-500 text-xs mt-1">{errors.member_name}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">M-PESA Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input className="pl-9" placeholder="e.g. 0712 345 678" type="tel" value={form.member_phone} onChange={e => setForm(f => ({ ...f, member_phone: e.target.value }))} />
          </div>
          {errors.member_phone && <p className="text-red-500 text-xs mt-1">{errors.member_phone}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Vehicle Type *</label>
          <MobileSelect
            value={form.vehicle_type}
            onValueChange={v => setForm(f => ({ ...f, vehicle_type: v }))}
            options={VEHICLE_TYPES}
            placeholder="Select your vehicle"
            className={errors.vehicle_type ? "border-red-400" : ""}
          />
          {errors.vehicle_type && <p className="text-red-500 text-xs mt-1">{errors.vehicle_type}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Where are you? *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              className={`w-full pl-9 pr-3 py-2 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 ${errors.location_description ? "border-red-400" : "border-gray-200"}`}
              rows={3}
              placeholder="e.g. Near Limuru Total petrol station, opposite KCB bank"
              value={form.location_description}
              onChange={e => setForm(f => ({ ...f, location_description: e.target.value }))}
            />
          </div>
          <button onClick={getLocation} disabled={locating} className="mt-1.5 text-xs text-amber-600 font-medium flex items-center gap-1 hover:underline">
            {locating ? <Loader2 className="w-3 h-3 animate-spin" /> : <MapPin className="w-3 h-3" />}
            {locating ? "Getting GPS..." : "Share GPS location"}{form.latitude && !locating && " ✓"}
          </button>
          {errors.location_description && <p className="text-red-500 text-xs mt-1">{errors.location_description}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Additional Notes (optional)</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows={2}
              placeholder="e.g. Right front tyre, road is muddy"
              value={form.member_notes}
              onChange={e => setForm(f => ({ ...f, member_notes: e.target.value }))}
            />
          </div>
        </div>
        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-black py-4 text-lg rounded-xl" onClick={submit} disabled={submitting}>
          {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Tyre Help →"}
        </Button>
        <p className="text-center text-xs text-gray-400">You will only pay after the job is completed and you are satisfied.</p>
      </div>
    </div>
  );

  if (step === "tracking") return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-6">
        {activeJob?.status === "completed" || activeJob?.status === "cancelled" ? (
          <CheckCircle className={`w-16 h-16 mx-auto mb-3 ${activeJob?.status === "cancelled" ? "text-red-400" : "text-green-500"}`} />
        ) : (
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        )}
        <h2 className="text-xl font-black text-gray-900">
          {activeJob?.status === "completed" ? "Job Complete!" : activeJob?.status === "cancelled" ? "Job Cancelled" : "Tracking Your Job"}
        </h2>
        <p className="text-gray-600 mt-1 text-sm px-4">{STATUS_MESSAGES[activeJob?.status]}</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3 mb-5">
        <div className="flex justify-between items-center"><span className="text-sm text-gray-500">Reference</span><span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{activeJob?.id?.slice(-8).toUpperCase()}</span></div>
        <div className="flex justify-between items-center"><span className="text-sm text-gray-500">Service</span><span className="font-bold text-gray-900">{activeJob?.service_type_name}</span></div>
        <div className="flex justify-between items-center"><span className="text-sm text-gray-500">Amount</span><span className="font-black text-amber-600 text-xl">KES {activeJob?.price_kes?.toLocaleString()}</span></div>
        <div className="flex justify-between items-center"><span className="text-sm text-gray-500">Job Status</span><StatusBadge status={activeJob?.status} /></div>
        <div className="flex justify-between items-center"><span className="text-sm text-gray-500">Payment</span><StatusBadge status={activeJob?.payment_status} /></div>
      </div>
      {activeJob?.status === "completed" && !mpesaSubmitted && activeJob?.payment_status === "unpaid" && (
        <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-5 mb-5">
          <h3 className="font-black text-green-900 text-lg mb-3">💳 Pay via M-PESA Now</h3>
          <p className="text-green-800 text-sm mb-4">Send <strong>KES {activeJob?.price_kes?.toLocaleString()}</strong> to either number below.</p>
          <div className="space-y-3 mb-4">
            <div className="bg-white border border-green-300 rounded-xl p-3 text-center"><p className="text-xs text-gray-500 mb-1">Primary Number</p><p className="font-black text-green-700 text-2xl tracking-widest">0712 550 245</p></div>
            <div className="bg-white border border-green-300 rounded-xl p-3 text-center"><p className="text-xs text-gray-500 mb-1">Alternative Number</p><p className="font-black text-green-700 text-2xl tracking-widest">0116 818 759</p></div>
          </div>
          <div>
            <label className="text-sm font-bold text-green-900 mb-2 block">Enter your M-PESA confirmation code:</label>
            <Input placeholder="e.g. QHX72ABC3K" value={mpesaCode} onChange={e => setMpesaCode(e.target.value.toUpperCase())} className="mb-3 font-mono text-center text-lg tracking-widest border-green-300 focus:ring-green-400" />
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-3 text-base rounded-xl" onClick={submitMpesa} disabled={mpesaSubmitting || !mpesaCode.trim()}>
              {mpesaSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit M-PESA Code"}
            </Button>
          </div>
        </div>
      )}
      {(mpesaSubmitted || activeJob?.payment_status !== "unpaid") && activeJob?.status === "completed" && (
        <div className="bg-green-50 border border-green-300 rounded-xl p-4 mb-5 text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-green-800 font-bold">Payment code received!</p>
          <p className="text-green-700 text-sm">Code: <strong className="font-mono">{activeJob?.mpesa_reference || mpesaCode}</strong></p>
        </div>
      )}
      {activeJob?.status === "completed" && !activeJob?.rating_stars && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-5">
          {ratingSubmitted ? (
            <p className="text-center text-green-700 font-semibold py-2">⭐ Thank you for rating Prince Waiyaki!</p>
          ) : (
            <>
              <h3 className="font-bold text-gray-900 mb-3">Rate your service</h3>
              <div className="flex gap-2 mb-3 justify-center">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => setRating(s)}>
                    <Star className={`w-10 h-10 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
              <textarea className="w-full border border-gray-200 rounded-lg p-2 text-sm resize-none mb-3 focus:outline-none focus:ring-2 focus:ring-amber-400" rows={2} placeholder="Any comments? (optional)" value={ratingNote} onChange={e => setRatingNote(e.target.value)} />
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold" onClick={submitRating} disabled={!rating}>Submit Rating</Button>
            </>
          )}
        </div>
      )}
      <button onClick={reset} className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-3">← Start a new request</button>
    </div>
  );
}