import Reveal from "./Reveal";
import ContactForm from "@/components/landing/ContactForm";

const AUDIENCES = [
  { icon: "💼", title: "Investors", desc: "Seed, angel, VC, and impact capital to accelerate corridor expansion. Equity stakes from USD $5k angel tickets to $150k+ institutional rounds." },
  { icon: "🔧", title: "Skill Experts", desc: "Tyre, battery, and roadside specialists in the Limuru area. Earn 80% of every job, paid within 24 hours via M-PESA — no roadside waiting." },
  { icon: "🏢", title: "Corporates & Fleets", desc: "Priority roadside contracts for businesses, NGOs, embassies, and fleet operators. Fixed monthly rates and a dedicated account manager." },
  { icon: "🌍", title: "NGOs & Grant Partners", desc: "Co-fund youth employment, wetland restoration, and informal-sector digitalisation. Partner on SDG impact reporting and research." },
  { icon: "🚗", title: "Drivers", desc: "Available now in the Limuru area. Fixed transparent pricing, verified experts in under 20 minutes, and secure M-PESA payment." },
];

export default function SitePartner() {
  return (
    <section id="partner" className="bg-[#0D1B2A] py-28 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <Reveal className="max-w-2xl mb-16">
          <span className="text-[#F59E0B] font-bold text-sm uppercase tracking-[0.2em]">Collaborate</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-4 text-white tracking-tight leading-tight">
            There's a place for you in the loop.
          </h2>
          <p className="text-blue-100/70 text-lg mt-5 leading-relaxed">
            Collective responsibility means the loop only works when everyone shows up. Whether you invest capital, contribute skills, bring a fleet, or champion the environment — you hold a shared stake in its success.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07}>
              <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-[#F59E0B]/40 transition-colors">
                <span className="text-3xl">{a.icon}</span>
                <h3 className="text-xl font-black text-white mt-4 mb-2">{a.title}</h3>
                <p className="text-blue-100/60 text-sm leading-relaxed">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}