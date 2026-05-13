import { useState } from "react";
import { base44 } from "@/api/base44Client";

const NAV_LINKS = ["About", "Mission", "Vision", "How It Works", "Partner With Us"];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.integrations.Core.SendEmail({
      to: "sustainthevoices@gmail.com",
      subject: `Partnership Inquiry from ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    });
    setSent(true);
    setSending(false);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-sm">W</span>
            </div>
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
            Waiyaki House LLC — Limuru, Kenya
          </span>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Roadside Tyre Help,{" "}
            <span className="text-amber-400">Reimagined</span>{" "}
            for Kenya.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We're building a network of trusted, local mechanics who respond fast when Kenyan drivers need help the most — right on the road, right on time.
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
            { value: "24/7", label: "Service Availability" },
            { value: "< 30min", label: "Target Response Time" },
            { value: "Limuru", label: "Launch Region" },
            { value: "80%", label: "Mechanic Revenue Share" },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-black text-black">{stat.value}</p>
              <p className="text-sm text-black/70 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">About Us</span>
              <h2 className="text-4xl font-black mt-3 mb-6 leading-tight">We are Waiyaki House LLC</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Waiyaki House LLC is a Kenyan venture building practical, technology-driven solutions for everyday challenges faced by motorists and service workers across the country.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our flagship product, <strong>Waiyaki Car Help</strong>, is a roadside tyre assistance platform that connects stranded drivers with contracted local mechanics — fast, fair, and transparent.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that a flat tyre on a Kenyan road should never be a crisis. With the right people and the right tools, help should always be a tap away.
              </p>
            </div>
            <div className="bg-[#0F0F0F] rounded-3xl p-8 text-white">
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-black font-black text-2xl">W</span>
              </div>
              <p className="text-2xl font-black mb-3">Built in Kenya.<br />Built for Kenya.</p>
              <p className="text-gray-400 leading-relaxed">
                From the mechanics who know every road in Limuru, to the drivers who depend on getting home safely — everything we build puts real people first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">Our Mission</span>
          <h2 className="text-4xl font-black mt-3 mb-6">What We're Here to Do</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            To provide fast, reliable, and dignified roadside tyre assistance to Kenyan motorists — while creating sustainable, well-compensated livelihoods for local mechanics.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚗",
                title: "Help Drivers",
                desc: "No more waiting hours for help. We dispatch a trusted mechanic to your location in under 30 minutes.",
              },
              {
                icon: "🔧",
                title: "Empower Mechanics",
                desc: "We contract and pay local mechanics fairly — 80% of every job goes directly to the mechanic who does the work.",
              },
              {
                icon: "📱",
                title: "Use Technology",
                desc: "Our dispatch platform makes job management, payments, and communication seamless for everyone involved.",
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

      {/* VISION */}
      <section id="vision" className="py-24 px-6 bg-[#0F0F0F] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-400 font-bold text-sm uppercase tracking-widest">Our Vision</span>
              <h2 className="text-4xl font-black mt-3 mb-6">Where We're Going</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                We envision a Kenya where no driver is stranded and no mechanic is unemployed. Waiyaki Car Help is the first step — starting in Limuru and expanding across the country.
              </p>
              <div className="space-y-4">
                {[
                  "Expand to 5+ regions across Kenya by 2026",
                  "Build a certified network of 100+ contracted mechanics",
                  "Introduce fleet & corporate tyre service contracts",
                  "Offer mechanic training & certification programs",
                  "Partner with insurance companies for roadside cover",
                ].map(goal => (
                  <div key={goal} className="flex items-start gap-3">
                    <span className="text-amber-400 font-black mt-0.5">→</span>
                    <p className="text-gray-300">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                <p className="text-amber-400 font-black text-lg mb-2">Phase 1 — Now</p>
                <p className="text-gray-300 text-sm">Launch in Limuru. Prove the model. Serve real drivers. Build trust with local mechanics.</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                <p className="text-amber-400 font-black text-lg mb-2">Phase 2 — 2025/2026</p>
                <p className="text-gray-300 text-sm">Expand to Nairobi, Nakuru, Thika. Onboard corporate fleet clients. Launch mechanic certification.</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/10">
                <p className="text-amber-400 font-black text-lg mb-2">Phase 3 — Beyond</p>
                <p className="text-gray-300 text-sm">Pan-African roadside assistance. Insurance partnerships. Full mechanic training academy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">How It Works</span>
          <h2 className="text-4xl font-black mt-3 mb-4">Simple. Fast. Reliable.</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-16">Our platform connects drivers in need with skilled mechanics in their area — in just a few steps.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Driver Requests Help", desc: "A driver shares their location and vehicle details through our platform." },
              { step: "02", title: "Job is Dispatched", desc: "Our system alerts the nearest available contracted mechanic instantly." },
              { step: "03", title: "Mechanic Arrives", desc: "The mechanic is en route within minutes and keeps the driver updated." },
              { step: "04", title: "Job Done & Paid", desc: "Service is completed and payment is processed transparently via M-PESA." },
            ].map(item => (
              <div key={item.step} className="text-left">
                <p className="text-5xl font-black text-amber-500/20 mb-3">{item.step}</p>
                <h3 className="font-black text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section id="partner-with-us" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">Collaborate</span>
            <h2 className="text-4xl font-black mt-3 mb-4">Partner With Us</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              We're actively looking for investors, mechanics, corporates, and organizations who share our vision for better roads and better livelihoods in Kenya.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: "💼",
                title: "Investors",
                desc: "Join us early in building Kenya's leading roadside assistance platform. We're raising capital for regional expansion.",
              },
              {
                icon: "🔧",
                title: "Mechanics",
                desc: "Are you a skilled tyre mechanic? Join our contractor network, get steady jobs, and earn 80% of every call-out.",
              },
              {
                icon: "🏢",
                title: "Corporates & Fleets",
                desc: "Protect your fleet vehicles with priority roadside tyre assistance. We offer tailored contracts for businesses.",
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-black text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CONTACT FORM */}
          <div className="bg-[#0F0F0F] rounded-3xl p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-white font-black text-2xl mb-2">Get In Touch</h3>
            <p className="text-gray-400 mb-8">Send us a message and we'll get back to you within 24 hours.</p>
            {sent ? (
              <div className="text-center py-8">
                <p className="text-4xl mb-4">✅</p>
                <p className="text-white font-black text-xl">Message Sent!</p>
                <p className="text-gray-400 mt-2">We'll be in touch very soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us how you'd like to partner or collaborate..."
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
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded-md flex items-center justify-center">
              <span className="text-black font-black text-xs">W</span>
            </div>
            <div>
              <p className="text-white font-black text-sm">Waiyaki Car Help</p>
              <p className="text-gray-500 text-xs">A Waiyaki House LLC Product</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} Waiyaki House LLC. All rights reserved. · Limuru, Kenya
          </p>
          <p className="text-gray-500 text-xs">sustainthevoices@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}