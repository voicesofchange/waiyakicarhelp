import Reveal from "./Reveal";

const PHASES = [
  { label: "Phase 1", title: "Limuru Operations", active: true, desc: "Live now. Driver requests fulfilled, skill experts earning, community value generated — every job strengthens the loop." },
  { label: "Phase 2", title: "Corridor Expansion", active: false, desc: "Expanding the loop to Kikuyu, Westlands, and key Nairobi corridors. Growing the contractor network and launching fleet accounts." },
  { label: "Phase 3", title: "Platform Scale", active: false, desc: "A self-sustaining circular economy — pan-African coverage, insurance partnerships, a training academy, and a conservation endowment." },
];

export default function SiteVision() {
  return (
    <section id="vision" className="bg-white py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <span className="text-[#2563EB] font-bold text-sm uppercase tracking-[0.2em]">Our Vision</span>
            <h2 className="text-4xl sm:text-5xl font-black mt-4 text-[#0D1B2A] tracking-tight leading-tight">
              Operational in Limuru. Scaling across Kenya.
            </h2>
            <p className="text-gray-500 text-lg mt-6 leading-relaxed">
              The circular model is live — skill experts earning, drivers served, community value generated. Every phase adds more participants, more corridors, and more compounding impact.
            </p>
            <p className="text-gray-500 text-lg mt-4 leading-relaxed">
              As collective ownership grows, the system compounds: more drivers, more experts, more community partners, more environmental and economic impact.
            </p>
          </Reveal>

          <div className="space-y-4">
            {PHASES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className={`rounded-3xl p-7 border-l-4 ${p.active ? "bg-[#0D1B2A] border-[#F59E0B]" : "bg-[#F6F8FC] border-gray-200"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-black uppercase tracking-widest ${p.active ? "text-[#F59E0B]" : "text-gray-400"}`}>{p.label}</span>
                    {p.active && <span className="text-[10px] font-black bg-[#F59E0B] text-[#0D1B2A] px-2 py-0.5 rounded-full">LIVE NOW</span>}
                  </div>
                  <h3 className={`text-xl font-black mb-2 ${p.active ? "text-white" : "text-[#0D1B2A]"}`}>{p.title}</h3>
                  <p className={`text-sm leading-relaxed ${p.active ? "text-blue-100/70" : "text-gray-500"}`}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}