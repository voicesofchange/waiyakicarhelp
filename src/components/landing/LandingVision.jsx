const GOALS = [
  "Operate the circular loop in Limuru — mobility, income, community, environment",
  "Expand operations to Nairobi, Nakuru, and Thika corridors",
  "Build a certified network of 100+ contracted skill experts reinvesting in their communities",
  "Introduce fleet contracts that deepen environmental restoration funding",
  "Partner with insurers, NGOs, and DFIs to co-finance community infrastructure",
  "Scale consultancy and dialogue services across all active corridors",
];

const PHASES = [
  {
    label: "Phase 1 — Limuru Operations",
    border: "border-[#F59E0B]",
    bg: "bg-[#FEF9C3]",
    textColor: "text-[#0D1B2A]",
    bodyColor: "text-yellow-900",
    desc: "Active operations in the Limuru area. Driver requests fulfilled, skill experts earning, community value generated — every job strengthens the loop and grows our operational footprint.",
  },
  {
    label: "Phase 2 — Corridor Expansion",
    border: "border-[#2563EB]",
    bg: "bg-[#EFF6FF]",
    textColor: "text-[#0D1B2A]",
    bodyColor: "text-gray-600",
    desc: "Expanding the loop to Kikuyu, Westlands, and key Nairobi corridors. Growing the contractor network, launching fleet accounts, and deepening environmental and community programmes.",
  },
  {
    label: "Phase 3 — Platform Scale",
    border: "border-gray-200",
    bg: "bg-gray-50",
    textColor: "text-gray-700",
    bodyColor: "text-gray-500",
    desc: "A fully self-sustaining circular economy — pan-African corridor coverage, insurance partnerships, a skill expert training academy, a conservation endowment, and community consultancy embedded in every market we serve.",
  },
];

export default function LandingVision() {
  return (
    <section id="vision" className="bg-white">
      <div className="bg-[#0D1B2A] px-6 py-16 text-center">
        <span className="text-[#F59E0B] font-bold text-sm uppercase tracking-widest">Our Vision</span>
        <h2 className="text-4xl font-black mt-3 mb-4 text-white">The Loop Is Running. Now We Scale It Across Kenya.</h2>
        <p className="text-blue-100/70 max-w-2xl mx-auto text-lg leading-relaxed">
          The circular model is live in Limuru — skill experts earning, drivers served, community value generated. Every phase adds more participants, more corridors, more compounding impact.
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every phase adds more participants to the loop: more drivers, more experts, more community partners, more environmental and legal impact. The system compounds as collective ownership grows.
            </p>
            <div className="space-y-4">
              {GOALS.map(goal => (
                <div key={goal} className="flex items-start gap-3">
                  <span className="text-[#2563EB] font-black mt-0.5">→</span>
                  <p className="text-gray-600 text-sm">{goal}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {PHASES.map(phase => (
              <div key={phase.label} className={`border-l-4 ${phase.border} ${phase.bg} rounded-r-2xl p-6`}>
                <p className={`${phase.textColor} font-black text-lg mb-2`}>{phase.label}</p>
                <p className={`${phase.bodyColor} text-sm leading-relaxed`}>{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}