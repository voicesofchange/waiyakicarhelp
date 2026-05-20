const PILLARS = [
  {
    icon: "🚗",
    title: "Serve Drivers",
    desc: "Fixed rates for tyre services — no negotiation under stress. A verified skill expert dispatched to your location via app. Pay via M-PESA. Value enters the loop here — predictable, digital, and accountable.",
  },
  {
    icon: "🔧",
    title: "Specialise in Tyres",
    desc: "Puncture repair, tyre change, balancing, inflation, and roadside fixes — our expertise is concentrated in tyre services where we deliver speed, reliability, and local mastery along the Waiyaki Way corridor.",
  },
  {
    icon: "👨‍🔧",
    title: "Empower Skill Experts",
    desc: "80% of every job fee returns directly to the mechanic — a skilled expert defined by their expertise, knowledge, experience, and the daily services they provide to people in need. Creating household income and local wealth.",
  },
  {
    icon: "🌍",
    title: "Restore the Environment",
    desc: "Platform revenue funds wetland restoration and corridor clean-ups — ensuring economic activity regenerates rather than depletes the environment.",
  },
];

export default function LandingMission() {
  return (
    <section id="mission" className="bg-[#F0F4FF]">
      <div className="bg-[#0D1B2A] px-6 py-16 text-center">
        <span className="text-[#F59E0B] font-bold text-sm uppercase tracking-widest">Our Mission</span>
        <h2 className="text-4xl font-black mt-3 mb-4 text-white">Four Pillars. One Reinforcing Loop.</h2>
        <p className="text-blue-100/70 max-w-2xl mx-auto text-lg leading-relaxed">
          Waiyaki House is built on a circular economy of <strong className="text-[#F59E0B]">collective responsibility</strong>: every participant — driver, skill expert, investor, community — holds a shared stake in making the loop work. Value generated in one pillar flows directly into the next, compounding impact across mobility, livelihoods, environment, and community knowledge.
        </p>
      </div>
      <div className="max-w-5xl mx-auto text-center px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
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