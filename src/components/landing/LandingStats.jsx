const STATS = [
  { value: "< 20min", label: "Expert Response Time" },
  { value: "80%", label: "Revenue to Skill Experts" },
  { value: "12+", label: "Roadside Services" },
  { value: "M-PESA", label: "Secure Digital Payments" },
];

export default function LandingStats() {
  return (
    <section className="bg-[#2563EB] py-10 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map(stat => (
          <div key={stat.label}>
            <p className="text-3xl font-black text-white">{stat.value}</p>
            <p className="text-sm text-blue-100 font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}