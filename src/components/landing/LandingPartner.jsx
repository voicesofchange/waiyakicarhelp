import { useState } from "react";
import ContactForm from "@/components/landing/ContactForm";

const scrollToForm = () => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });

const INVESTMENT_TIERS = [
  {
    tier: "Tier 1 — Angel / Friends & Family", range: "USD $5,000 – $25,000",
    badge: "bg-blue-900/60 border-blue-500/40", badgeText: "text-blue-300",
    use: "Covers pilot operating costs, skill expert onboarding, and app infrastructure for 6 months.",
    perks: ["Equity stake at seed valuation", "Named as Founding Angel", "Monthly operational updates", "First right of refusal at Series A"],
  },
  {
    tier: "Tier 2 — Seed / Angel Syndicate", range: "USD $25,000 – $150,000",
    badge: "bg-amber-900/60 border-amber-500/40", badgeText: "text-amber-300",
    use: "Funds corridor expansion to 3–5 new areas, skill expert certification programme, and fleet sales team.",
    perks: ["Equity stake with pro-rata rights", "Observer seat on advisory board", "Quarterly investor calls", "Co-branding on impact reports"],
  },
  {
    tier: "Tier 3 — Institutional / Impact VC / DFI", range: "USD $150,000+",
    badge: "bg-green-900/60 border-green-500/40", badgeText: "text-green-300",
    use: "Capitalises full Kenya expansion, insurance partnerships, skill expert training academy, and pan-African pilot.",
    perks: ["Lead investor rights", "Board seat", "SDG & impact reporting co-authorship", "Partnership in grant applications", "Strategic co-investor introductions"],
  },
];

const MECHANIC_REQUIREMENTS = [
  "Proven tyre repair and fitting skills (tubeless, tube, balancing)",
  "Ability to perform jump starts, minor roadside fixes, and fluid top-ups",
  "Based in Limuru, Kikuyu, or along the Waiyaki Way corridor",
  "Reliable, professional, and mobile (motorbike / vehicle preferred)",
  "Comfortable with a mobile app and M-PESA",
];

const MECHANIC_PERKS = [
  "80% of every job fee paid within 24 hours via M-PESA",
  "Steady, app-dispatched job flow — no roadside waiting",
  "Digital income records to support banking and credit access",
  "Professional ratings and certification pathway",
  "Priority access to Waiyaki's skill expert training programme",
];

const CORPORATE_REQUIREMENTS = [
  "Businesses or NGOs with 2+ vehicles operating around Limuru / Nairobi",
  "Fleet operators seeking structured monthly roadside assistance cover",
  "Organisations wanting to offer roadside assistance as a staff benefit",
  "Embassies, development agencies, and humanitarian organisations",
];

const CORPORATE_PERKS = [
  "Priority dispatch — your vehicles jump the queue",
  "Fixed monthly contract rate — no surprise invoices",
  "Monthly fleet service report with job history",
  "Dedicated account manager for your organisation",
  "Scalable cover as your fleet grows",
];

const NGO_AREAS = [
  "Youth employment and skills development grants",
  "Manguo Wetlands restoration and conservation co-funding",
  "Informal sector digitalisation and financial inclusion programmes",
  "Road safety and urban mobility research partnerships",
  "Co-authorship on SDG impact reports and development publications",
];

const DRIVER_PERKS = [
  "Access to all roadside services — available now in the Limuru area",
  "Fixed, transparent pricing — no roadside negotiation, ever",
  "Tyre repairs, jump starts, fuel delivery, towing & more",
  "Verified skill expert dispatched to your location in under 20 minutes",
  "Pay securely via M-PESA — no cash handling",
];

export default function LandingPartner() {
  return (
    <section id="partner-with-us" className="bg-[#F0F4FF]">
      <div className="bg-[#0D1B2A] px-6 py-16 text-center">
        <span className="text-[#F59E0B] font-bold text-sm uppercase tracking-widest">Collaborate</span>
        <h2 className="text-4xl font-black mt-3 mb-4 text-white">Partner With Waiyaki House</h2>
        <p className="text-blue-100/70 max-w-2xl mx-auto text-lg">
          Collective responsibility means the loop only works when everyone shows up. Whether you invest capital, contribute skills, bring a fleet, or champion the environment — there is a place for you in the loop, and a shared stake in its success.
        </p>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          {/* INVESTORS */}
          <div className="bg-[#0D1B2A] rounded-2xl overflow-hidden col-span-2">
            <div className="px-8 py-5 border-b border-white/10 flex items-center gap-3">
              <span className="text-2xl">💼</span>
              <div>
                <p className="text-white font-black text-lg">Investors</p>
                <p className="text-blue-300 text-xs">Seed round · Angel · VC · Impact investors · Development finance</p>
              </div>
            </div>
            <div className="p-8">
              <p className="text-blue-100/70 text-sm leading-relaxed mb-8">
                Investing in Waiyaki House means investing in a circular economy that compounds. Capital deployed here generates returns across mobility, livelihoods, environment, and community knowledge — simultaneously. Our operations are live in Limuru, generating real jobs and real community value. We are now growing the loop and inviting strategic capital partners to accelerate corridor expansion.
              </p>
              <p className="text-[#F59E0B] font-bold text-sm uppercase tracking-wide mb-4">Investment Tiers — What We're Asking For</p>
              <div className="space-y-3 mb-8">
                {INVESTMENT_TIERS.map(t => (
                  <div key={t.tier} className={`border ${t.badge} rounded-xl p-5`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <p className="text-white font-black text-sm">{t.tier}</p>
                      <span className={`text-xs font-black px-3 py-1 rounded-full border ${t.badge} ${t.badgeText} whitespace-nowrap`}>{t.range}</span>
                    </div>
                    <p className="text-blue-100/60 text-xs mb-3">{t.use}</p>
                    <div className="flex flex-wrap gap-2">
                      {t.perks.map(p => (
                        <span key={p} className="text-xs bg-white/10 text-blue-200 px-2 py-1 rounded-lg">{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={scrollToForm} className="inline-block bg-[#F59E0B] text-[#0D1B2A] font-black px-6 py-3 rounded-xl text-sm hover:bg-yellow-400 transition-colors">
                Investor Inquiry →
              </button>
            </div>
          </div>

          {/* SKILL EXPERTS / MECHANICS */}
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-[#2563EB] px-8 py-5 flex items-center gap-3">
              <span className="text-2xl">🔧</span>
              <div>
                <p className="text-white font-black text-lg">Skill Experts (Mechanics)</p>
                <p className="text-blue-100 text-xs">Contractor network · Roadside specialists · Limuru area &amp; beyond</p>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                At Waiyaki House, a <strong>mechanic</strong> is a <span className="text-[#2563EB] font-bold">skill expert</span> — someone whose expertise, knowledge, experience, and daily services address the real consumption needs of individuals on the road. We are recruiting skilled specialists in the Limuru area as founding contractors.
              </p>
              <p className="text-[#2563EB] font-bold text-sm mb-3">What We're Looking For</p>
              <div className="space-y-2 mb-6">
                {MECHANIC_REQUIREMENTS.map(r => (
                  <div key={r} className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-black text-xs mt-1">→</span>
                    <p className="text-gray-600 text-sm">{r}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#2563EB] font-bold text-sm mb-3">What You Get</p>
              <div className="space-y-2 mb-8">
                {MECHANIC_PERKS.map(r => (
                  <div key={r} className="flex items-start gap-2">
                    <span className="text-[#F59E0B] font-black text-xs mt-1">✓</span>
                    <p className="text-gray-600 text-sm">{r}</p>
                  </div>
                ))}
              </div>
              <button onClick={scrollToForm} className="mt-auto inline-block bg-[#2563EB] text-white font-black px-6 py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors text-center">
                Apply as a Skill Expert →
              </button>
            </div>
          </div>

          {/* CORPORATES, NGOS & FLEETS */}
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-[#1E3A5F] px-8 py-5 flex items-center gap-3">
              <span className="text-2xl">🏢</span>
              <div>
                <p className="text-white font-black text-lg">Corporates, NGOs &amp; Fleets</p>
                <p className="text-blue-200 text-xs">Service contracts · Fleet cover · Priority dispatch</p>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Does your organisation have vehicles on Kenyan roads? Waiyaki House offers priority roadside assistance contracts covering tyres, battery, fuel, and recovery — for businesses, NGOs, embassies, and fleet operators. Your team is never stranded, and every contract fee re-enters the circular economy.
              </p>
              <p className="text-[#1E3A5F] font-bold text-sm mb-3">What We're Looking For</p>
              <div className="space-y-2 mb-6">
                {CORPORATE_REQUIREMENTS.map(r => (
                  <div key={r} className="flex items-start gap-2">
                    <span className="text-[#1E3A5F] font-black text-xs mt-1">→</span>
                    <p className="text-gray-600 text-sm">{r}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#1E3A5F] font-bold text-sm mb-3">What You Get</p>
              <div className="space-y-2 mb-8">
                {CORPORATE_PERKS.map(r => (
                  <div key={r} className="flex items-start gap-2">
                    <span className="text-[#F59E0B] font-black text-xs mt-1">✓</span>
                    <p className="text-gray-600 text-sm">{r}</p>
                  </div>
                ))}
              </div>
              <button onClick={scrollToForm} className="mt-auto inline-block bg-[#1E3A5F] text-white font-black px-6 py-3 rounded-xl text-sm hover:bg-[#0D1B2A] transition-colors text-center">
                Corporate / Fleet Inquiry →
              </button>
            </div>
          </div>

          {/* NGO / GRANT PARTNERS */}
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden col-span-2 md:col-span-1 flex flex-col">
            <div className="bg-[#3F7E44] px-8 py-5 flex items-center gap-3">
              <span className="text-2xl">🌍</span>
              <div>
                <p className="text-white font-black text-lg">NGOs &amp; Grant Partners</p>
                <p className="text-green-100 text-xs">Impact partners · Development finance · Conservation orgs</p>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Waiyaki's model aligns with youth employment, urban mobility, and environmental conservation agendas. We are actively seeking partnerships with development organisations, impact funds, and conservation NGOs — especially those working on youth livelihoods, wetland restoration, and informal sector formalisation in East Africa.
              </p>
              <p className="text-[#3F7E44] font-bold text-sm mb-3">Partnership Areas</p>
              <div className="space-y-2 mb-8">
                {NGO_AREAS.map(r => (
                  <div key={r} className="flex items-start gap-2">
                    <span className="text-[#3F7E44] font-black text-xs mt-1">→</span>
                    <p className="text-gray-600 text-sm">{r}</p>
                  </div>
                ))}
              </div>
              <button onClick={scrollToForm} className="mt-auto inline-block bg-[#3F7E44] text-white font-black px-6 py-3 rounded-xl text-sm hover:bg-green-700 transition-colors text-center">
                NGO / Grant Partner Inquiry →
              </button>
            </div>
          </div>

          {/* DRIVERS / CUSTOMERS */}
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden col-span-2 md:col-span-1 flex flex-col">
            <div className="bg-[#F59E0B] px-8 py-5 flex items-center gap-3">
              <span className="text-2xl">🚗</span>
              <div>
                <p className="text-[#0D1B2A] font-black text-lg">Drivers &amp; Customers</p>
                <p className="text-yellow-900 text-xs">Limuru area · Waiyaki Way corridor · Early access</p>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                If you drive in the Limuru area or along the Waiyaki Way corridor, you are exactly who this is for. We provide fast, reliable roadside assistance — fixed rates, verified skill experts, and M-PESA payment. Register now and get priority access to our growing network of services.
              </p>
              <p className="text-[#0D1B2A] font-bold text-sm mb-3">What You Get as a Member</p>
              <div className="space-y-2 mb-8">
                {DRIVER_PERKS.map(r => (
                  <div key={r} className="flex items-start gap-2">
                    <span className="text-[#F59E0B] font-black text-xs mt-1">✓</span>
                    <p className="text-gray-600 text-sm">{r}</p>
                  </div>
                ))}
              </div>
              <button onClick={scrollToForm} className="mt-auto inline-block bg-[#F59E0B] text-[#0D1B2A] font-black px-6 py-3 rounded-xl text-sm hover:bg-yellow-400 transition-colors text-center">
                Register as a Driver →
              </button>
            </div>
          </div>

        </div>

        <ContactForm />
      </div>
    </section>
  );
}