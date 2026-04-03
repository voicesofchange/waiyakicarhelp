import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { MapPin, Phone, User, CheckCircle, Loader2, Star, FileText, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileSelect from "@/components/MobileSelect";
import StatusBadge from "@/components/StatusBadge";

const VEHICLE_TYPES = ["Regular Car / Saloon", "SUV / 4WD", "Truck / Lorry", "Matatu / Minibus", "Pickup"];

const STATUS_MESSAGES = {
  pending:   { icon: "⏳", text: "Waiting for a mechanic to accept your request…", color: "text-amber-600" },
  accepted:  { icon: "✅", text: "Mechanic accepted! They are preparing to head your way.", color: "text-blue-600" },
  en_route:  { icon: "🚗", text: "Your mechanic is on the way!", color: "text-purple-600" },
  arrived:   { icon: "📍", text: "Mechanic has arrived at your location.", color: "text-indigo-600" },
  completed: { icon: "🎉", text: "Job complete! Please pay via M-PESA below.", color: "text-green-600" },
  cancelled: { icon: "❌", text: "This job was cancelled. Please call 0712 550 245.", color: "text-red-600" },
};

const slide = {
  enter:  { x: 50,  opacity: 0 },
  center: { x: 0,   opacity: 1 },
  exit:   { x: -50, opacity: 0 },
};

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step") || "select";
  const setStep = (s) => s === "select" ? setSearchParams({}) : setSearchParams({ step: s });

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
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
    const appUrl = window.location.origin;
    base44.integrations.Core.SendEmail({
      to: "sustainthevoices@gmail.com",
      subject: `🔧 NEW JOB REQUEST — ${selectedService.name} — Act Now!`,
      body: `Hi Prince Waiyaki,\n\nYou have a NEW JOB REQUEST on Waiyaki Dispatch.\n\n👉 OPEN APP: ${appUrl}\n\nService: ${selectedService.name}\nPrice:   KES ${selectedService.price_kes?.toLocaleString()}\nCustomer: ${form.member_name}\nPhone:    ${form.member_phone}\nVehicle:  ${form.vehicle_type}\nLocation: ${form.location_description}\nNotes:    ${form.member_notes || "None"}\n\nTime: ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}\n\n— Waiyaki Dispatch`,
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
      body: `M-PESA code submitted.\n\nJob: ${activeJob.id}\nMember: ${activeJob.member_name} — ${activeJob.member_phone}\nService: ${activeJob.service_type_name} — KES ${activeJob.price_kes}\nCode: ${mpesaCode.trim()}`,
    }).catch(() => {});
  };

  const submitRating = async () => {
    await base44.entities.Job.update(activeJob.id, { rating_stars: rating, rating_note: ratingNote });
    setRatingSubmitted(true);
  };

  const reset = () => {
    setSearchParams({});
    setActiveJob(null);
    setForm({ member_name: "", member_phone: "", vehicle_type: "", location_description: "", member_notes: "" });
    setErrors({});
    setRating(0); setRatingNote(""); setRatingSubmitted(false);
    setMpesaCode(""); setMpesaSubmitted(false);
  };

  const StepBar = ({ current }) => {
    const steps = ["select", "form", "tracking"];
    const labels = ["Choose", "Your Info", "Track"];
    return (
      <div className="flex items-center gap-2 mb-5">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1.5 flex-1 last:flex-none">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${s === current ? "bg-amber-500" : "bg-gray-200"}`}>
              <span className={`text-xs font-black ${s === current ? "text-white" : "text-gray-400"}`}>{i + 1}</span>
            </div>
            <span className={`text-xs font-bold ${s === current ? "text-amber-600" : "text-gray-400"}`}>{labels[i]}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${steps.indexOf(current) > i ? "bg-amber-400" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        variants={slide}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >

        {/* ── SELECT ── */}
        {step === "select" && (
          <div className="min-h-screen bg-[#0F0F0F] flex flex-col">
            <div className="px-5 pt-14 pb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-black font-black text-2xl">W</span>
                </div>
                <div>
                  <h1 className="text-white font-black text-2xl tracking-tight">WAIYAKI</h1>
                  <p className="text-gray-400 text-xs">Tyre Help · Limuru Area</p>
                </div>
              </div>
              <h2 className="text-white text-3xl font-black leading-tight mb-1">Tyre problem?</h2>
              <p className="text-amber-400 text-lg font-semibold">Help is on the way.</p>
            </div>
            <div className="flex-1 bg-white rounded-t-3xl px-5 pt-6 pb-8">
              <p className="text-gray-500 text-sm font-medium mb-4 uppercase tracking-wide">Choose a service</p>
              {services.length === 0 ? (
                <div className="flex items-center justify-center py-16"><Loader2 className="w-7 h-7 animate-spin text-amber-500" /></div>
              ) : (
                <div className="space-y-3">
                  {services.map(s => (
                    <button key={s.id} onClick={() => { setSelectedService(s); setStep("form"); }}
                      className="w-full bg-white border-2 border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:border-amber-400 active:scale-95 transition-all text-left group shadow-sm">
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-base">{s.name}</p>
                        {s.description && <p className="text-sm text-gray-400 mt-0.5">{s.description}</p>}
                        {s.duration_estimate && <p className="text-xs text-gray-400 mt-1">⏱ {s.duration_estimate}</p>}
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <div className="text-right">
                          <p className="font-black text-amber-500 text-xl">KES {s.price_kes?.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">fixed rate</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-400" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-green-800 text-sm font-bold">💳 Pay via M-PESA only after job is done.</p>
                <p className="text-green-700 text-xs mt-1">No cash. No upfront payment. 100% guaranteed.</p>
              </div>
              <div className="mt-6 text-center">
                <button onClick={() => base44.auth.redirectToLogin(window.location.origin)} className="text-xs text-gray-300 hover:text-gray-500 transition-colors">
                  Staff Login
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── FORM ── */}
        {step === "form" && (
          <div className="min-h-screen bg-[#0F0F0F] flex flex-col">
            <div className="px-5 pt-12 pb-6 flex items-center gap-3">
              <button onClick={() => setStep("select")} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <p className="text-white font-black text-lg">{selectedService?.name}</p>
                <p className="text-amber-400 font-bold">KES {selectedService?.price_kes?.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex-1 bg-white rounded-t-3xl px-5 pt-6 pb-8">
              <StepBar current="form" />
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <Input className={`pl-9 h-12 rounded-xl border-2 ${errors.member_name ? "border-red-400" : "border-gray-100"} focus:border-amber-400`} placeholder="e.g. James Mwangi" value={form.member_name} onChange={e => setForm(f => ({ ...f, member_name: e.target.value }))} />
                  </div>
                  {errors.member_name && <p className="text-red-500 text-xs mt-1">{errors.member_name}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">M-PESA Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <Input className={`pl-9 h-12 rounded-xl border-2 ${errors.member_phone ? "border-red-400" : "border-gray-100"} focus:border-amber-400`} placeholder="e.g. 0712 345 678" type="tel" value={form.member_phone} onChange={e => setForm(f => ({ ...f, member_phone: e.target.value }))} />
                  </div>
                  {errors.member_phone && <p className="text-red-500 text-xs mt-1">{errors.member_phone}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Vehicle Type</label>
                  <MobileSelect value={form.vehicle_type} onValueChange={v => setForm(f => ({ ...f, vehicle_type: v }))} options={VEHICLE_TYPES} placeholder="Select your vehicle" className={`h-12 rounded-xl border-2 ${errors.vehicle_type ? "border-red-400" : "border-gray-100"}`} />
                  {errors.vehicle_type && <p className="text-red-500 text-xs mt-1">{errors.vehicle_type}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Your Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
                    <textarea className={`w-full pl-9 pr-3 py-3 border-2 rounded-xl text-sm resize-none focus:outline-none focus:border-amber-400 ${errors.location_description ? "border-red-400" : "border-gray-100"}`} rows={3} placeholder="e.g. Near Limuru Total petrol station, opposite KCB bank" value={form.location_description} onChange={e => setForm(f => ({ ...f, location_description: e.target.value }))} />
                  </div>
                  <button onClick={getLocation} disabled={locating} className="mt-1.5 text-xs text-amber-500 font-semibold flex items-center gap-1">
                    {locating ? <Loader2 className="w-3 h-3 animate-spin" /> : <MapPin className="w-3 h-3" />}
                    {locating ? "Getting GPS…" : form.latitude ? "✓ GPS location saved" : "Share GPS location"}
                  </button>
                  {errors.location_description && <p className="text-red-500 text-xs mt-1">{errors.location_description}</p>}
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Notes (optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
                    <textarea className="w-full pl-9 pr-3 py-3 border-2 border-gray-100 rounded-xl text-sm resize-none focus:outline-none focus:border-amber-400" rows={2} placeholder="e.g. Right front tyre, road is muddy" value={form.member_notes} onChange={e => setForm(f => ({ ...f, member_notes: e.target.value }))} />
                  </div>
                </div>
                <Button className="w-full h-14 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-black font-black text-lg rounded-2xl shadow-lg" onClick={submit} disabled={submitting}>
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Help →"}
                </Button>
                <p className="text-center text-xs text-gray-400">You only pay after the job is done and you're satisfied.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── TRACKING ── */}
        {step === "tracking" && (() => {
          const statusInfo = STATUS_MESSAGES[activeJob?.status] || {};
          return (
            <div className="min-h-screen bg-[#0F0F0F] flex flex-col">
              <div className="px-5 pt-14 pb-8 text-center">
                <div className="text-5xl mb-4">{statusInfo.icon}</div>
                <h2 className="text-white font-black text-2xl mb-2">
                  {activeJob?.status === "completed" ? "Job Complete!" : activeJob?.status === "cancelled" ? "Job Cancelled" : "Tracking Your Job"}
                </h2>
                <p className={`text-base font-medium ${statusInfo.color || "text-gray-300"} bg-white/10 rounded-xl px-4 py-2 inline-block`}>{statusInfo.text}</p>
              </div>
              <div className="flex-1 bg-white rounded-t-3xl px-5 pt-6 pb-8 space-y-5">
                <StepBar current="tracking" />
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-gray-400 font-medium">Reference</span><span className="font-mono font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{activeJob?.id?.slice(-8).toUpperCase()}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-400 font-medium">Service</span><span className="font-bold text-gray-900">{activeJob?.service_type_name}</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-400 font-medium text-sm">Amount</span><span className="font-black text-amber-500 text-2xl">KES {activeJob?.price_kes?.toLocaleString()}</span></div>
                  <div className="flex justify-between items-center text-sm"><span className="text-gray-400 font-medium">Job Status</span><StatusBadge status={activeJob?.status} /></div>
                  <div className="flex justify-between items-center text-sm"><span className="text-gray-400 font-medium">Payment</span><StatusBadge status={activeJob?.payment_status} /></div>
                </div>

                {activeJob?.status === "completed" && !mpesaSubmitted && activeJob?.payment_status === "unpaid" && (
                  <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-5">
                    <h3 className="font-black text-green-900 text-lg mb-1">💳 Pay via M-PESA</h3>
                    <p className="text-green-700 text-sm mb-4">Send <strong>KES {activeJob?.price_kes?.toLocaleString()}</strong> to either number:</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white border border-green-200 rounded-xl p-3 text-center"><p className="text-xs text-gray-400 mb-0.5">Primary</p><p className="font-black text-green-700 text-base">0712 550 245</p></div>
                      <div className="bg-white border border-green-200 rounded-xl p-3 text-center"><p className="text-xs text-gray-400 mb-0.5">Alternative</p><p className="font-black text-green-700 text-base">0116 818 759</p></div>
                    </div>
                    <label className="text-xs font-bold text-green-900 uppercase tracking-wide mb-1.5 block">M-PESA confirmation code</label>
                    <Input placeholder="e.g. QHX72ABC3K" value={mpesaCode} onChange={e => setMpesaCode(e.target.value.toUpperCase())} className="mb-3 font-mono text-center text-lg tracking-widest h-12 border-2 border-green-300 rounded-xl" />
                    <Button className="w-full h-12 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl" onClick={submitMpesa} disabled={mpesaSubmitting || !mpesaCode.trim()}>
                      {mpesaSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit M-PESA Code"}
                    </Button>
                  </div>
                )}

                {(mpesaSubmitted || activeJob?.payment_status !== "unpaid") && activeJob?.status === "completed" && (
                  <div className="bg-green-50 border border-green-300 rounded-2xl p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-green-800 font-bold">Payment code received!</p>
                    <p className="text-green-600 text-sm font-mono">{activeJob?.mpesa_reference || mpesaCode}</p>
                  </div>
                )}

                {activeJob?.status === "completed" && !activeJob?.rating_stars && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    {ratingSubmitted ? (
                      <p className="text-center text-amber-700 font-bold py-2">⭐ Thank you for your rating!</p>
                    ) : (
                      <>
                        <h3 className="font-bold text-gray-900 mb-3 text-center">How was your experience?</h3>
                        <div className="flex gap-2 mb-3 justify-center">
                          {[1,2,3,4,5].map(s => (
                            <button key={s} onClick={() => setRating(s)}>
                              <Star className={`w-10 h-10 transition-colors ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                            </button>
                          ))}
                        </div>
                        <textarea className="w-full border-2 border-gray-100 rounded-xl p-3 text-sm resize-none mb-3 focus:outline-none focus:border-amber-400" rows={2} placeholder="Any comments? (optional)" value={ratingNote} onChange={e => setRatingNote(e.target.value)} />
                        <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-11 rounded-xl" onClick={submitRating} disabled={!rating}>Submit Rating</Button>
                      </>
                    )}
                  </div>
                )}

                <button onClick={reset} className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-2">← Book another service</button>
              </div>
            </div>
          );
        })()}

      </motion.div>
    </AnimatePresence>
  );
}