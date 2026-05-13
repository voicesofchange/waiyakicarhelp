const PILLARS = [
  {
    icon: "🚗",
    title: "Serve Drivers",
    desc: "Fixed rates across all roadside services — no negotiation under stress. A verified skill expert dispatched to your location via app. Pay via M-PESA. Value enters the loop here — predictable, digital, and accountable.",
  },
  {
    icon: "🔧",
    title: "Empower Skill Experts",
    desc: "80% of every job fee returns directly to the mechanic — a skilled expert defined by their expertise, knowledge, experience, and the daily services they provide to people in need. Creating household income, formal economic identity, and local wealth that stays in the community.",
  },
  {
    icon: "🌍",
    title: "Restore & Advise",
    desc: "Platform revenue funds wetland restoration, corridor clean-ups, and community consultancy — ensuring economic activity regenerates rather than depletes the environment and social fabric.",
  },
];

export default function LandingMission() {
  return (
    <section id="mission" className="py-24 px-6 bg-[#F0F4FF]">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-[#2563EB] font-bold text-sm uppercase tracking-widest">Our Mission</span>
        <h2 className="text-4xl font-black mt-3 mb-4 text-[#0D1B2A]">Four Pillars. One Reinforcing Loop.</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          Waiyaki House is built on a circular economy of <strong className="text-[#0D1B2A]">collective responsibility</strong>: every participant — driver, skill expert, investor, community — holds a shared stake in making the loop work. Value generated in one pillar flows directly into the next, compounding impact across mobility, livelihoods, environment, and community knowledge.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 text-left">
              <span className="text-4xl block mb-4">{item.icon}</span>
              <h3 className="font-black text-xl mb-3 text-[#0D1B2A]">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}