export default function LandingFooter() {
  return (
    <footer className="bg-[#0D1B2A] py-10 px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/23900b373_WaiyakiHouse.png" alt="Waiyaki House LLC" className="h-8 w-8 object-contain rounded-md" />
              <div>
                <p className="text-white font-black text-sm">Waiyaki House</p>
                <p className="text-blue-300 text-xs">Waiyaki House LLC · Kenya</p>
              </div>
            </div>
            <p className="text-blue-200/50 text-xs max-w-xs leading-relaxed">
              A circular economy of collective responsibility — roadside assistance, skill expert empowerment, environmental restoration, and community consultancy. Every participant holds a shared stake. Starting in Limuru. Scaling the loop.
            </p>
          </div>
          <div className="text-sm space-y-2">
            <p className="text-blue-200/80 font-bold mb-3">Contact</p>
            <p className="text-blue-200/50 text-xs">sustainthevoices@gmail.com</p>
            <p className="text-blue-200/50 text-xs">Limuru Area, Nairobi, Kenya</p>
            <div className="pt-2 space-y-1.5">
              <p className="text-white/80 text-xs font-semibold">Tex Wambui</p>
              <p className="text-blue-200/50 text-xs">Co-Founder & Director, Waiyaki House LLC</p>
            </div>
            <div className="pt-1 space-y-1.5">
              <p className="text-white/80 text-xs font-semibold">Hussein Waiyaki</p>
              <p className="text-blue-200/50 text-xs">Co-Founder & Director · Local Representative, Waiyaki House LLC</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-blue-200/30 text-xs text-center">
            © {new Date().getFullYear()} Waiyaki House LLC. All rights reserved. · Roadside Assistance Pilot · Limuru Area · MVP v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}