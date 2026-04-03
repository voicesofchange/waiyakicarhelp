import { Outlet, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Wrench, LayoutDashboard, Settings } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Member", icon: Home },
  { to: "/mechanic", label: "Mechanic", icon: Wrench },
  { to: "/admin", label: "Admin", icon: LayoutDashboard },
  { to: "/settings", label: "Settings", icon: Settings },
];

const pageVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.15, ease: "easeIn" } },
};

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      {/* Sticky top header */}
      <header className="sticky top-0 z-40 bg-gray-900 text-white px-4 flex items-center shadow-md" style={{ minHeight: 52 }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-gray-900 font-black text-sm">W</span>
          </div>
          <span className="font-black text-lg tracking-tight">WAIYAKI</span>
        </div>
        <div className="ml-auto text-xs text-gray-400">
          {pathname === "/" && "Tyre Service · Limuru"}
          {pathname === "/mechanic" && "Prince Waiyaki · Mechanic"}
          {pathname === "/admin" && "Tex Wambui · Admin"}
          {pathname === "/settings" && "Settings"}
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 flex items-stretch"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 select-none tap-highlight-transparent transition-colors ${
                active ? "text-amber-400" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}