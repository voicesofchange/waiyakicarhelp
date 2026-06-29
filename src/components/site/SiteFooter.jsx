const TEAM = [
  { name: "Tex Wambui", role: "Co-Founder & Director" },
  { name: "Hussein Waiyaki", role: "Co-Founder & Director · Local Representative" },
  { name: "Prince Waiyaki", role: "Chief Tyre Service Officer" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#08111C] py-16 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="https://media.base44.com/images/public/69cf0927fb6ca50b8990557d/23900b373_WaiyakiHouse.png" alt="Waiyaki House" className="h-9 w-9 object-contain rounded-lg" />
              <div className="leading-none">
                <p className="text-white font-black text-sm">WAIYAKI HOUSE LLC</p>
                <p className="text-[#F59E0B] text-[10px] font-bold tracking-[0.2em] mt-0.5">LIMURU · KENYA</p>
              </div>
            </div>
            <p className="text-blue-200/50 text-sm leading-relaxed max-w-xs">
              A circular economy of collective responsibility — roadside assistance, skill expert empowerment, environmental restoration, and community investment. Starting in Limuru. Scaling the loop.
            </p>
          </div>

          <div>
            <p className="text-white font-black text-sm mb-4">Contact</p>
            <p className="text-blue-200/60 text-sm">sustainthevoices@gmail.com</p>
            <p className="text-blue-200/60 text-sm mt-1.5">Limuru Area, Nairobi, Kenya</p>
            <p className="text-blue-200/60 text-sm mt-1.5">waiyakihouse.com</p>
          </div>

          <div>
            <p className="text-white font-black text-sm mb-4">Leadership</p>
            <div className="space-y-3">
              {TEAM.map((t) => (
                <div key={t.name}>
                  <p className="text-white/90 text-sm font-semibold">{t.name}</p>
                  <p className="text-blue-200/50 text-xs">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-blue-200/30 text-xs text-center">
            © {new Date().getFullYear()} Waiyaki House LLC. All rights reserved. · Roadside Assistance · Limuru Area, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}