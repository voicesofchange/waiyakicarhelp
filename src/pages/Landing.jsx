import { useState } from "react";
import { base44 } from "@/api/base44Client";

const NAV_LINKS = ["About", "Mission", "Vision", "How It Works", "SDGs", "Consultancy", "Partner With Us"];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A]/95 backdrop-blur border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/23900b373_WaiyakiHouse.png" alt="Waiyaki House LLC" className="h-10 w-10 object-contain rounded-lg" />
            <div>
              <p className="font-black text-white text-sm leading-tight">WAIYAKI HOUSE</p>
              <p className="text-xs text-blue-300 leading-tight">Waiyaki House LLC · Kenya</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-blue-100 hover:text-[#F59E0B] font-medium transition-colors">
                {link}
              </a>
            ))}
            <a href="#partner-with-us"
              className="bg-[#F59E0B] text-[#0D1B2A] font-bold text-sm px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors">
              Partner With Us
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0D1B2A] border-t border-white/10 px-6 py-4 space-y-3">
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-blue-100 font-medium py-1">
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 bg-[#0D1B2A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/15 via-transparent to-[#1E3A5F]/30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="inline-block bg-[#2563EB]/20 text-blue-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-[#2563EB]/30">
            Waiyaki House LLC — Limuru Area, Kenya · Pilot 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Roadside Tyre Help,{" "}
            <span className="text-[#F59E0B]">Coordinated</span>{" "}
            for Kenya.
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
            Kenya has nearly 5 million registered vehicles. Tyre failures are among the most common and most preventable breakdowns. We built the coordination layer that fixes that.
          </p>
          <p className="text-blue-200/70 text-base max-w-xl mx-auto mb-10">
            A driver requests help. A verified local mechanic is dispatched. The job is done. Payment is settled via M-PESA. That is the complete flow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#partner-with-us"
              className="bg-[#F59E0B] text-[#0D1B2A] font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors text-base shadow-lg shadow-yellow-500/20">
              Partner With Us →
            </a>
            <a href="#about"
              className="border border-[#2563EB]/60 text-white font-bold px-8 py-4 rounded-xl hover:bg-[#2563EB]/20 transition-colors text-base">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-[#2563EB] py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "~5M", label: "Registered Vehicles in Kenya" },
            { value: "< 20min", label: "Target Response Time" },
            { value: "80%", label: "Mechanic Revenue Share" },
            { value: "M-PESA", label: "Seamless Digital Payment" },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="text-sm text-blue-100 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE PROBLEM */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#2563EB] font-bold text-sm uppercase tracking-widest">The Problem</span>
              <h2 className="text-4xl font-black mt-3 mb-6 leading-tight text-[#0D1B2A]">The roads are full. The system is broken.</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                In the Limuru area and along the Waiyaki Way corridor, a driver with a flat tyre today faces a disorganised, cash-based, accountability-free informal market.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                They call mechanics they may or may not know. Negotiate prices under stress. Wait an unpredictable length of time. And have no recourse if the service is poor.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The mechanics face the same disorder from their side: unpredictable job flow, cash-only payments, no income record, no professional reputation, and no path to formal economic participation.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-[#0D1B2A] rounded-2xl p-6 text-white">
                <p className="text-[#F59E0B] font-black text-lg mb-2">No platform exists</p>
                <p className="text-blue-100 text-sm leading-relaxed">No app, no hotline, no structured service coordinates tyre assistance digitally in the Limuru area. Waiyaki fills that gap directly.</p>
              </div>
              <div className="bg-[#EFF6FF] rounded-2xl p-6 border border-blue-100">
                <p className="text-[#0D1B2A] font-black text-lg mb-2">Average vehicle age: 14–20 years</p>
                <p className="text-gray-500 text-sm leading-relaxed">Kenya's ageing fleet generates growing and consistent demand for tyre services — the most common and most preventable vehicle emergency on Kenyan roads.</p>
              </div>
              <div className="bg-[#FEF9C3] border border-yellow-200 rounded-2xl p-6">
                <p className="text-[#0D1B2A] font-black text-lg mb-2">Waiyaki's answer</p>
                <p className="text-yellow-900 text-sm leading-relaxed">App dispatch. Fixed rates. M-PESA payment. Mechanic accountability. A coordination layer that makes the whole system work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="py-24 px-6 bg-[#F0F4FF]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#2563EB] font-bold text-sm uppercase tracking-widest">Our Mission</span>
          <h2 className="text-4xl font-black mt-3 mb-4 text-[#0D1B2A]">What We Are Here to Do</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            To provide fast, reliable, and dignified roadside tyre assistance to Kenyan motorists — while creating sustainable, well-compensated, formal livelihoods for local mechanics.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🚗", title: "Serve Drivers", desc: "Fixed rates, no negotiation at the roadside. A verified mechanic dispatched to your location. Pay via M-PESA. Simple, safe, predictable." },
              { icon: "🔧", title: "Empower Mechanics", desc: "80% of every job fee goes directly to the mechanic. Steady job flow, digital income records, and a professional reputation system — a path out of informality." },
              { icon: "📱", title: "Build the Infrastructure", desc: "App dispatch, GPS coordination, M-PESA payments, mechanic accountability — the same infrastructure that will scale across corridors and service types." },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 text-left">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-black text-xl mb-3 text-[#0D1B2A]">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE LAYERS */}
      <section className="py-24 px-6 bg-[#0D1B2A] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-300 font-bold text-sm uppercase tracking-widest">Framework</span>
            <h2 className="text-4xl font-black mt-3 mb-4">A Three-Layer Corridor Infrastructure</h2>
            <p className="text-blue-100/70 max-w-2xl mx-auto text-lg leading-relaxed">
              Even at pilot scale, Waiyaki operates across three reinforcing layers. The infrastructure being built now is the same infrastructure that will eventually coordinate multiple mechanics across multiple corridors.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Mobility Infrastructure", subtitle: "The core business", desc: "Fast, reliable tyre assistance for drivers in the Limuru area. Fixed rates, M-PESA payment, GPS dispatch. This layer must work before anything else is possible.", color: "border-[#F59E0B]" },
              { num: "02", title: "Economic Infrastructure", subtitle: "Dignified work for mechanics", desc: "Contracted mechanics earn 80% of every job. Digital income records, professional reputation, and a formal economic identity. Waiyaki turns informal labour into structured work.", color: "border-[#2563EB]" },
              { num: "03", title: "Data Infrastructure", subtitle: "The long-term asset", desc: "Every job generates operational data: response times, job locations, payment records, ratings. This data makes Waiyaki increasingly valuable as it scales — to insurers, fleet operators, and partners.", color: "border-blue-300" },
            ].map(layer => (
              <div key={layer.num} className={`bg-white/5 border-t-4 ${layer.color} rounded-2xl p-8 border border-white/10`}>
                <p className="text-4xl font-black text-white/20 mb-3">{layer.num}</p>
                <p className="text-[#F59E0B] text-xs font-bold uppercase tracking-wide mb-1">{layer.subtitle}</p>
                <h3 className="font-black text-xl text-white mb-4">{layer.title}</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[#2563EB] font-bold text-sm uppercase tracking-widest">Our Vision</span>
              <h2 className="text-4xl font-black mt-3 mb-6 text-[#0D1B2A]">Start Small. Build the Right System. Scale It.</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The pilot proves the model with one mechanic in one area. The infrastructure built in the pilot — dispatch, payment, accountability — is exactly the infrastructure needed to scale across Kenya's road corridors.
              </p>
              <div className="space-y-4">
                {[
                  "Prove dispatch model in Limuru — validate demand and operations",
                  "Expand to Nairobi, Nakuru, and Thika corridors",
                  "Build a certified network of 100+ contracted mechanics",
                  "Introduce fleet and corporate tyre service contracts",
                  "Partner with insurance companies for roadside tyre cover",
                  "Launch mechanic training and certification programmes",
                ].map(goal => (
                  <div key={goal} className="flex items-start gap-3">
                    <span className="text-[#2563EB] font-black mt-0.5">→</span>
                    <p className="text-gray-600 text-sm">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-[#F59E0B] bg-[#FEF9C3] rounded-r-2xl p-6">
                <p className="text-[#0D1B2A] font-black text-lg mb-2">Phase 1 — Pilot (Now)</p>
                <p className="text-yellow-900 text-sm leading-relaxed">One mechanic. Limuru area. Tyre services only. Prove that drivers request help via app, the mechanic responds reliably, and M-PESA payment works end to end. Build the operational data.</p>
              </div>
              <div className="border-l-4 border-[#2563EB] bg-[#EFF6FF] rounded-r-2xl p-6">
                <p className="text-[#0D1B2A] font-black text-lg mb-2">Phase 2 — Corridor Expansion</p>
                <p className="text-gray-600 text-sm leading-relaxed">Expand to Nairobi, Nakuru, Thika. Onboard additional contracted mechanics. Launch fleet and corporate accounts. Introduce mechanic certification.</p>
              </div>
              <div className="border-l-4 border-gray-200 bg-gray-50 rounded-r-2xl p-6">
                <p className="text-gray-700 font-black text-lg mb-2">Phase 3 — Platform Scale</p>
                <p className="text-gray-500 text-sm leading-relaxed">Insurance partnerships. Multiple service types. Pan-African roadside coordination. A full mechanic training academy. The infrastructure built in Phase 1 carries all of it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 bg-[#F0F4FF]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#2563EB] font-bold text-sm uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-black mt-3 mb-4 text-[#0D1B2A]">The Complete Flow</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Simple by design. The MVP is deliberately focused — proving the model before expanding it.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { step: "01", title: "Driver Requests", desc: "Driver opens the app, selects a tyre service, shares their location and vehicle details." },
              { step: "02", title: "Mechanic Notified", desc: "The contracted mechanic receives an instant notification and accepts the job." },
              { step: "03", title: "Mechanic Arrives", desc: "Mechanic is en route within 20 minutes, GPS-tracked, with job status updated in real time." },
              { step: "04", title: "Done & Paid", desc: "Service completed. Driver pays via M-PESA. Mechanic receives 80% within 24 hours." },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
                <p className="text-4xl font-black text-[#2563EB]/20 mb-3">{item.step}</p>
                <h3 className="font-black text-base mb-2 text-[#0D1B2A]">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Services & Rates */}
          <div className="bg-[#0D1B2A] rounded-3xl p-8 text-white">
            <h3 className="font-black text-xl mb-2 text-[#F59E0B]">Pilot Services & Fixed Rates</h3>
            <p className="text-blue-100/70 text-sm mb-6">All rates are fixed. No negotiation at the roadside. All vehicle types covered.</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { service: "Puncture Repair (Tubeless)", price: "KES 500" },
                { service: "Puncture Repair (Tube Tyre)", price: "KES 400" },
                { service: "Tyre Change (Spare Swap)", price: "KES 500" },
                { service: "Tyre Change + Balancing", price: "KES 800" },
                { service: "Tyre Inflation (4 tyres)", price: "KES 200" },
                { service: "Tyre Removal & Refit", price: "KES 600" },
              ].map(r => (
                <div key={r.service} className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <span className="text-blue-100 text-sm">{r.service}</span>
                  <span className="text-[#F59E0B] font-black text-sm">{r.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-blue-200/50 mt-4">Mechanic receives 80% of every fee. Waiyaki retains 20% as a platform coordination fee.</p>
          </div>
        </div>
      </section>

      {/* THEORY OF CHANGE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#2563EB] font-bold text-sm uppercase tracking-widest">Theory of Change</span>
          <h2 className="text-4xl font-black mt-3 mb-4 text-[#0D1B2A]">Why This Works</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            Waiyaki introduces a coordination layer between drivers and mechanics. The result is better outcomes for both sides — and operational data that makes the platform increasingly valuable over time.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-[#EFF6FF] rounded-2xl p-8 border border-blue-100">
              <h3 className="font-black text-xl mb-4 text-[#0D1B2A]">For Drivers</h3>
              <div className="space-y-3">
                {[
                  "Fixed, transparent pricing — no stress negotiation",
                  "Verified, accountable mechanic — not a stranger from the roadside",
                  "Pay-per-use via M-PESA — no membership required",
                  "Real-time job tracking and status updates",
                  "Rating system creates accountability and quality assurance",
                ].map(point => (
                  <div key={point} className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-black text-xs mt-1">✓</span>
                    <p className="text-gray-600 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#FEF9C3] rounded-2xl p-8 border border-yellow-200">
              <h3 className="font-black text-xl mb-4 text-[#0D1B2A]">For Mechanics</h3>
              <div className="space-y-3">
                {[
                  "Steady, predictable job flow — no more waiting roadside",
                  "80% revenue share — fair and transparent",
                  "Digital income records — a formal economic identity",
                  "Professional reputation through ratings",
                  "A path from informal labour to structured, dignified work",
                ].map(point => (
                  <div key={point} className="flex items-start gap-2">
                    <span className="text-[#F59E0B] font-black text-xs mt-1">✓</span>
                    <p className="text-gray-700 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDGs */}
      <section id="sdgs" className="py-24 px-6 bg-[#0D1B2A] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="inline-block bg-[#2563EB]/20 text-blue-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#2563EB]/30 mb-6">
              UN Sustainable Development Goals
            </span>
            <h2 className="text-4xl font-black mb-4">Built for People, Planet &amp; Prosperity.</h2>
            <p className="text-blue-100/70 max-w-2xl mx-auto text-lg leading-relaxed mb-16">
              Waiyaki Roadside is not just a business — it is a deliberate response to Kenya's development challenges. Every job dispatched advances multiple UN SDGs simultaneously.
            </p>
          </div>

          {/* Primary SDGs */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                num: "SDG 8",
                color: "bg-[#A21942]",
                icon: "💼",
                title: "Decent Work & Economic Growth",
                highlight: "Youth Economic Empowerment",
                desc: "Waiyaki prioritises recruiting young mechanics from underserved communities, giving them formal contracts, digital income records, and a professional identity. 80% revenue share ensures fair, living-wage compensation — turning informal roadside work into dignified, structured employment.",
              },
              {
                num: "SDG 11",
                color: "bg-[#F99D26]",
                icon: "🏙️",
                title: "Sustainable Cities & Communities",
                highlight: "Safer Urban Roads",
                desc: "Stranded vehicles on Nairobi's corridors create congestion, accidents, and emissions. By dispatching mechanics within 20 minutes, Waiyaki reduces breakdown dwell time, keeps traffic flowing, and makes Kenya's roads safer and more resilient for everyone.",
              },
              {
                num: "SDG 10",
                color: "bg-[#DD1367]",
                icon: "⚖️",
                title: "Reduced Inequalities",
                highlight: "Formalising the Informal Sector",
                desc: "Kenya's roadside mechanics operate in a cash-only, accountability-free informal economy with no path to progression. Waiyaki brings them into the formal digital economy — with traceable income, professional ratings, and access to financial services they were previously excluded from.",
              },
            ].map(sdg => (
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

          {/* Secondary SDGs */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { num: "SDG 1", color: "border-[#E5243B]", icon: "🏠", title: "No Poverty", desc: "Stable, predictable income for mechanics and their families lifts households out of poverty through dignified work." },
              { num: "SDG 9", color: "border-[#FD6925]", icon: "🏗️", title: "Industry & Innovation", desc: "Digital dispatch, GPS tracking, and M-PESA integration bring modern infrastructure to an informal market." },
              { num: "SDG 17", color: "border-[#19486A]", icon: "🤝", title: "Partnerships for Goals", desc: "Waiyaki actively seeks corporate, NGO, and investor partners to co-build the infrastructure that scales this model." },
              { num: "SDG 13", color: "border-[#3F7E44]", icon: "🌍", title: "Climate Action", desc: "Faster tyre repair means less idling, fewer tow-truck trips, and reduced emissions per breakdown — a small but measurable environmental benefit." },
            ].map(sdg => (
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

          {/* Environmental Stewardship */}
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
                  The Manguo Wetlands in Limuru, Kenya — a critical freshwater ecosystem and biodiversity corridor — face mounting pressure from encroachment, pollution, and urban growth. As a company rooted in the Limuru community, Waiyaki House LLC is committed to the long-term restoration and protection of Manguo.
                </p>
                <p className="text-blue-100/70 text-sm leading-relaxed">
                  A portion of Waiyaki's platform revenue will be ring-fenced for wetland restoration activities — working alongside local conservancies, schools, and community leaders to rehabilitate the wetland ecosystem and protect it for future generations.
                </p>
              </div>
              <div>
                <p className="text-[#F59E0B] font-bold text-sm mb-3">Community Clean-Ups</p>
                <h3 className="text-white font-black text-xl mb-4">Clean Corridors. Proud Communities.</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
                  Waiyaki mechanics operate across the Limuru road corridor every day. We will organise and fund regular community clean-up events along these corridors — tackling roadside waste, illegal dumping, and plastic pollution that disproportionately impacts the poorest roadside communities.
                </p>
                <div className="space-y-3">
                  {[
                    "Quarterly wetland restoration days at Manguo",
                    "Monthly roadside clean-up events in Limuru",
                    "Youth volunteer programme with certificates",
                    "Partnerships with local schools and conservation groups",
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="text-[#3F7E44] font-black text-xs mt-1">✓</span>
                      <p className="text-blue-100/70 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Youth focus callout */}
          <div className="bg-gradient-to-r from-[#2563EB]/30 to-[#1E3A5F]/50 border border-[#2563EB]/40 rounded-2xl p-8 text-center">
            <p className="text-[#F59E0B] font-black text-sm uppercase tracking-widest mb-3">Our Youth Commitment</p>
            <h3 className="text-white font-black text-2xl mb-4">Economic Empowerment, Starting Young.</h3>
            <p className="text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
              Kenya has one of Africa's largest youth populations, with over 75% of Kenyans under 35. Many skilled young mechanics are locked out of the formal economy. Waiyaki's goal is to make youth mechanics the backbone of our contractor network — providing apprenticeships, certification pathways, and digital financial inclusion as we scale.
            </p>
          </div>
        </div>
      </section>

      {/* CONSULTANCY */}
      <section id="consultancy" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-[#2563EB]/20 mb-6">
              Waiyaki House Consultancy
            </span>
            <h2 className="text-4xl font-black mt-3 mb-4 text-[#0D1B2A]">Advisory & Consultancy Services</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Beyond roadside services, Waiyaki House offers independent consultancy across law, environmental stewardship, and facilitation — open to individuals, communities, organisations, and government bodies across Kenya.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {[
              {
                icon: "⚖️",
                color: "bg-[#0D1B2A]",
                iconBg: "bg-[#2563EB]/20",
                accentText: "text-[#2563EB]",
                title: "Legal Consultancy",
                subtitle: "Rights, contracts & community law",
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
                icon: "🌿",
                color: "bg-[#3F7E44]",
                iconBg: "bg-green-100",
                accentText: "text-[#3F7E44]",
                title: "Environmental Stewardship",
                subtitle: "Conservation, land & ecological planning",
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
                icon: "🤝",
                color: "bg-[#F59E0B]",
                iconBg: "bg-amber-100",
                accentText: "text-amber-700",
                title: "Dialogue & Facilitation",
                subtitle: "Conversations that matter, done right",
                desc: "Some of humanity's most important decisions require neutral, skilled facilitation. We convene and facilitate multi-stakeholder dialogues, community consultations, and difficult conversations — from land negotiations to policy roundtables — for the better of all parties.",
                areas: [
                  "Community & inter-tribal dialogue facilitation",
                  "Multi-stakeholder policy roundtables",
                  "Land & resource conflict mediation",
                  "NGO & government consultation processes",
                  "Youth civic engagement sessions",
                ],
              },
            ].map(service => (
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

          {/* Consultancy ethos banner */}
          <div className="bg-[#0D1B2A] rounded-2xl p-8 text-center">
            <p className="text-[#F59E0B] font-black text-sm uppercase tracking-widest mb-3">Our Approach</p>
            <h3 className="text-white font-black text-2xl mb-4">Independent. Principled. For the People.</h3>
            <p className="text-blue-100/70 max-w-2xl mx-auto leading-relaxed text-sm">
              Waiyaki House consultancy is rooted in the belief that access to good counsel, environmental accountability, and honest dialogue should not be the preserve of the wealthy or the powerful. We work across Kenya — with communities, cooperatives, grassroots organisations, and institutions — on a mandate of equity, transparency, and long-term human flourishing.
            </p>
            <a href="#contact-form" className="inline-block mt-6 bg-[#F59E0B] text-[#0D1B2A] font-black px-8 py-3 rounded-xl hover:bg-yellow-400 transition-colors text-sm">
              Request a Consultation →
            </a>
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section id="partner-with-us" className="py-24 px-6 bg-[#F0F4FF]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#2563EB] font-bold text-sm uppercase tracking-widest">Collaborate</span>
            <h2 className="text-4xl font-black mt-3 mb-4 text-[#0D1B2A]">Partner With Waiyaki</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              We are building Kenya's roadside coordination infrastructure. Here is exactly who we are looking for — and what we are asking from each.
            </p>
          </div>

          {/* WHO WE'RE LOOKING FOR */}
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
                  We are raising a seed round to prove the pilot model in Limuru, build out the full dispatch infrastructure, and establish the operational data needed to justify a Series A expansion across Kenya's road corridors. We are a strong fit for impact-focused investors and development finance institutions alongside traditional early-stage VC.
                </p>
                {/* Investment tiers */}
                <p className="text-[#F59E0B] font-bold text-sm uppercase tracking-wide mb-4">Investment Tiers — What We're Asking For</p>
                <div className="space-y-3 mb-8">
                  {[
                    {
                      tier: "Tier 1 — Angel / Friends & Family",
                      range: "USD $5,000 – $25,000",
                      badge: "bg-blue-900/60 border-blue-500/40",
                      badgeText: "text-blue-300",
                      use: "Covers pilot operating costs, mechanic onboarding, and app infrastructure for 6 months.",
                      perks: ["Equity stake at seed valuation", "Named as Founding Angel", "Monthly operational updates", "First right of refusal at Series A"],
                    },
                    {
                      tier: "Tier 2 — Seed / Angel Syndicate",
                      range: "USD $25,000 – $150,000",
                      badge: "bg-amber-900/60 border-amber-500/40",
                      badgeText: "text-amber-300",
                      use: "Funds corridor expansion to 3–5 new areas, mechanic certification programme, and fleet sales team.",
                      perks: ["Equity stake with pro-rata rights", "Observer seat on advisory board", "Quarterly investor calls", "Co-branding on impact reports"],
                    },
                    {
                      tier: "Tier 3 — Institutional / Impact VC / DFI",
                      range: "USD $150,000+",
                      badge: "bg-green-900/60 border-green-500/40",
                      badgeText: "text-green-300",
                      use: "Capitalises full Kenya expansion, insurance partnerships, mechanic training academy, and pan-African pilot.",
                      perks: ["Lead investor rights", "Board seat", "SDG & impact reporting co-authorship", "Partnership in grant applications", "Strategic co-investor introductions"],
                    },
                  ].map(t => (
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

            {/* MECHANICS */}
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden flex flex-col">
              <div className="bg-[#2563EB] px-8 py-5 flex items-center gap-3">
                <span className="text-2xl">🔧</span>
                <div>
                  <p className="text-white font-black text-lg">Mechanics</p>
                  <p className="text-blue-100 text-xs">Contractor network · Tyre specialists · Limuru area &amp; beyond</p>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  We are recruiting skilled tyre mechanics in the Limuru area to join our contracted network as the platform's founding mechanics. This is not a gig — it's a structured contractor role with consistent job flow, fair pay, and a professional identity.
                </p>
                <p className="text-[#2563EB] font-bold text-sm mb-3">What We're Looking For</p>
                <div className="space-y-2 mb-6">
                  {[
                    "Proven tyre repair and fitting skills (tubeless, tube, balancing)",
                    "Owns or has access to basic tools",
                    "Based in Limuru, Kikuyu, or along the Waiyaki Way corridor",
                    "Reliable, professional, and mobile (motorbike / vehicle preferred)",
                    "Comfortable with a mobile app and M-PESA",
                  ].map(r => (
                    <div key={r} className="flex items-start gap-2">
                      <span className="text-[#2563EB] font-black text-xs mt-1">→</span>
                      <p className="text-gray-600 text-sm">{r}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[#2563EB] font-bold text-sm mb-3">What You Get</p>
                <div className="space-y-2 mb-8">
                  {[
                    "80% of every job fee paid within 24 hours via M-PESA",
                    "Steady, app-dispatched job flow — no roadside waiting",
                    "Digital income records to support banking and credit access",
                    "Professional ratings and certification pathway",
                    "Priority access to Waiyaki's mechanic training programme",
                  ].map(r => (
                    <div key={r} className="flex items-start gap-2">
                      <span className="text-[#F59E0B] font-black text-xs mt-1">✓</span>
                      <p className="text-gray-600 text-sm">{r}</p>
                    </div>
                  ))}
                </div>
                <a href="#contact-form" className="mt-auto inline-block bg-[#2563EB] text-white font-black px-6 py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors text-center">
                  Apply as a Mechanic →
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
                  Does your organisation have vehicles on Kenyan roads? Waiyaki offers priority roadside tyre assistance contracts for businesses, NGOs, embassies, and fleet operators — ensuring your team is never stranded.
                </p>
                <p className="text-[#1E3A5F] font-bold text-sm mb-3">What We're Looking For</p>
                <div className="space-y-2 mb-6">
                  {[
                    "Businesses or NGOs with 2+ vehicles based in or operating around Limuru / Nairobi",
                    "Fleet operators seeking structured monthly tyre service cover",
                    "Organisations wanting to offer roadside assistance as a staff benefit",
                    "Embassies, development agencies, and humanitarian organisations",
                  ].map(r => (
                    <div key={r} className="flex items-start gap-2">
                      <span className="text-[#1E3A5F] font-black text-xs mt-1">→</span>
                      <p className="text-gray-600 text-sm">{r}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[#1E3A5F] font-bold text-sm mb-3">What You Get</p>
                <div className="space-y-2 mb-8">
                  {[
                    "Priority dispatch — your vehicles jump the queue",
                    "Fixed monthly contract rate — no surprise invoices",
                    "Monthly fleet service report with job history",
                    "Dedicated account manager for your organisation",
                    "Scalable cover as your fleet grows",
                  ].map(r => (
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
                  {[
                    "Youth employment and skills development grants",
                    "Manguo Wetlands restoration and conservation co-funding",
                    "Informal sector digitalisation and financial inclusion programmes",
                    "Road safety and urban mobility research partnerships",
                    "Co-authorship on SDG impact reports and development publications",
                  ].map(r => (
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
                  If you drive in the Limuru area or along the Waiyaki Way corridor, you are exactly who this is for. We are onboarding early driver members ahead of our 2026 pilot launch. Register your interest now and be first to access the service when we go live.
                </p>
                <p className="text-[#0D1B2A] font-bold text-sm mb-3">What You Get as an Early Member</p>
                <div className="space-y-2 mb-8">
                  {[
                    "Priority access when the service launches in 2026",
                    "Fixed, transparent pricing — no roadside negotiation",
                    "Verified mechanic dispatched to your location in &lt;20 minutes",
                    "Pay securely via M-PESA — no cash handling",
                    "Rating system ensures quality and accountability",
                  ].map(r => (
                    <div key={r} className="flex items-start gap-2">
                      <span className="text-[#F59E0B] font-black text-xs mt-1">✓</span>
                      <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: r }} />
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
                  <input
                    required
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="col-span-2 sm:col-span-1 w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-blue-200/40 focus:outline-none focus:border-[#2563EB] text-sm"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Your Email *"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="col-span-2 sm:col-span-1 w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-blue-200/40 focus:outline-none focus:border-[#2563EB] text-sm"
                  />
                </div>
                <input
                  placeholder="Organisation / Company (optional)"
                  value={form.org}
                  onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-blue-200/40 focus:outline-none focus:border-[#2563EB] text-sm"
                />
                <select
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full bg-[#0D1B2A] text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2563EB] text-sm"
                >
                  <option value="" className="bg-[#0D1B2A]">I am reaching out as... (select one)</option>
                  <option value="Angel Investor (Tier 1: $5k–$25k)" className="bg-[#0D1B2A]">Angel Investor (Tier 1: $5k–$25k)</option>
                  <option value="Seed / Syndicate Investor (Tier 2: $25k–$150k)" className="bg-[#0D1B2A]">Seed / Syndicate Investor (Tier 2: $25k–$150k)</option>
                  <option value="Institutional / VC / DFI (Tier 3: $150k+)" className="bg-[#0D1B2A]">Institutional / VC / DFI (Tier 3: $150k+)</option>
                  <option value="Mechanic" className="bg-[#0D1B2A]">A Mechanic</option>
                  <option value="Corporate / Fleet" className="bg-[#0D1B2A]">A Corporate / Fleet Operator</option>
                  <option value="NGO / Grant Partner" className="bg-[#0D1B2A]">An NGO / Grant Partner</option>
                  <option value="Driver / Early Customer" className="bg-[#0D1B2A]">A Driver (Early Access)</option>
                  <option value="Legal Consultancy" className="bg-[#0D1B2A]">Legal Consultancy Enquiry</option>
                  <option value="Environmental Consultancy" className="bg-[#0D1B2A]">Environmental Stewardship Enquiry</option>
                  <option value="Dialogue & Facilitation" className="bg-[#0D1B2A]">Dialogue & Facilitation Enquiry</option>
                  <option value="Other" className="bg-[#0D1B2A]">Something Else</option>
                </select>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us how you'd like to collaborate or partner..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-blue-200/40 focus:outline-none focus:border-[#2563EB] text-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#F59E0B] hover:bg-yellow-400 text-[#0D1B2A] font-black py-4 rounded-xl transition-colors text-base disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D1B2A] py-10 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src="https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/23900b373_WaiyakiHouse.png" alt="Waiyaki House LLC" className="h-8 w-8 object-contain rounded-md" />
                <div>
                  <p className="text-white font-black text-sm">Waiyaki House</p>
                  <p className="text-blue-300 text-xs">Waiyaki House LLC · Kenya</p>
                </div>
              </div>
              <p className="text-blue-200/50 text-xs max-w-xs leading-relaxed">
                Coordinating roadside tyre assistance across Kenya's road corridors. Starting in Limuru. Building the infrastructure that scales.
              </p>
            </div>
            <div className="text-sm space-y-2">
              <p className="text-blue-200/80 font-bold mb-3">Contact</p>
              <p className="text-blue-200/50 text-xs">sustainthevoices@gmail.com</p>
              <p className="text-blue-200/50 text-xs">Limuru Area, Nairobi, Kenya</p>
              <p className="text-blue-200/50 text-xs">Tex Wambui · Co-Founder, Waiyaki House LLC</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="text-blue-200/30 text-xs text-center">
              © {new Date().getFullYear()} Waiyaki House LLC. All rights reserved. · Tyre Services Pilot · Limuru Area · MVP v1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}