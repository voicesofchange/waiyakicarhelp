import { useState } from "react";

const NAV_LINKS = ["About", "Mission", "Vision", "How It Works", "SDGs", "Consultancy", "Partner With Us"];

export default function LandingNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A]/95 backdrop-blur border-b border-white/10 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/23900b373_WaiyakiHouse.png" alt="Waiyaki House LLC" className="h-10 w-10 object-contain rounded-lg" />
          <div>
            <p className="font-black text-white text-sm leading-tight">WAIYAKI HOUSE</p>
            <p className="text-xs text-blue-300 leading-tight">Waiyaki House LLC · Kenya</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-blue-100 hover:text-[#F59E0B] font-medium transition-colors">
              {link}
            </a>
          ))}
          <a href="#partner-with-us"
            className="bg-[#F59E0B] text-[#0D1B2A] font-bold text-sm px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors">
            Partner With Us
          </a>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#0D1B2A] border-t border-white/10 px-6 py-4 space-y-3">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-blue-100 font-medium py-1">
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}