import { Link, useLocation, Outlet } from "react-router-dom";
import { Home, Wrench, LayoutDashboard } from "lucide-react";

const navItems = [
  { to: "/", label: "Request Help", icon: Home },
  { to: "/mechanic", label: "Mechanic", icon: Wrench },
  { to: "/admin", label: "Admin", icon: LayoutDashboard },
];

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Top nav */}
      <header className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-gray-900 font-black text-sm">W</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Waiyaki</span>
        </div>
        <nav className="flex gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-amber-500 text-gray-900"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}