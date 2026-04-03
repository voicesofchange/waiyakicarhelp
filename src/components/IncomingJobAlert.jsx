import { useEffect, useState } from "react";
import { MapPin, Phone, Car, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIMEOUT_SECONDS = 30;

export default function IncomingJobAlert({ job, onAccept, onDecline, onTimeout, accepting }) {
  const [seconds, setSeconds] = useState(TIMEOUT_SECONDS);

  useEffect(() => {
    // Vibrate pattern: buzz buzz buzz
    if (navigator.vibrate) {
      navigator.vibrate([400, 200, 400, 200, 400]);
    }

    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(interval);
          onTimeout ? onTimeout() : onDecline(job);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [job.id]);

  const pct = (seconds / TIMEOUT_SECONDS) * 100;
  const color = seconds > 15 ? "#22c55e" : seconds > 7 ? "#f59e0b" : "#ef4444";

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col">
      {/* Countdown ring at top */}
      <div className="flex flex-col items-center pt-10 pb-6 bg-gray-900">
        <div className="relative w-24 h-24 mb-3">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="42" fill="none" stroke="#374151" strokeWidth="8" />
            <circle
              cx="48" cy="48" r="42" fill="none"
              stroke={color} strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-white">{seconds}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm">New job request!</p>
        <div className="mt-2 px-4 py-1.5 bg-amber-500 rounded-full">
          <span className="text-gray-900 font-black text-sm uppercase tracking-wide">Incoming Job</span>
        </div>
      </div>

      {/* Job Details */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        <div className="bg-gray-800 rounded-2xl p-5">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Service Requested</p>
          <p className="text-white font-black text-3xl">{job.service_type_name}</p>
          <p className="text-amber-400 font-bold text-2xl mt-1">KES {job.price_kes?.toLocaleString()}</p>
          <p className="text-gray-400 text-xs mt-1">Your share: KES {Math.round((job.price_kes || 0) * 0.8).toLocaleString()}</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-sm">👤</span>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Customer</p>
              <p className="text-white font-bold">{job.member_name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Phone (M-PESA)</p>
              <a href={`tel:${job.member_phone}`} className="text-amber-400 font-black text-lg">{job.member_phone}</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center shrink-0">
              <Car className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Vehicle</p>
              <p className="text-white font-semibold">{job.vehicle_type}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Location</p>
              <p className="text-white font-semibold">{job.location_description}</p>
              {job.latitude && (
                <a href={`https://maps.google.com/?q=${job.latitude},${job.longitude}`} target="_blank" rel="noreferrer"
                  className="text-amber-400 text-xs hover:underline mt-1 block">
                  📍 Open in Google Maps →
                </a>
              )}
            </div>
          </div>

          {job.member_notes && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-sm">📝</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Customer Notes</p>
                <p className="text-white text-sm">{job.member_notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-8 pt-4 bg-gray-950 space-y-3">
        <Button
          className="w-full bg-green-500 hover:bg-green-400 text-white font-black py-5 text-xl rounded-2xl shadow-lg"
          onClick={() => onAccept(job)}
          disabled={accepting}
        >
          {accepting ? <Loader2 className="w-6 h-6 animate-spin" /> : "✓ Accept Job"}
        </Button>
        <Button
          variant="outline"
          className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 font-bold py-4 text-base rounded-2xl"
          onClick={() => onDecline(job)}
          disabled={accepting}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}