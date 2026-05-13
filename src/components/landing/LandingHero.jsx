export default function LandingHero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-[#0D1B2A] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/15 via-transparent to-[#1E3A5F]/30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative">
        <span className="inline-block bg-[#2563EB]/20 text-blue-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-[#2563EB]/30">
          Waiyaki House LLC — Limuru Area, Kenya · Pilot 2026
        </span>
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
          A Circular Economy{" "}
          <span className="text-[#F59E0B]">Built for Kenya.</span>
        </h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
          Every breakdown resolved creates a job. Every job dignifies a skilled expert. Every expert empowered strengthens a community. Every strong community protects its environment. That cycle is Waiyaki House.
        </p>
        <p className="text-blue-200/70 text-base max-w-xl mx-auto mb-10">
          Roadside assistance services. Youth economic empowerment. Environmental stewardship. Legal and community consultancy. Four pillars. One reinforcing loop.
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
  );
}