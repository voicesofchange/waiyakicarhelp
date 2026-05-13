export default function LandingProblem() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#2563EB] font-bold text-sm uppercase tracking-widest">The Problem · Collective Responsibility Begins Here</span>
            <h2 className="text-4xl font-black mt-3 mb-6 leading-tight text-[#0D1B2A]">A broken system fails everyone — because no one owns the outcome together.</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Along the Waiyaki Way corridor, a stranded driver today enters a disorganised, cash-based, accountability-free informal market. Value leaks out of every transaction — for the driver, the skill expert, and the community alike.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Drivers negotiate prices under stress. Skill experts — mechanics, technicians, and specialists — wait roadside for irregular work. Income stays informal and untraceable. The community sees none of the economic or environmental benefit that a well-functioning local economy could generate.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Waiyaki House closes that loop through <strong>collective responsibility</strong> — a shared commitment by drivers, skill experts, investors, and community members that every service rendered feeds value back to everyone. Fair expert wages. Environmental restoration. Legal and dialogue support for those who need it most.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-[#0D1B2A] rounded-2xl p-6 text-white">
              <p className="text-[#F59E0B] font-black text-lg mb-2">No circular model exists yet</p>
              <p className="text-blue-100 text-sm leading-relaxed">No platform today connects roadside assistance services to community wealth creation. Waiyaki House builds that connection — digitally, transparently, at scale.</p>
            </div>
            <div className="bg-[#EFF6FF] rounded-2xl p-6 border border-blue-100">
              <p className="text-[#0D1B2A] font-black text-lg mb-2">Average vehicle age: 14–20 years</p>
              <p className="text-gray-500 text-sm leading-relaxed">Kenya's ageing fleet generates consistent demand for roadside assistance — sustaining the economic engine that funds community empowerment and environmental restoration.</p>
            </div>
            <div className="bg-[#FEF9C3] border border-yellow-200 rounded-2xl p-6">
              <p className="text-[#0D1B2A] font-black text-lg mb-2">The Waiyaki Loop</p>
              <p className="text-yellow-900 text-sm leading-relaxed">Service revenue → skill expert wages → community wealth → environmental stewardship → consultancy knowledge → stronger communities. A self-reinforcing cycle.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}