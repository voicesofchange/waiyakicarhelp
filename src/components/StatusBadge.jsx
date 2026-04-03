export default function StatusBadge({ status }) {
  const config = {
    pending:   { label: "Pending",    bg: "bg-amber-100",  text: "text-amber-800" },
    accepted:  { label: "Accepted",   bg: "bg-blue-100",   text: "text-blue-800" },
    en_route:  { label: "En Route",   bg: "bg-purple-100", text: "text-purple-800" },
    arrived:   { label: "Arrived",    bg: "bg-indigo-100", text: "text-indigo-800" },
    completed: { label: "Completed",  bg: "bg-green-100",  text: "text-green-800" },
    cancelled: { label: "Cancelled",  bg: "bg-red-100",    text: "text-red-800" },
    unpaid:         { label: "Unpaid",             bg: "bg-red-100",    text: "text-red-800" },
    paid_to_waiyaki:{ label: "Paid to Waiyaki",   bg: "bg-amber-100",  text: "text-amber-800" },
    paid_to_mechanic:{ label: "Mechanic Paid",    bg: "bg-green-100",  text: "text-green-800" },
  };
  const c = config[status] || { label: status, bg: "bg-gray-100", text: "text-gray-700" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}