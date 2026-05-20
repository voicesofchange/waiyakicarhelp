const STEPS = [
  { step: "01", title: "Driver Requests", desc: "Driver opens the app, selects the roadside service they need, shares their location and vehicle details." },
  { step: "02", title: "Skill Expert Notified", desc: "The nearest contracted skill expert receives an instant notification and accepts the job." },
  { step: "03", title: "Expert Arrives", desc: "Expert is en route within 20 minutes, GPS-tracked, with job status updated in real time." },
  { step: "04", title: "Done & Paid", desc: "Service completed. Driver pays via M-PESA. Skill expert receives 80% within 24 hours — the loop continues." },
];

const SERVICES = [
  { category: "🔧 Tyre Services", service: "Puncture Repair (Tubeless)", price: "KES 200-400" },
  { category: "🔧 Tyre Services", service: "Puncture Repair (Tube Tyre)", price: "KES 200-400" },
  { category: "🔧 Tyre Services", service: "Tyre Change (Spare Swap)", price: "KES 300" },
  { category: "🔧 Tyre Services", service: "Tyre Change + Balancing", price: "KES 600" },
  { category: "🔧 Tyre Services", service: "Tyre Inflation (4 tyres)", price: "KES 122" },
  { category: "🔧 Tyre Services", service: "Tyre Removal & Refit", price: "KES 535" },
  { category: "⚡ Battery & Electrical", service: "Jump Start (Dead Battery)", price: "KES 385" },
  { category: "⚡ Battery & Electrical", service: "Battery Replacement (supply + fit)", price: "KES 10,000+" },
  { category: "⛽ Fuel & Fluids", service: "Emergency Fuel Delivery (up to 5L)", price: "KES 300 + fuel" },
  { category: "⛽ Fuel & Fluids", service: "Engine Coolant Top-Up", price: "KES 300" },
  { category: "🚗 Vehicle Recovery", service: "Towing Coordination (local, up to 10km)", price: "KES 10,000" },
  { category: "🔩 Minor Roadside Fixes", service: "Loose / Fallen Belt Re-fitting", price: "KES 500" },
];

export default function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#F0F4FF]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#2563EB] font-bold text-sm uppercase tracking-widest">How It Works</span>
          <h2 className="text-4xl font-black mt-3 mb-4 text-[#0D1B2A]">The Complete Flow</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Simple by design. Driver requests help, a verified skill expert responds — every job feeds back into the community and the loop.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {STEPS.map(item => (
            <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              <p className="text-4xl font-black text-[#2563EB]/20 mb-3">{item.step}</p>
              <h3 className="font-black text-base mb-2 text-[#0D1B2A]">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#0D1B2A] rounded-3xl p-8 text-white">
          <h3 className="font-black text-xl mb-2 text-[#F59E0B]">Roadside Services & Fixed Rates</h3>
          <p className="text-blue-100/70 text-sm mb-6">All rates are fixed. No negotiation at the roadside. All vehicle types covered. Every fee feeds the loop.</p>
          <div className="grid md:grid-cols-2 gap-3">
            {SERVICES.map(r => (
              <div key={r.service} className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <div>
                  <p className="text-blue-300/60 text-xs mb-0.5">{r.category}</p>
                  <span className="text-blue-100 text-sm">{r.service}</span>
                </div>
                <span className="text-[#F59E0B] font-black text-sm ml-4 whitespace-nowrap">{r.price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-200/50 mt-4">Skill expert receives 80% of every fee. Waiyaki retains 20% as a platform coordination fee. Services expand as the network grows.</p>
        </div>
      </div>
    </section>
  );
}