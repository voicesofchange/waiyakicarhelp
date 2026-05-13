const FOR_DRIVERS = [
  "Fixed, transparent pricing across all roadside services — no stress negotiation",
  "Verified, accountable skill expert dispatched to your location fast",
  "Tyre repairs, battery jumps, fuel delivery, towing & more — one platform",
  "Pay via M-PESA — your payment funds a local livelihood",
  "Your service fee re-enters the community: expert wages, restoration, consultancy",
];

const FOR_EXPERTS = [
  "80% of every job fee returns to you — directly, within 24 hours",
  "Steady, app-dispatched job flow — value flows to you reliably",
  "Digital income records — your formal foothold in the economy",
  "Professional ratings and certification — your reputation compounds over time",
  "Your earnings stay in Limuru, strengthening the community that supports the platform",
];

export default function LandingTheoryOfChange() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-[#2563EB] font-bold text-sm uppercase tracking-widest">Theory of Change</span>
        <h2 className="text-4xl font-black mt-3 mb-4 text-[#0D1B2A]">Why the Circular Model Works</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          Waiyaki House creates a closed loop where every participant benefits. Drivers get reliable service. Skill experts — mechanics, technicians, and specialists whose expertise addresses daily community needs — get dignity and income. Communities get environmental restoration, legal support, and a stronger local economy.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="bg-[#EFF6FF] rounded-2xl p-8 border border-blue-100">
            <h3 className="font-black text-xl mb-4 text-[#0D1B2A]">For Drivers</h3>
            <div className="space-y-3">
              {FOR_DRIVERS.map(point => (
                <div key={point} className="flex items-start gap-2">
                  <span className="text-[#2563EB] font-black text-xs mt-1">✓</span>
                  <p className="text-gray-600 text-sm">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#FEF9C3] rounded-2xl p-8 border border-yellow-200">
            <h3 className="font-black text-xl mb-4 text-[#0D1B2A]">For Skill Experts (Mechanics)</h3>
            <div className="space-y-3">
              {FOR_EXPERTS.map(point => (
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
  );
}