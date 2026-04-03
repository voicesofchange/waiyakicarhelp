import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PAGE_TITLES = {
  "/":         "Waiyaki",
  "/mechanic": "Mechanic Portal",
  "/admin":    "Admin Dashboard",
  "/settings": "Settings",
};

const STEP_TITLES = {
  form:     "Book a Service",
  tracking: "Track Your Job",
};

export default function NavigationHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const step = searchParams.get("step");

  // Determine title
  const title = (step && STEP_TITLES[step]) || PAGE_TITLES[pathname] || "Waiyaki";

  // Show back button when there's a step param, or when not on a root tab
  const showBack = !!step || !Object.keys(PAGE_TITLES).includes(pathname);

  if (!showBack) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-background border-b border-border">
      <button
        onClick={() => navigate(-1)}
        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </button>
      <span className="font-bold text-foreground text-base">{title}</span>
    </div>
  );
}