import { Outlet, useLocation } from "@tanstack/react-router";
import { useMediaQuery } from "react-responsive";

import Sidebar from "@/shared/components/layout/sidebar";

function DesktopLayout() {
  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar className="border-r-small border-divider w-72" />
      <main className="p-4 mx-auto max-w-7xl px-6 flex-grow pt-16 max-h-screen overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}

function MobileLayout() {
  const location = useLocation();
  const isOnHome = location.pathname === "/app";

  return isOnHome ? (
    <Sidebar />
  ) : (
    <main className="p-4 mx-auto max-w-7xl px-6 flex-grow pt-16 max-h-screen overflow-y-scroll">
      <Outlet />
    </main>
  );
}

export default function AppLayout() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return isDesktop ? <DesktopLayout /> : <MobileLayout />;
}
