const LAYERS = [
  {
    num: "01",
    title: "Mobility Infrastructure",
    subtitle: "Value enters the loop",
    desc: "Fast, reliable roadside assistance for stranded drivers — tyre repairs, battery jumps, towing coordination, fuel delivery, and more. Fixed rates, M-PESA payment, GPS dispatch. Revenue generated here is what funds every other layer — this is where the circular economy begins.",
    color: "border-[#F59E0B]",
  },
  {
    num: "02",
    title: "Economic Infrastructure",
    subtitle: "Value returns to the community",
    desc: "80% of every job fee flows directly back to contracted skill experts. Digital income records, professional identity, and a formal foothold in Kenya's economy. Wealth generated stays local — in the hands of those who earned it.",
    color: "border-[#2563EB]",
  },
  {
    num: "03",
    title: "Social & Environmental Infrastructure",
    subtitle: "Value regenerates the ecosystem",
    desc: "Platform revenue funds wetland restoration, corridor clean-ups, legal consultancy, and community dialogue. Knowledge and environment restored feed stronger, more resilient communities — who demand more services, completing the loop.",
    color: "border-blue-300",
  },
];

export default function LandingLayers() {
  return (
    <section className="py-24 px-6 bg-[#0D1B2A] text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-300 font-bold text-sm uppercase tracking-widest">Framework</span>
          <h2 className="text-4xl font-black mt-3 mb-4">Three Reinforcing Layers of a Circular Economy</h2>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Waiyaki House is designed so that each layer feeds the next. Mobility generates economic participation. Economic participation generates data and community wealth. That wealth funds restoration, consultancy, and social infrastructure — which loops back to strengthen mobility demand.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {LAYERS.map(layer => (
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
  );
}