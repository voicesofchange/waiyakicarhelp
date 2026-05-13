import { useState } from "react";
import LandingHero from "@/components/landing/LandingHero";
import LandingStats from "@/components/landing/LandingStats";
import LandingProblem from "@/components/landing/LandingProblem";
import LandingMission from "@/components/landing/LandingMission";
import LandingMechanicDefinition from "@/components/landing/LandingMechanicDefinition";
import LandingLayers from "@/components/landing/LandingLayers";
import LandingVision from "@/components/landing/LandingVision";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingTheoryOfChange from "@/components/landing/LandingTheoryOfChange";
import LandingSDGs from "@/components/landing/LandingSDGs";
import LandingConsultancy from "@/components/landing/LandingConsultancy";
import LandingPartner from "@/components/landing/LandingPartner";
import LandingFooter from "@/components/landing/LandingFooter";

const TABS = [
  { id: "about",        label: "About",           icon: "🏠" },
  { id: "mission",      label: "Mission",          icon: "🎯" },
  { id: "who",          label: "Who Is a Mechanic?", icon: "🔧" },
  { id: "framework",    label: "Framework",        icon: "🔁" },
  { id: "vision",       label: "Vision",           icon: "🌅" },
  { id: "how-it-works", label: "How It Works",     icon: "⚙️" },
  { id: "change",       label: "Theory of Change", icon: "💡" },
  { id: "sdgs",         label: "SDGs",             icon: "🌍" },
  { id: "consultancy",  label: "Consultancy",      icon: "⚖️" },
  { id: "partner",      label: "Partner With Us",  icon: "🤝" },
];

export default function Landing() {
  const [activeTab, setActiveTab] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A]/97 backdrop-blur border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => setActiveTab("about")} className="flex items-center gap-2 flex-shrink-0">
            <img src="https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/23900b373_WaiyakiHouse.png" alt="Waiyaki House LLC" className="h-9 w-9 object-contain rounded-lg" />
            <div className="hidden sm:block">
              <p className="font-black text-white text-sm leading-tight">WAIYAKI HOUSE</p>
              <p className="text-xs text-blue-300 leading-tight">Collective Responsibility · Kenya</p>
            </div>
          </button>

          {/* Desktop tab bar */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto flex-1 justify-center">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#F59E0B] text-[#0D1B2A]"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Partner CTA */}
          <button
            onClick={() => setActiveTab("partner")}
            className="hidden sm:block bg-[#F59E0B] text-[#0D1B2A] font-bold text-xs px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors flex-shrink-0"
          >
            Partner With Us
          </button>

          {/* Mobile hamburger */}
          <button className="lg:hidden ml-auto" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D1B2A] border-t border-white/10 px-4 py-4 grid grid-cols-2 gap-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#F59E0B] text-[#0D1B2A]"
                    : "text-blue-200 hover:bg-white/10"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* TAB BREADCRUMB BAND */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#1E3A5F] border-b border-white/10 px-4 py-2 flex items-center gap-2">
        <span className="text-[#F59E0B] text-xs font-bold uppercase tracking-widest">Collective Responsibility</span>
        <span className="text-white/30 text-xs">→</span>
        <span className="text-white text-xs font-bold">{currentTab?.icon} {currentTab?.label}</span>
      </div>

      {/* HERO — always shown on "about" tab, full width above content */}
      <div className="pt-28">
        {activeTab === "about" && (
          <>
            <LandingHero onTabChange={setActiveTab} />
            <LandingStats />
            <LandingProblem />
          </>
        )}
        {activeTab === "mission" && <LandingMission />}
        {activeTab === "who" && <LandingMechanicDefinition />}
        {activeTab === "framework" && <LandingLayers />}
        {activeTab === "vision" && <LandingVision />}
        {activeTab === "how-it-works" && <LandingHowItWorks />}
        {activeTab === "change" && <LandingTheoryOfChange />}
        {activeTab === "sdgs" && <LandingSDGs />}
        {activeTab === "consultancy" && <LandingConsultancy />}
        {activeTab === "partner" && <LandingPartner />}
      </div>

      {/* Bottom tab bar for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#0D1B2A] border-t border-white/10 flex overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex flex-col items-center px-3 py-2 text-xs font-bold transition-all min-w-[64px] ${
              activeTab === tab.id
                ? "text-[#F59E0B] border-t-2 border-[#F59E0B]"
                : "text-blue-300"
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span className="mt-0.5 leading-tight text-center whitespace-nowrap" style={{ fontSize: "9px" }}>{tab.label}</span>
          </button>
        ))}
      </div>

      <LandingFooter />
    </div>
  );
}