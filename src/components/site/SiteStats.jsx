import Reveal from "./Reveal";

const STATS = [
  { value: "< 20", suffix: "min", label: "Expert response time" },
  { value: "80", suffix: "%", label: "Revenue to skill experts" },
  { value: "12", suffix: "+", label: "Roadside services" },
  { value: "M-PESA", suffix: "", label: "Secure digital payments" },
];

export default function SiteStats() {
  return (
    <section className="bg-[#0D1B2A] border-y border-white/10 py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center lg:border-r lg:border-white/10 lg:last:border-0">
            <p className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {s.value}<span className="text-[#F59E0B]">{s.suffix}</span>
            </p>
            <p className="text-blue-200/60 text-sm font-medium mt-2">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}