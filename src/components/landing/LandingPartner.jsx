import { useState } from "react";
import { base44 } from "@/api/base44Client";

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
  "Priority access to all roadside services when we launch in 2026",
  "Fixed, transparent pricing — no roadside negotiation, ever",
  "Tyre repairs, jump starts, fuel delivery, towing & more",
  "Verified skill expert dispatched to your location in <20 minutes",
  "Pay securely via M-PESA — no cash handling",
];

export default function LandingPartner() {
  const [form, setForm] = useState({ name: "", email: "", org: "", type: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const emailPayload = {
      subject: `Partnership Inquiry — ${form.type || "General"} — ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${form.org}\nType: ${form.type}\n\nMessage:\n${form.message}`,
    };
    await Promise.all([
      base44.integrations.Core.SendEmail({ to: "sustainthevoices@gmail.com", ...emailPayload }),
      base44.integrations.Core.SendEmail({ to: "info@sustainthevoices.org", ...emailPayload }),
    ]);
    setSent(true);
    setSending(false);
    setForm({ name: "", email: "", org: "", type: "", message: "" });
  };

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
        <div className="mb-12">

        </div>
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
                Investing in Waiyaki House means investing in a circular economy that compounds. Capital deployed here generates returns across mobility, livelihoods, environment, and community knowledge — simultaneously. We are raising a seed round to prove the loop in Limuru and establish the operational data to justify Series A corridor expansion.
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
              <a href="#contact-form" className="inline-block bg-[#F59E0B] text-[#0D1B2A] font-black px-6 py-3 rounded-xl text-sm hover:bg-yellow-400 transition-colors">
                Investor Inquiry →
              </a>
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
              <a href="#contact-form" className="mt-auto inline-block bg-[#2563EB] text-white font-black px-6 py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors text-center">
                Apply as a Skill Expert →
              </a>
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
              <a href="#contact-form" className="mt-auto inline-block bg-[#1E3A5F] text-white font-black px-6 py-3 rounded-xl text-sm hover:bg-[#0D1B2A] transition-colors text-center">
                Corporate / Fleet Inquiry →
              </a>
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
              <a href="#contact-form" className="mt-auto inline-block bg-[#3F7E44] text-white font-black px-6 py-3 rounded-xl text-sm hover:bg-green-700 transition-colors text-center">
                NGO / Grant Partner Inquiry →
              </a>
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
                If you drive in the Limuru area or along the Waiyaki Way corridor, you are exactly who this is for. We are onboarding early driver members ahead of our 2026 pilot launch — for the full range of roadside assistance services. Register your interest now.
              </p>
              <p className="text-[#0D1B2A] font-bold text-sm mb-3">What You Get as an Early Member</p>
              <div className="space-y-2 mb-8">
                {DRIVER_PERKS.map(r => (
                  <div key={r} className="flex items-start gap-2">
                    <span className="text-[#F59E0B] font-black text-xs mt-1">✓</span>
                    <p className="text-gray-600 text-sm">{r}</p>
                  </div>
                ))}
              </div>
              <a href="#contact-form" className="mt-auto inline-block bg-[#F59E0B] text-[#0D1B2A] font-black px-6 py-3 rounded-xl text-sm hover:bg-yellow-400 transition-colors text-center">
                Register as an Early Driver →
              </a>
            </div>
          </div>

        </div>

        {/* CONTACT FORM */}
        <div id="contact-form" className="bg-[#0D1B2A] rounded-3xl p-8 md:p-12 max-w-2xl mx-auto border border-white/10">
          <h3 className="text-white font-black text-2xl mb-1">Get In Touch</h3>
          <p className="text-blue-200/60 mb-8 text-sm">Send us a message and we'll respond within 24 hours.</p>
          {sent ? (
            <div className="text-center py-10">
              <p className="text-5xl mb-4">✅</p>
              <p className="text-white font-black text-xl">Message Sent!</p>
              <p className="text-blue-200/60 mt-2 text-sm">We'll be in touch very soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Your Name *" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="col-span-2 sm:col-span-1 w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-blue-200/40 focus:outline-none focus:border-[#2563EB] text-sm" />
                <input required type="email" placeholder="Your Email *" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="col-span-2 sm:col-span-1 w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-blue-200/40 focus:outline-none focus:border-[#2563EB] text-sm" />
              </div>
              <input placeholder="Organisation / Company (optional)" value={form.org}
                onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-blue-200/40 focus:outline-none focus:border-[#2563EB] text-sm" />
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full bg-[#0D1B2A] text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2563EB] text-sm">
                <option value="" className="bg-[#0D1B2A]">I am reaching out as... (select one)</option>
                <option value="Angel Investor (Tier 1: $5k–$25k)" className="bg-[#0D1B2A]">Angel Investor (Tier 1: $5k–$25k)</option>
                <option value="Seed / Syndicate Investor (Tier 2: $25k–$150k)" className="bg-[#0D1B2A]">Seed / Syndicate Investor (Tier 2: $25k–$150k)</option>
                <option value="Institutional / VC / DFI (Tier 3: $150k+)" className="bg-[#0D1B2A]">Institutional / VC / DFI (Tier 3: $150k+)</option>
                <option value="Skill Expert / Mechanic" className="bg-[#0D1B2A]">A Skill Expert (Mechanic)</option>
                <option value="Corporate / Fleet" className="bg-[#0D1B2A]">A Corporate / Fleet Operator</option>
                <option value="NGO / Grant Partner" className="bg-[#0D1B2A]">An NGO / Grant Partner</option>
                <option value="Driver / Early Customer" className="bg-[#0D1B2A]">A Driver (Early Access)</option>
                <option value="Legal Consultancy" className="bg-[#0D1B2A]">Legal Consultancy Enquiry</option>
                <option value="Environmental Consultancy" className="bg-[#0D1B2A]">Environmental Stewardship Enquiry</option>
                <option value="Dialogue & Facilitation" className="bg-[#0D1B2A]">Dialogue & Facilitation Enquiry</option>
                <option value="Other" className="bg-[#0D1B2A]">Something Else</option>
              </select>
              <textarea required rows={4} placeholder="Tell us how you'd like to collaborate or partner..."
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-blue-200/40 focus:outline-none focus:border-[#2563EB] text-sm resize-none" />
              <button type="submit" disabled={sending}
                className="w-full bg-[#F59E0B] hover:bg-yellow-400 text-[#0D1B2A] font-black py-4 rounded-xl transition-colors text-base disabled:opacity-60">
                {sending ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}