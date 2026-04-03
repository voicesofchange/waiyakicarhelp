import StatusBadge from "./StatusBadge";
import { MapPin, Phone, Car, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function JobCard({ job, onClick, actions }) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-bold text-gray-900 text-base">{job.service_type_name}</p>
          <p className="text-amber-600 font-semibold text-sm">KES {job.price_kes?.toLocaleString()}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="space-y-1.5 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Car className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span>{job.member_name} · {job.vehicle_type}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span>{job.member_phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="line-clamp-1">{job.location_description}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span>{formatDistanceToNow(new Date(job.created_date), { addSuffix: true })}</span>
        </div>
      </div>

      {actions && <div className="mt-3 flex gap-2" onClick={e => e.stopPropagation()}>{actions}</div>}
    </div>
  );
}