import { Outlet } from "react-router-dom";
import NavigationHeader from "./NavigationHeader";

export default function Layout() {
  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <Outlet />
    </div>
  );
}