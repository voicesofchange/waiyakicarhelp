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
{ id: "about", label: "About", icon: "🏠" },
{ id: "mission", label: "Mission", icon: "🎯" },
{ id: "who", label: "Who Is a Mechanic?", icon: "🔧" },
{ id: "framework", label: "Framework", icon: "🔁" },
{ id: "vision", label: "Vision", icon: "🌅" },
{ id: "how-it-works", label: "How It Works", icon: "⚙️" },
{ id: "change", label: "Theory of Change", icon: "💡" },
{ id: "sdgs", label: "SDGs", icon: "🌍" },
{ id: "consultancy", label: "Consultancy", icon: "⚖️" },
{ id: "partner", label: "Partner With Us", icon: "🤝" }];


export default function Landing() {
  const [activeTab, setActiveTab] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentTab = TABS.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2A] border-b border-white/5 shadow-xl">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => setActiveTab("about")} className="flex items-center gap-2 flex-shrink-0">
            <img src="https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/23900b373_WaiyakiHouse.png" alt="Waiyaki House LLC" className="h-9 w-9 object-contain rounded-lg" />
            <div className="hidden sm:block">
              <p className="font-black text-white text-sm leading-tight tracking-wide">WAIYAKI HOUSE LLC</p>
              <p className="text-xs text-[#F59E0B] leading-tight font-semibold">Limuru Area · Kenya</p>
            </div>
          </button>

          {/* Desktop tab bar */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto flex-1 justify-center">
            {TABS.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id ?
              "bg-[#F59E0B] text-[#0D1B2A]" :
              "text-white/90 hover:text-white hover:bg-white/10"}`
              }>
              
                {tab.icon} {tab.label}
              </button>
            )}
          </div>

          {/* Partner CTA */}
          <button
            onClick={() => setActiveTab("partner")}
            className="hidden sm:block bg-[#F59E0B] text-[#0D1B2A] font-black text-xs px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors flex-shrink-0 shadow-md">
            
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
        {mobileMenuOpen &&
        <div className="lg:hidden bg-[#0D1B2A] border-t border-white/10 px-4 py-4 grid grid-cols-2 gap-2">
            {TABS.map((tab) =>
          <button
            key={tab.id}
            onClick={() => {setActiveTab(tab.id);setMobileMenuOpen(false);}}
            className={`text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === tab.id ?
            "bg-[#F59E0B] text-[#0D1B2A]" :
            "text-blue-200 hover:bg-white/10"}`
            }>
            
                {tab.icon} {tab.label}
              </button>
          )}
          </div>
        }
      </nav>

      {/* TAB BREADCRUMB BAND */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#1E3A5F] border-b border-white/10 px-4 py-2 flex items-center gap-2">
        <span className="text-[#F59E0B] text-xs font-bold uppercase tracking-widest">Waiyaki House LLC</span>
        <span className="text-white/30 text-xs">→</span>
        <span className="text-white text-xs font-bold">{currentTab?.icon} {currentTab?.label}</span>
      </div>

      {/* HERO — always shown on "about" tab, full width above content */}
      <div className="pt-28">
        {activeTab === "about" &&
        <>
            <LandingHero onTabChange={setActiveTab} />
            <LandingStats />
            {/* TWO CORE SERVICES */}
            <section className="py-16 px-6 bg-white">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                  <span className="text-[#2563EB] font-bold text-xs uppercase tracking-widest">What We Do</span>
                  <h2 className="text-3xl font-black mt-2 text-[#0D1B2A]">Two Distinguished Services. One Circular Mission.</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* SERVICE 1 */}
                  <div className="bg-[#0D1B2A] rounded-3xl overflow-hidden flex flex-col">
                    <div className="px-8 pt-8 pb-6 flex-1">
                      <span className="inline-block bg-[#2563EB]/20 text-blue-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#2563EB]/30 mb-4">Service 1</span>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">🚗</span>
                        <div>
                          <h3 className="text-white font-black text-xl leading-tight">Roadside Assistance</h3>
                          <p className="text-blue-300 text-xs">Tyre services · On-demand · Fixed rates</p>
                        </div>
                      </div>
                      <p className="text-blue-100/70 text-sm leading-relaxed mb-5">
                        Fast, reliable tyre repair and roadside help dispatched directly to stranded drivers along the Waiyaki Way corridor. A verified skill expert reaches you in under 20 minutes — no negotiation, no surprises. Pay via M-PESA.
                      </p>
                      <div className="space-y-2">
                        {["Puncture repair (tubeless & tube)", "Tyre change & balancing", "Tyre inflation & refit", "Jump starts & minor roadside fixes"].map((item) =>
                      <div key={item} className="flex items-center gap-2">
                            <span className="text-[#F59E0B] font-black text-xs">✓</span>
                            <p className="text-blue-200/80 text-sm">{item}</p>
                          </div>
                      )}
                      </div>
                    </div>
                    <div className="px-8 pb-8">
                      <button onClick={() => setActiveTab("how-it-works")} className="w-full bg-[#F59E0B] text-[#0D1B2A] font-black py-3 rounded-xl hover:bg-yellow-400 transition-colors text-sm mt-6">
                        See How It Works →
                      </button>
                    </div>
                  </div>
                  {/* SERVICE 2 */}
                  <div className="bg-[#F0F4FF] border border-blue-100 rounded-3xl overflow-hidden flex flex-col">
                    <div className="px-8 pt-8 pb-6 flex-1">
                      <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#2563EB]/20 mb-4">Service 2</span>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">⚖️</span>
                        <div>
                          <h3 className="text-[#0D1B2A] font-black text-xl leading-tight">Consultancy</h3>
                          <p className="text-[#2563EB] text-xs">Legal · Youth empowerment · Environmental · Dialogue</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-5">
                        Independent consultancy services open to individuals, communities, businesses, and organisations. We provide expert guidance on legal rights, youth economic empowerment, environmental stewardship, and multi-stakeholder dialogue — embedding collective responsibility into every engagement.
                      </p>
                      <div className="space-y-2">
                        {["Legal rights & community law", "Youth empowerment & skills development", "Environmental & conservation advisory", "Dialogue & facilitation services"].map((item) =>
                      <div key={item} className="flex items-center gap-2">
                            <span className="text-[#2563EB] font-black text-xs">✓</span>
                            <p className="text-gray-600 text-sm">{item}</p>
                          </div>
                      )}
                      </div>
                    </div>
                    <div className="px-8 pb-8">
                      <button onClick={() => setActiveTab("consultancy")} className="w-full bg-[#0D1B2A] text-white font-black py-3 rounded-xl hover:bg-[#1E3A5F] transition-colors text-sm mt-6">
                        Explore Consultancy →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <LandingProblem />
          </>
        }
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
        {TABS.map((tab) =>
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-shrink-0 flex flex-col items-center px-3 py-2 text-xs font-bold transition-all min-w-[64px] ${
          activeTab === tab.id ?
          "text-[#F59E0B] border-t-2 border-[#F59E0B]" :
          "text-blue-300"}`
          }>
          
            <span className="text-base">{tab.icon}</span>
            <span className="mt-0.5 leading-tight text-center whitespace-nowrap" style={{ fontSize: "9px" }}>{tab.label}</span>
          </button>
        )}
      </div>

      <LandingFooter />
    </div>);

}