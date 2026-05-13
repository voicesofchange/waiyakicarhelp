const PRIMARY_SDGS = [
  {
    num: "SDG 8", color: "bg-[#A21942]", icon: "💼",
    title: "Decent Work & Economic Growth", highlight: "Youth Economic Empowerment",
    desc: "The circular model demands that economic value reach those who generate it. Waiyaki prioritises young skill experts from underserved communities — mechanics and technicians defined by their expertise and knowledge — giving them formal contracts, digital income records, and 80% of every job fee. Informal roadside labour becomes structured, dignified, career-building work.",
  },
  {
    num: "SDG 11", color: "bg-[#F99D26]", icon: "🏙️",
    title: "Sustainable Cities & Communities", highlight: "Safer Urban Roads",
    desc: "A circular economy thrives in well-functioning cities. Waiyaki reduces breakdown dwell time, clears corridors faster, and cuts unnecessary emissions — making Kenya's roads safer and more economically productive. Efficient roads support the communities that depend on them.",
  },
  {
    num: "SDG 10", color: "bg-[#DD1367]", icon: "⚖️",
    title: "Reduced Inequalities", highlight: "Formalising the Informal Sector",
    desc: "A circular economy cannot thrive when large segments of its skilled workforce are excluded. Waiyaki brings mechanics and specialist service providers into the formal digital economy — traceable income, professional ratings, banking access — so that the value they create circulates back to them and their families.",
  },
];

const SECONDARY_SDGS = [
  { num: "SDG 1", color: "border-[#E5243B]", icon: "🏠", title: "No Poverty", desc: "Circular income — 80% of every fee returned to the skill expert — creates stable, predictable household income that lifts families out of poverty." },
  { num: "SDG 9", color: "border-[#FD6925]", icon: "🏗️", title: "Industry & Innovation", desc: "Digital dispatch, GPS, and M-PESA build the modern infrastructure that makes the circular model possible — and replicable across Africa." },
  { num: "SDG 17", color: "border-[#19486A]", icon: "🤝", title: "Partnerships for Goals", desc: "The circular economy requires partners at every layer — investors, NGOs, skill experts, corporates, and government all have a role in closing the loop." },
  { num: "SDG 13", color: "border-[#3F7E44]", icon: "🌍", title: "Climate Action", desc: "Faster repairs mean less idling, fewer tow trips, and reduced emissions. Environmental consultancy and wetland restoration close the ecological loop." },
];

const CLEAN_UP_ITEMS = [
  "Quarterly wetland restoration days at Manguo",
  "Monthly roadside clean-up events in Limuru",
  "Youth volunteer programme with certificates",
  "Partnerships with local schools and conservation groups",
];

export default function LandingSDGs() {
  return (
    <section id="sdgs" className="py-24 px-6 bg-[#0D1B2A] text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-4">
          <span className="inline-block bg-[#2563EB]/20 text-blue-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#2563EB]/30 mb-6">
            UN Sustainable Development Goals
          </span>
          <h2 className="text-4xl font-black mb-4">Built for People, Planet &amp; Prosperity.</h2>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-lg leading-relaxed mb-16">
            Waiyaki House is not just a business — it is a deliberately circular response to Kenya's development challenges. Every job dispatched advances multiple UN SDGs simultaneously, because the circular model ensures value flows outward rather than being extracted.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {PRIMARY_SDGS.map(sdg => (
            <div key={sdg.num} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
              <div className={`${sdg.color} px-6 py-4 flex items-center gap-3`}>
                <span className="text-2xl">{sdg.icon}</span>
                <div>
                  <p className="text-white font-black text-sm">{sdg.num}</p>
                  <p className="text-white/80 text-xs leading-tight">{sdg.title}</p>
                </div>
              </div>
              <div className="p-6 flex-1">
                <p className="text-[#F59E0B] font-bold text-sm mb-3">{sdg.highlight}</p>
                <p className="text-blue-100/70 text-sm leading-relaxed">{sdg.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {SECONDARY_SDGS.map(sdg => (
            <div key={sdg.num} className={`bg-white/5 border-l-4 ${sdg.color} border border-white/10 rounded-2xl p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{sdg.icon}</span>
                <span className="text-white font-black text-xs">{sdg.num}</span>
              </div>
              <p className="text-white font-bold text-sm mb-2">{sdg.title}</p>
              <p className="text-blue-100/60 text-xs leading-relaxed">{sdg.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-8">
          <div className="bg-[#3F7E44] px-6 py-4 flex items-center gap-3">
            <span className="text-2xl">🌿</span>
            <div>
              <p className="text-white font-black text-sm">SDG 15 · Life on Land &amp; SDG 6 · Clean Water</p>
              <p className="text-white/80 text-xs">Environmental Stewardship — Manguo Wetlands, Limuru</p>
            </div>
          </div>
          <div className="p-8 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-[#F59E0B] font-bold text-sm mb-3">Wetland Restoration</p>
              <h3 className="text-white font-black text-xl mb-4">Protecting the Manguo Wetlands.</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-4">
                The Manguo Wetlands in Limuru — a critical freshwater ecosystem and biodiversity corridor — face mounting pressure from encroachment and pollution. In a circular economy, the environment is not a byproduct of business; it is a stakeholder. Waiyaki House commits a ring-fenced portion of platform revenue to Manguo's long-term restoration.
              </p>
              <p className="text-blue-100/70 text-sm leading-relaxed">
                Business activity generates revenue. Revenue funds restoration. A restored ecosystem supports community health and wellbeing. Healthy communities drive stronger local economic activity. The loop closes — and it grows with us.
              </p>
            </div>
            <div>
              <p className="text-[#F59E0B] font-bold text-sm mb-3">Community Clean-Ups</p>
              <h3 className="text-white font-black text-xl mb-4">Clean Corridors. Proud Communities.</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
                Our skill experts travel these roads daily. They witness the waste, the pollution, and the neglect. In a circular economy, those who know the problem are best placed to solve it. Waiyaki funds and organises regular clean-up events along our operational corridors — turning economic activity into environmental action.
              </p>
              <div className="space-y-3">
                {CLEAN_UP_ITEMS.map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-[#3F7E44] font-black text-xs mt-1">✓</span>
                    <p className="text-blue-100/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2563EB]/30 to-[#1E3A5F]/50 border border-[#2563EB]/40 rounded-2xl p-8 text-center">
          <p className="text-[#F59E0B] font-black text-sm uppercase tracking-widest mb-3">Our Youth Commitment</p>
          <h3 className="text-white font-black text-2xl mb-4">Young Skill Experts Are the Engine of Our Circular Economy.</h3>
          <p className="text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            Over 75% of Kenyans are under 35. A circular economy that excludes its youth is not circular — it is extractive. Waiyaki House makes young mechanics and skilled specialists the backbone of our contractor network: apprenticeships, certification, digital financial inclusion, and a professional identity that compounds in value as the platform grows. When youth skill experts thrive, the whole loop accelerates.
          </p>
        </div>
      </div>
    </section>
  );
}