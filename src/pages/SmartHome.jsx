import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, User, Wrench, ShieldCheck } from "lucide-react";
import Home from "./Home";
import MechanicDashboard from "./MechanicDashboard";
import AdminDashboard from "./AdminDashboard";

const TABS = [
  { id: "customer", label: "Customer", icon: User, component: Home },
  { id: "mechanic", label: "Mechanic", icon: Wrench, component: MechanicDashboard },
  { id: "admin", label: "Admin", icon: ShieldCheck, component: AdminDashboard },
];

export default function SmartHome() {
  const [user, setUser] = useState(undefined);
  const [activeTab, setActiveTab] = useState(null); // null = auto-detect

  useEffect(() => {
    base44.auth.me()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  if (user === undefined) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  // Determine which tab to show
  const defaultTab = !user ? "customer" : user.role === "admin" ? "admin" : "mechanic";
  const currentTab = activeTab || defaultTab;
  const CurrentComponent = TABS.find(t => t.id === currentTab)?.component || Home;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto pb-16">
        <CurrentComponent />
      </div>

      {/* Bottom nav — only show for logged-in users so public customers aren't confused */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F1C2E] border-t border-white/10 flex">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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