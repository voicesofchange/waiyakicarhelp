import SiteNav from "@/components/site/SiteNav";
import SiteHero from "@/components/site/SiteHero";
import SiteStats from "@/components/site/SiteStats";
import SiteServices from "@/components/site/SiteServices";
import SiteLoop from "@/components/site/SiteLoop";
import SiteProcess from "@/components/site/SiteProcess";
import SiteVision from "@/components/site/SiteVision";
import SitePartner from "@/components/site/SitePartner";
import SiteFooter from "@/components/site/SiteFooter";

export default function Landing() {
  return (
    <div className="bg-[#0D1B2A] font-sans antialiased">
      <SiteNav />
      <SiteHero />
      <SiteStats />
      <SiteServices />
      <SiteLoop />
      <SiteProcess />
      <SiteVision />
      <SitePartner />
      <SiteFooter />
    </div>
  );
}