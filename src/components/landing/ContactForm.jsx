import { useState } from "react";
import { base44 } from "@/api/base44Client";

export default function ContactForm({ defaultType = "" }) {
  const [form, setForm] = useState({ name: "", email: "", org: "", type: defaultType, message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const payload = {
      to: "info@sustainthevoices.org",
      subject: `Waiyaki House Inquiry — ${form.type || "General"} — ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${form.org || "N/A"}\nType: ${form.type || "N/A"}\n\nMessage:\n${form.message}`,
    };
    await base44.integrations.Core.SendEmail(payload);
    setSent(true);
    setSending(false);
    setForm({ name: "", email: "", org: "", type: defaultType, message: "" });
  };

  return (
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
  );
}