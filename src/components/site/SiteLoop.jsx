import Reveal from "./Reveal";

const PILLARS = [
  { num: "01", title: "Roadside Assistance", desc: "On-demand tyre, battery, fuel and recovery services dispatched to drivers in minutes — the entry point of the loop." },
  { num: "02", title: "Skill Expert Empowerment", desc: "Every job dignifies a skilled professional with steady, app-dispatched work and 80% of every fee paid within 24 hours." },
  { num: "03", title: "Community Investment", desc: "Earnings stay local. Income records build credit access, and platform value reinvests into the communities we serve." },
  { num: "04", title: "Environmental Stewardship", desc: "A share of every loop funds conservation — including Manguo Wetlands restoration around our home corridor." },
];

export default function SiteLoop() {
  return (
    <section id="loop" className="bg-[#0D1B2A] py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <Reveal className="max-w-2xl mb-16">
          <span className="text-[#F59E0B] font-bold text-sm uppercase tracking-[0.2em]">The Waiyaki Loop</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 text-white tracking-tight leading-tight">
            Four pillars. One reinforcing cycle.
          </h2>
          <p className="text-blue-100/70 text-lg mt-5 leading-relaxed">
            The engine of this circular economy is collective responsibility — every participant, from driver to skill expert to investor to community, holds a shared stake. When one wins, all win.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {PILLARS.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08}>
              <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#F59E0B]/40 transition-colors">
                <div className="flex items-start gap-5">
                  <span className="text-5xl font-black text-[#F59E0B]/30 leading-none">{p.num}</span>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">{p.title}</h3>
                    <p className="text-blue-100/60 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}