const SERVICES = [
  {
    icon: "⚖️", color: "bg-[#0D1B2A]", accentText: "text-[#2563EB]",
    title: "Legal Consultancy", subtitle: "Rights, contracts & community law",
    desc: "Accessible, plain-language legal guidance for Kenyans who need it most. We advise individuals, small businesses, community groups, and cooperatives on their rights, contracts, land matters, and navigating Kenya's legal systems.",
    areas: [
      "Land rights & community title disputes",
      "Small business contracts & registration",
      "Employment law & worker rights",
      "Consumer rights & dispute resolution",
      "Legal literacy workshops for communities",
    ],
  },
  {
    icon: "🌿", color: "bg-[#3F7E44]", accentText: "text-[#3F7E44]",
    title: "Environmental Stewardship", subtitle: "Conservation, land & ecological planning",
    desc: "Drawing on our commitment to Manguo Wetlands and corridor conservation, we advise communities, developers, and organisations on responsible environmental practice, conservation compliance, and ecosystem-centred development in Kenya.",
    areas: [
      "Wetland & riparian ecosystem advisory",
      "Environmental impact facilitation",
      "Community conservation strategy",
      "Waste management & clean corridor planning",
      "Climate-resilient land use guidance",
    ],
  },
  {
    icon: "🤝", color: "bg-[#F59E0B]", accentText: "text-amber-700",
    title: "Dialogue & Facilitation", subtitle: "Conversations that matter, done right",
    desc: "Some of humanity's most important decisions require neutral, skilled facilitation. We convene and facilitate multi-stakeholder dialogues, community consultations, and difficult conversations — from land negotiations to policy roundtables — for the better of all parties.",
    areas: [
      "Community & inter-tribal dialogue facilitation",
      "Multi-stakeholder policy roundtables",
      "Land & resource conflict mediation",
      "NGO & government consultation processes",
      "Youth civic engagement sessions",
    ],
  },
];

export default function LandingConsultancy() {
  return (
    <section id="consultancy" className="bg-white">
      <div className="bg-[#0D1B2A] px-6 py-16 text-center">
        <span className="inline-block bg-[#2563EB]/20 text-blue-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#2563EB]/30 mb-6">
          Waiyaki House Consultancy
        </span>
        <h2 className="text-4xl font-black mt-3 mb-4 text-white">Knowledge Is the Final Layer of the Loop.</h2>
        <p className="text-blue-100/70 max-w-2xl mx-auto text-lg leading-relaxed">
          Collective responsibility requires that knowledge — legal, environmental, and facilitative — belongs to everyone. A circular economy cannot survive when only some communities can defend their rights. Waiyaki House offers independent consultancy open to all Kenyans, embedding shared accountability into every engagement.
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-16">

        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {SERVICES.map(service => (
            <div key={service.title} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className={`${service.color} px-6 py-5 flex items-center gap-3`}>
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <p className="text-white font-black text-base">{service.title}</p>
                  <p className="text-white/70 text-xs">{service.subtitle}</p>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{service.desc}</p>
                <p className={`text-xs font-bold uppercase tracking-wide mb-3 ${service.accentText}`}>Areas We Cover</p>
                <div className="space-y-2 flex-1">
                  {service.areas.map(a => (
                    <div key={a} className="flex items-start gap-2">
                      <span className={`font-black text-xs mt-0.5 ${service.accentText}`}>→</span>
                      <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
                <a href="#contact-form" className="mt-6 block text-center border-2 border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB] text-gray-600 font-bold text-sm py-2.5 rounded-xl transition-colors">
                  Enquire →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0D1B2A] rounded-2xl p-8 text-center">
          <p className="text-[#F59E0B] font-black text-sm uppercase tracking-widest mb-3">Our Approach</p>
          <h3 className="text-white font-black text-2xl mb-4">Independent. Principled. Completing the Loop.</h3>
          <p className="text-blue-100/70 max-w-2xl mx-auto leading-relaxed text-sm">
            In our circular model, consultancy is not a separate business — it is the layer that protects and compounds everything else. Legal knowledge defends communities. Environmental stewardship restores what mobility uses. Facilitation resolves the conflicts that slow progress. Together, they ensure the loop keeps turning — for everyone, not just those who can pay a premium for good counsel.
          </p>
          <a href="#contact-form" className="inline-block mt-6 bg-[#F59E0B] text-[#0D1B2A] font-black px-8 py-3 rounded-xl hover:bg-yellow-400 transition-colors text-sm">
            Request a Consultation →
          </a>
        </div>
      </div>
    </section>
  );
}