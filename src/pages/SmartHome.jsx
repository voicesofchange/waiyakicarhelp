import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";
import Home from "./Home";
import MechanicDashboard from "./MechanicDashboard";
import AdminDashboard from "./AdminDashboard";

export default function SmartHome() {
  const [user, setUser] = useState(undefined); // undefined = loading

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

  if (!user) return <Home />;
  if (user.role === "admin") return <AdminDashboard />;
  return <MechanicDashboard />;
}