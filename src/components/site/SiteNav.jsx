import { useState, useEffect } from "react";

const LINKS = [
  { id: "what", label: "What We Do" },
  { id: "loop", label: "The Loop" },
  { id: "process", label: "How It Works" },
  { id: "vision", label: "Vision" },
  { id: "partner", label: "Partner" },
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0D1B2A]/90 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
          <img src="https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/23900b373_WaiyakiHouse.png" alt="Waiyaki House" className="h-9 w-9 object-contain rounded-lg" />
          <div className="text-left leading-none">
            <p className="text-white font-black text-sm tracking-tight">WAIYAKI HOUSE</p>
            <p className="text-[#F59E0B] text-[10px] font-bold tracking-[0.2em] mt-0.5">LIMURU · KENYA</p>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="px-4 py-2 text-sm font-semibold text-white/70 hover:text-white transition-colors">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("partner")} className="ml-3 bg-[#F59E0B] text-[#0D1B2A] font-black text-sm px-5 py-2.5 rounded-full hover:bg-yellow-300 transition-colors">
            Get In Touch
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0D1B2A] border-t border-white/10 mt-3 px-6 py-4 space-y-1">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => { scrollTo(l.id); setOpen(false); }} className="block w-full text-left py-3 text-white/80 font-semibold border-b border-white/5">
              {l.label}
            </button>
          ))}
          <button onClick={() => { scrollTo("partner"); setOpen(false); }} className="w-full mt-3 bg-[#F59E0B] text-[#0D1B2A] font-black py-3 rounded-full">
            Get In Touch
          </button>
        </div>
      )}
    </nav>
  );
}