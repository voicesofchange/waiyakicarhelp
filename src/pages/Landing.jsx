import LandingNav from "@/components/landing/LandingNav";
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

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <LandingNav />
      <LandingHero />
      <LandingStats />
      <LandingProblem />
      <LandingMission />
      <LandingMechanicDefinition />
      <LandingLayers />
      <LandingVision />
      <LandingHowItWorks />
      <LandingTheoryOfChange />
      <LandingSDGs />
      <LandingConsultancy />
      <LandingPartner />
      <LandingFooter />
    </div>
  );
}