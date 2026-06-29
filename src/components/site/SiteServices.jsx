import Reveal from "./Reveal";

const SERVICES = [
  { category: "Tyre Services", price: "from KES 122", items: ["Puncture repair (tubeless & tube)", "Tyre change & spare swap", "Tyre balancing", "Inflation & refit"] },
  { category: "Battery & Electrical", price: "from KES 385", items: ["Jump start (dead battery)", "Battery replacement (supply + fit)"] },
  { category: "Fuel & Fluids", price: "from KES 300", items: ["Emergency fuel delivery (up to 5L)", "Engine coolant top-up"] },
  { category: "Recovery & Fixes", price: "from KES 500", items: ["Towing coordination (local)", "Loose / fallen belt re-fitting"] },
];

export default function SiteServices() {
  return (
    <section id="what" className="bg-white py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-2xl mb-16">
          <span className="text-[#2563EB] font-bold text-sm uppercase tracking-[0.2em]">What We Do</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 text-[#0D1B2A] tracking-tight leading-tight">
            Fast, reliable roadside assistance.
          </h2>
          <p className="text-gray-500 text-lg mt-5 leading-relaxed">
            A verified skill expert reaches stranded drivers along the Waiyaki Way corridor in under 20 minutes. Fixed rates. No negotiation. No surprises. Pay via M-PESA.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.category} delay={i * 0.08}>
              <div className="group h-full bg-[#F6F8FC] hover:bg-[#0D1B2A] border border-gray-100 rounded-3xl p-7 transition-all duration-300">
                <p className="text-[#F59E0B] font-black text-sm mb-1">{s.price}</p>
                <h3 className="text-xl font-black text-[#0D1B2A] group-hover:text-white transition-colors mb-5">{s.category}</h3>
                <ul className="space-y-2.5">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-gray-600 group-hover:text-blue-100/70 transition-colors">
                      <span className="text-[#2563EB] group-hover:text-[#F59E0B] font-black mt-0.5">→</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="text-center text-gray-400 text-sm mt-10">
            All rates fixed · All vehicle types covered · Skill expert receives <strong className="text-[#0D1B2A]">80%</strong> of every fee
          </p>
        </Reveal>
      </div>
    </section>
  );
}