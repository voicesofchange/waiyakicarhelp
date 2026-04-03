import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Wrench, LayoutDashboard, Settings, ChevronLeft } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Member", icon: Home },
  { to: "/mechanic", label: "Mechanic", icon: Wrench },
  { to: "/admin", label: "Admin", icon: LayoutDashboard },
  { to: "/settings", label: "Settings", icon: Settings },
];

const ROOT_PATHS = ["/", "/mechanic", "/admin", "/settings"];

const pageVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.15, ease: "easeIn" } },
};

const HEADER_TITLES = {
  "/": "Tyre Service · Limuru",
  "/mechanic": "Prince Waiyaki · Mechanic",
  "/admin": "Tex Wambui · Admin",
  "/settings": "Settings",
};

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isRoot = ROOT_PATHS.includes(pathname);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      {/* Sticky top header */}
      <header className="sticky top-0 z-40 bg-gray-900 text-white px-4 flex items-center gap-3 shadow-md" style={{ minHeight: 52 }}>
        {!isRoot && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-amber-400 font-semibold text-sm -ml-1"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-gray-900 font-black text-sm">W</span>
          </div>
          <span className="font-black text-lg tracking-tight">WAIYAKI</span>
        </div>
        <div className="ml-auto text-xs text-gray-400 truncate">
          {HEADER_TITLES[pathname] ?? ""}
        </div>
      </header>

      {/* Page content with preserved scroll per tab */}
      <main className="flex-1 overflow-hidden pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full"
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
              className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 select-none transition-colors ${
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