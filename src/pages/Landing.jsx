import { useState } from "react";
import { base44 } from "@/api/base44Client";

const NAV_LINKS = ["About", "Mission", "Vision", "How It Works", "Partner With Us"];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", org: "", type: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.integrations.Core.SendEmail({
      to: "sustainthevoices@gmail.com",
      subject: `Partnership Inquiry — ${form.type || "General"} — ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${form.org}\nType: ${form.type}\n\nMessage:\n${form.message}`,
    });
    setSent(true);
    setSending(false);
    setForm({ name: "", email: "", org: "", type: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/23900b373_WaiyakiHouse.png" alt="Waiyaki House LLC" className="h-10 w-10 object-contain rounded-lg" />
            <div>
              <p className="font-black text-gray-900 text-sm leading-tight">WAIYAKI CAR HELP</p>
              <p className="text-xs text-gray-400 leading-tight">by Waiyaki House LLC</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-gray-600 hover:text-amber-500 font-medium transition-colors">
                {link}
              </a>
            ))}
            <a href="#partner-with-us"
              className="bg-amber-500 text-black font-bold text-sm px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors">
              Partner With Us
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-700 font-medium py-1">
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 bg-[#0F0F0F] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Waiyaki House LLC — Limuru Area, Kenya · Pilot 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Roadside Tyre Help,{" "}
            <span className="text-amber-400">Coordinated</span>{" "}
            for Kenya.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
            Kenya has nearly 5 million registered vehicles. Tyre failures are among the most common and most preventable breakdowns. We built the coordination layer that fixes that.
          </p>
          <p className="text-gray-400 text-base max-w-xl mx-auto mb-10">
            A driver requests help. A verified local mechanic is dispatched. The job is done. Payment is settled via M-PESA. That is the complete flow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#partner-with-us"
              className="bg-amber-500 text-black font-bold px-8 py-4 rounded-xl hover:bg-amber-400 transition-colors text-base">
              Partner With Us →
            </a>
            <a href="#about"
              className="border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-amber-500 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "~5M", label: "Registered Vehicles in Kenya" },
            { value: "< 20min", label: "Target Response Time" },
            { value: "80%", label: "Mechanic Revenue Share" },
            { value: "M-PESA", label: "Seamless Digital Payment" },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-black text-black">{stat.value}</p>
              <p className="text-sm text-black/70 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE PROBLEM */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">The Problem</span>
              <h2 className="text-4xl font-black mt-3 mb-6 leading-tight">The roads are full. The system is broken.</h2>
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
              <div className="bg-[#0F0F0F] rounded-2xl p-6 text-white">
                <p className="text-amber-400 font-black text-lg mb-2">No platform exists</p>
                <p className="text-gray-400 text-sm leading-relaxed">No app, no hotline, no structured service coordinates tyre assistance digitally in the Limuru area. Waiyaki fills that gap directly.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-900 font-black text-lg mb-2">Average vehicle age: 14–20 years</p>
                <p className="text-gray-500 text-sm leading-relaxed">Kenya's ageing fleet generates growing and consistent demand for tyre services — the most common and most preventable vehicle emergency on Kenyan roads.</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <p className="text-amber-900 font-black text-lg mb-2">Waiyaki's answer</p>
                <p className="text-amber-800 text-sm leading-relaxed">App dispatch. Fixed rates. M-PESA payment. Mechanic accountability. A coordination layer that makes the whole system work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">Our Mission</span>
          <h2 className="text-4xl font-black mt-3 mb-4">What We Are Here to Do</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            To provide fast, reliable, and dignified roadside tyre assistance to Kenyan motorists — while creating sustainable, well-compensated, formal livelihoods for local mechanics.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚗",
                title: "Serve Drivers",
                desc: "Fixed rates, no negotiation at the roadside. A verified mechanic dispatched to your location. Pay via M-PESA. Simple, safe, predictable.",
              },
              {
                icon: "🔧",
                title: "Empower Mechanics",
                desc: "80% of every job fee goes directly to the mechanic. Steady job flow, digital income records, and a professional reputation system — a path out of informality.",
              },
              {
                icon: "📱",
                title: "Build the Infrastructure",
                desc: "App dispatch, GPS coordination, M-PESA payments, mechanic accountability — the same infrastructure that will scale across corridors and service types.",
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-left">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-black text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE LAYERS */}
      <section className="py-24 px-6 bg-[#0F0F0F] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-bold text-sm uppercase tracking-widest">Framework</span>
            <h2 className="text-4xl font-black mt-3 mb-4">A Three-Layer Corridor Infrastructure</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Even at pilot scale, Waiyaki operates across three reinforcing layers. The infrastructure being built now is the same infrastructure that will eventually coordinate multiple mechanics across multiple corridors.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Mobility Infrastructure",
                subtitle: "The core business",
                desc: "Fast, reliable tyre assistance for drivers in the Limuru area. Fixed rates, M-PESA payment, GPS dispatch. This layer must work before anything else is possible.",
                color: "border-amber-500",
              },
              {
                num: "02",
                title: "Economic Infrastructure",
                subtitle: "Dignified work for mechanics",
                desc: "Contracted mechanics earn 80% of every job. Digital income records, professional reputation, and a formal economic identity. Waiyaki turns informal labour into structured work.",
                color: "border-green-500",
              },
              {
                num: "03",
                title: "Data Infrastructure",
                subtitle: "The long-term asset",
                desc: "Every job generates operational data: response times, job locations, payment records, ratings. This data makes Waiyaki increasingly valuable as it scales — to insurers, fleet operators, and partners.",
                color: "border-blue-400",
              },
            ].map(layer => (
              <div key={layer.num} className={`bg-white/5 border-t-4 ${layer.color} rounded-2xl p-8`}>
                <p className="text-4xl font-black text-white/20 mb-3">{layer.num}</p>
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wide mb-1">{layer.subtitle}</p>
                <h3 className="font-black text-xl text-white mb-4">{layer.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{layer.desc}</p>
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
              <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">Our Vision</span>
              <h2 className="text-4xl font-black mt-3 mb-6">Start Small. Build the Right System. Scale It.</h2>
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
                    <span className="text-amber-500 font-black mt-0.5">→</span>
                    <p className="text-gray-600 text-sm">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 bg-amber-50 rounded-r-2xl p-6">
                <p className="text-amber-700 font-black text-lg mb-2">Phase 1 — Pilot (Now)</p>
                <p className="text-amber-800 text-sm leading-relaxed">One mechanic. Limuru area. Tyre services only. Prove that drivers request help via app, the mechanic responds reliably, and M-PESA payment works end to end. Build the operational data.</p>
              </div>
              <div className="border-l-4 border-gray-300 bg-gray-50 rounded-r-2xl p-6">
                <p className="text-gray-700 font-black text-lg mb-2">Phase 2 — Corridor Expansion</p>
                <p className="text-gray-500 text-sm leading-relaxed">Expand to Nairobi, Nakuru, Thika. Onboard additional contracted mechanics. Launch fleet and corporate accounts. Introduce mechanic certification.</p>
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
      <section id="how-it-works" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">How It Works</span>
            <h2 className="text-4xl font-black mt-3 mb-4">The Complete Flow</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Simple by design. The MVP is deliberately focused — proving the model before expanding it.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { step: "01", title: "Driver Requests", desc: "Driver opens the app, selects a tyre service, shares their location and vehicle details." },
              { step: "02", title: "Mechanic Notified", desc: "The contracted mechanic receives an instant notification and accepts the job." },
              { step: "03", title: "Mechanic Arrives", desc: "Mechanic is en route within 20 minutes, GPS-tracked, with job status updated in real time." },
              { step: "04", title: "Done & Paid", desc: "Service completed. Driver pays via M-PESA. Mechanic receives 80% within 24 hours." },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-4xl font-black text-amber-500/30 mb-3">{item.step}</p>
                <h3 className="font-black text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Services & Rates */}
          <div className="bg-[#0F0F0F] rounded-3xl p-8 text-white">
            <h3 className="font-black text-xl mb-2 text-amber-400">Pilot Services & Fixed Rates</h3>
            <p className="text-gray-400 text-sm mb-6">All rates are fixed. No negotiation at the roadside. All vehicle types covered.</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { service: "Puncture Repair (Tubeless)", price: "KES 500" },
                { service: "Puncture Repair (Tube Tyre)", price: "KES 400" },
                { service: "Tyre Change (Spare Swap)", price: "KES 500" },
                { service: "Tyre Change + Balancing", price: "KES 800" },
                { service: "Tyre Inflation (4 tyres)", price: "KES 200" },
                { service: "Tyre Removal & Refit", price: "KES 600" },
              ].map(r => (
                <div key={r.service} className="flex justify-between items-center bg-white/5 rounded-xl px-4 py-3">
                  <span className="text-gray-300 text-sm">{r.service}</span>
                  <span className="text-amber-400 font-black text-sm">{r.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Mechanic receives 80% of every fee. Waiyaki retains 20% as a platform coordination fee.</p>
          </div>
        </div>
      </section>

      {/* THEORY OF CHANGE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">Theory of Change</span>
          <h2 className="text-4xl font-black mt-3 mb-4">Why This Works</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            Waiyaki introduces a coordination layer between drivers and mechanics. The result is better outcomes for both sides — and operational data that makes the platform increasingly valuable over time.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="font-black text-xl mb-4">For Drivers</h3>
              <div className="space-y-3">
                {[
                  "Fixed, transparent pricing — no stress negotiation",
                  "Verified, accountable mechanic — not a stranger from the roadside",
                  "Pay-per-use via M-PESA — no membership required",
                  "Real-time job tracking and status updates",
                  "Rating system creates accountability and quality assurance",
                ].map(point => (
                  <div key={point} className="flex items-start gap-2">
                    <span className="text-blue-500 font-black text-xs mt-1">✓</span>
                    <p className="text-gray-600 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="font-black text-xl mb-4">For Mechanics</h3>
              <div className="space-y-3">
                {[
                  "Steady, predictable job flow — no more waiting roadside",
                  "80% revenue share — fair and transparent",
                  "Digital income records — a formal economic identity",
                  "Professional reputation through ratings",
                  "A path from informal labour to structured, dignified work",
                ].map(point => (
                  <div key={point} className="flex items-start gap-2">
                    <span className="text-green-500 font-black text-xs mt-1">✓</span>
                    <p className="text-gray-600 text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section id="partner-with-us" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">Collaborate</span>
            <h2 className="text-4xl font-black mt-3 mb-4">Partner With Waiyaki</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              We are actively looking for investors, mechanics, corporates, and organisations who see what we see — and want to build it with us.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: "💼",
                title: "Investors",
                desc: "We are raising capital to prove the pilot model and expand across Kenya's road corridors. Join early in building the country's leading roadside coordination platform.",
                cta: "Investor inquiry →",
              },
              {
                icon: "🔧",
                title: "Mechanics",
                desc: "Are you a skilled tyre mechanic in the Limuru area or beyond? Join our contractor network. Get steady job flow, earn 80% of every call-out, and build a professional reputation.",
                cta: "Mechanic inquiry →",
              },
              {
                icon: "🏢",
                title: "Corporates & Fleets",
                desc: "Protect your fleet vehicles with priority roadside tyre assistance. We offer tailored service contracts for businesses, NGOs, and organisations with vehicles on Kenyan roads.",
                cta: "Corporate inquiry →",
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-black text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm flex-1">{item.desc}</p>
                <a href="#contact-form" className="mt-6 text-amber-500 font-bold text-sm hover:underline">{item.cta}</a>
              </div>
            ))}
          </div>

          {/* CONTACT FORM */}
          <div id="contact-form" className="bg-[#0F0F0F] rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-white font-black text-2xl mb-1">Get In Touch</h3>
            <p className="text-gray-400 mb-8 text-sm">Send us a message and we'll respond within 24 hours.</p>
            {sent ? (
              <div className="text-center py-10">
                <p className="text-5xl mb-4">✅</p>
                <p className="text-white font-black text-xl">Message Sent!</p>
                <p className="text-gray-400 mt-2 text-sm">We'll be in touch very soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="col-span-2 sm:col-span-1 w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Your Email *"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="col-span-2 sm:col-span-1 w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>
                <input
                  placeholder="Organisation / Company (optional)"
                  value={form.org}
                  onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                />
                <select
                  value={form.type}
                  onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
                >
                  <option value="" className="bg-gray-900">I am reaching out as... (select one)</option>
                  <option value="Investor" className="bg-gray-900">An Investor</option>
                  <option value="Mechanic" className="bg-gray-900">A Mechanic</option>
                  <option value="Corporate / Fleet" className="bg-gray-900">A Corporate / Fleet Operator</option>
                  <option value="NGO / Organisation" className="bg-gray-900">An NGO / Organisation</option>
                  <option value="Other" className="bg-gray-900">Something Else</option>
                </select>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us how you'd like to collaborate or partner..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-4 rounded-xl transition-colors text-base disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F0F0F] py-10 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src="https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/23900b373_WaiyakiHouse.png" alt="Waiyaki House LLC" className="h-8 w-8 object-contain rounded-md" />
                <div>
                  <p className="text-white font-black text-sm">Waiyaki Car Help</p>
                  <p className="text-gray-500 text-xs">A Waiyaki House LLC Product</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
                Coordinating roadside tyre assistance across Kenya's road corridors. Starting in Limuru. Building the infrastructure that scales.
              </p>
            </div>
            <div className="text-sm space-y-2">
              <p className="text-gray-400 font-bold mb-3">Contact</p>
              <p className="text-gray-500 text-xs">sustainthevoices@gmail.com</p>
              <p className="text-gray-500 text-xs">Limuru Area, Nairobi, Kenya</p>
              <p className="text-gray-500 text-xs">Tex Wambui · Co-Founder, Waiyaki House LLC</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="text-gray-600 text-xs text-center">
              © {new Date().getFullYear()} Waiyaki House LLC. All rights reserved. · Tyre Services Pilot · Limuru Area · MVP v1.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}