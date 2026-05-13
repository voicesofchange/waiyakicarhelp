const ATTRIBUTES = [
  {
    icon: "🧠",
    title: "Expertise",
    desc: "Deep, practised knowledge of a specific trade or technical domain — not learnt in a classroom alone, but forged through repeated real-world application.",
  },
  {
    icon: "📚",
    title: "Knowledge",
    desc: "A systematic understanding of how things work — materials, tools, systems, and their interactions — that enables reliable diagnosis and intervention.",
  },
  {
    icon: "⏳",
    title: "Experience",
    desc: "Years of hands-on engagement that turns knowledge into instinct — the ability to read a situation, adapt, and solve problems others cannot.",
  },
  {
    icon: "🔁",
    title: "Daily Service",
    desc: "Services that address the recurring, everyday consumption needs of individuals — not luxury interventions, but essential support for people's lives and livelihoods.",
  },
];

export default function LandingMechanicDefinition() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#2563EB]/20 mb-6">
            Who Is a Mechanic?
          </span>
          <h2 className="text-4xl font-black mt-3 mb-4 text-[#0D1B2A]">More Than a Trade. A Definition of Purpose.</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            At Waiyaki House, a <strong className="text-[#0D1B2A]">mechanic</strong> is not simply someone who fixes vehicles. A mechanic is a <span className="text-[#2563EB] font-bold">skill expert</span> — defined by their expertise, knowledge, experience, and the essential services they deliver to address the daily consumption needs of individuals. They are the practitioners on whom communities depend.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {ATTRIBUTES.map(attr => (
            <div key={attr.title} className="bg-[#F0F4FF] border border-blue-100 rounded-2xl p-6 text-center">
              <span className="text-4xl block mb-4">{attr.icon}</span>
              <h3 className="font-black text-base text-[#0D1B2A] mb-2">{attr.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{attr.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0D1B2A] rounded-2xl p-8 md:p-10 text-center">
          <p className="text-[#F59E0B] font-black text-sm uppercase tracking-widest mb-4">The Waiyaki House Definition</p>
          <blockquote className="text-white font-black text-xl md:text-2xl max-w-3xl mx-auto leading-snug mb-6">
            "A mechanic is a skill expert — a practitioner whose expertise, knowledge, and experience directly addresses the daily consumption needs of individuals and communities."
          </blockquote>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-sm leading-relaxed">
            This definition expands beyond automotive repair. Our contractor network includes anyone whose skilled, knowledge-based labour meets a recurring human need on the road — tyre specialists, battery technicians, fuel delivery experts, recovery coordinators, and more. Every one of them is a professional. Every one of them deserves dignity, fair pay, and a formal identity in Kenya's economy.
          </p>
        </div>
      </div>
    </section>
  );
}