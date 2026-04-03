import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { MapPin, Phone, User, Car, CheckCircle, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";

const VEHICLE_TYPES = ["Regular Car / Saloon", "SUV / 4WD", "Truck / Lorry", "Matatu / Minibus", "Pickup"];

export default function Home() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [step, setStep] = useState("select"); // select | form | tracking | rate
  const [form, setForm] = useState({ member_name: "", member_phone: "", vehicle_type: "", location_description: "" });
  const [locating, setLocating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeJob, setActiveJob] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingNote, setRatingNote] = useState("");
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  useEffect(() => {
    base44.entities.ServiceType.filter({ is_active: true }).then(setServices);
  }, []);

  // Poll job status
  useEffect(() => {
    if (!activeJob) return;
    const interval = setInterval(async () => {
      const updated = await base44.entities.Job.filter({ id: activeJob.id });
      if (updated[0]) setActiveJob(updated[0]);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeJob?.id]);

  const getLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm(f => ({ ...f, latitude: pos.coords.latitude, longitude: pos.coords.longitude }));
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 10000 }
    );
  };

  const submit = async () => {
    if (!form.member_name || !form.member_phone || !form.vehicle_type || !form.location_description) return;
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
  };

  const submitRating = async () => {
    await base44.entities.Job.update(activeJob.id, { rating_stars: rating, rating_note: ratingNote });
    setRatingSubmitted(true);
  };

  const STATUS_MESSAGES = {
    pending: "Looking for your mechanic...",
    accepted: "✅ Job accepted! Mechanic is preparing to come to you.",
    en_route: "🚗 Mechanic is on the way!",
    arrived: "📍 Mechanic has arrived at your location.",
    completed: "🎉 Job complete! Please pay via M-PESA.",
    cancelled: "❌ This job was cancelled.",
  };

  if (step === "select") return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-gray-900 font-black text-3xl">W</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Waiyaki</h1>
        <p className="text-gray-500 text-base">Tyre help in the Limuru area.<br />Two taps. Fixed price. M-PESA.</p>
      </div>

      <h2 className="font-bold text-gray-800 text-lg mb-4">What do you need?</h2>

      {services.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
        </div>
      ) : (
        <div className="space-y-3">
          {services.map(s => (
            <button
              key={s.id}
              onClick={() => { setSelectedService(s); setStep("form"); }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:border-amber-400 hover:shadow-md transition-all text-left group"
            >
              <div>
                <p className="font-bold text-gray-900 group-hover:text-amber-700">{s.name}</p>
                {s.description && <p className="text-sm text-gray-500 mt-0.5">{s.description}</p>}
                {s.duration_estimate && <p className="text-xs text-gray-400 mt-1">⏱ {s.duration_estimate}</p>}
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="font-black text-amber-600 text-xl">KES {s.price_kes?.toLocaleString()}</p>
                <p className="text-xs text-gray-400">fixed rate</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
        <p className="text-green-800 text-sm font-medium">💳 Payment via M-PESA only. No cash.</p>
      </div>
    </div>
  );

  if (step === "form") return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <button onClick={() => setStep("select")} className="text-amber-600 font-medium text-sm mb-6 flex items-center gap-1">
        ← Back
      </button>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
        <p className="font-bold text-amber-900">{selectedService?.name}</p>
        <p className="text-2xl font-black text-amber-700">KES {selectedService?.price_kes?.toLocaleString()}</p>
      </div>

      <h2 className="font-bold text-gray-800 text-lg mb-4">Your details</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input className="pl-9" placeholder="e.g. James Mwangi" value={form.member_name} onChange={e => setForm(f => ({ ...f, member_name: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">M-PESA Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input className="pl-9" placeholder="e.g. 0712 345 678" value={form.member_phone} onChange={e => setForm(f => ({ ...f, member_phone: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Vehicle Type</label>
          <Select value={form.vehicle_type} onValueChange={v => setForm(f => ({ ...f, vehicle_type: v }))}>
            <SelectTrigger><SelectValue placeholder="Select your vehicle" /></SelectTrigger>
            <SelectContent>
              {VEHICLE_TYPES.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">Where are you?</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows={2}
              placeholder="e.g. Near Limuru Total petrol station, on Nairobi Road"
              value={form.location_description}
              onChange={e => setForm(f => ({ ...f, location_description: e.target.value }))}
            />
          </div>
          <button
            onClick={getLocation}
            disabled={locating}
            className="mt-1.5 text-xs text-amber-600 font-medium flex items-center gap-1 hover:underline"
          >
            {locating ? <Loader2 className="w-3 h-3 animate-spin" /> : <MapPin className="w-3 h-3" />}
            {locating ? "Getting location..." : "Share GPS location"}
            {form.latitude && !locating && " ✓"}
          </button>
        </div>

        <Button
          className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 text-base rounded-xl"
          onClick={submit}
          disabled={submitting || !form.member_name || !form.member_phone || !form.vehicle_type || !form.location_description}
        >
          {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Tyre Help"}
        </Button>
      </div>
    </div>
  );

  if (step === "tracking") return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <div className="text-center mb-8">
        {activeJob?.status === "completed" ? (
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
        ) : (
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        )}
        <h2 className="text-xl font-black text-gray-900">
          {activeJob?.status === "completed" ? "Job Complete!" : "Tracking your job"}
        </h2>
        <p className="text-gray-500 mt-1 text-sm">{STATUS_MESSAGES[activeJob?.status]}</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Service</span>
          <span className="font-bold text-gray-900">{activeJob?.service_type_name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Amount</span>
          <span className="font-black text-amber-600 text-lg">KES {activeJob?.price_kes?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Status</span>
          <StatusBadge status={activeJob?.status} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Payment</span>
          <StatusBadge status={activeJob?.payment_status} />
        </div>
      </div>

      {activeJob?.status === "completed" && !activeJob?.rating_stars && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          {ratingSubmitted ? (
            <p className="text-center text-green-700 font-semibold">⭐ Thank you for your rating!</p>
          ) : (
            <>
              <h3 className="font-bold text-gray-900 mb-3">Rate your mechanic</h3>
              <div className="flex gap-2 mb-3">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => setRating(s)}>
                    <Star className={`w-8 h-8 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-2 text-sm resize-none mb-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
                rows={2}
                placeholder="Any comments? (optional)"
                value={ratingNote}
                onChange={e => setRatingNote(e.target.value)}
              />
              <Button
                className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold"
                onClick={submitRating}
                disabled={!rating}
              >
                Submit Rating
              </Button>
            </>
          )}
        </div>
      )}

      <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-green-800 text-sm font-semibold mb-1">M-PESA Payment</p>
        <p className="text-green-700 text-sm">You will receive an M-PESA STK push to <strong>{activeJob?.member_phone}</strong> for KES {activeJob?.price_kes?.toLocaleString()} once the job is complete.</p>
      </div>

      <button
        onClick={() => { setStep("select"); setActiveJob(null); setForm({ member_name: "", member_phone: "", vehicle_type: "", location_description: "" }); setRating(0); setRatingNote(""); setRatingSubmitted(false); }}
        className="mt-6 w-full text-center text-sm text-gray-400 hover:text-gray-600"
      >
        Start a new request
      </button>
    </div>
  );
}