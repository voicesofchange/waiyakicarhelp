import { motion } from "framer-motion";

const HERO_IMG = "https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/9314446f7_generated_image.png";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function SiteHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D1B2A]">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Roadside assistance in Limuru, Kenya" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/85 to-[#0D1B2A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-[#0D1B2A]/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-white/90 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-7">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            Roadside Assistance · Limuru, Kenya
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight">
            A circular economy
            <br />
            <span className="text-[#F59E0B]">built for Kenya.</span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-blue-100/80 max-w-xl leading-relaxed">
            Every breakdown resolved creates a job. Every job dignifies a skilled expert. Every expert empowered strengthens a community. That cycle is Waiyaki House.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button onClick={() => scrollTo("what")} className="bg-[#F59E0B] text-[#0D1B2A] font-black px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors text-base shadow-2xl shadow-yellow-500/20">
              Explore What We Do
            </button>
            <button onClick={() => scrollTo("partner")} className="border border-white/25 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-base backdrop-blur">
              Partner With Us
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs font-bold tracking-widest uppercase animate-bounce">
        Scroll
      </div>
    </section>
  );
}