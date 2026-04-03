import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Loader2, User, Wrench, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./Home";
import MechanicDashboard from "./MechanicDashboard";
import AdminDashboard from "./AdminDashboard";

const TABS = [
  { id: "customer", path: "/",         label: "Customer",  icon: User,        component: Home },
  { id: "mechanic", path: "/mechanic", label: "Mechanic",  icon: Wrench,      component: MechanicDashboard },
  { id: "admin",    path: "/admin",    label: "Admin",     icon: ShieldCheck, component: AdminDashboard },
];

export default function SmartHome() {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  if (user === undefined) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  const currentTab = TABS.find(t => t.path === pathname) || TABS[0];
  const CurrentComponent = currentTab.component;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {user && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F1C2E] border-t border-white/10 flex pb-[env(safe-area-inset-bottom)]">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = currentTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`flex-1 flex flex-col items-center py-2.5 gap-1 transition-colors ${
                  active ? "text-amber-400" : "text-gray-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}