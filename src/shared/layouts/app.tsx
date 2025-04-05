import { Outlet } from "@tanstack/react-router";

import Sidebar from "@/shared/components/layout/sidebar";

export default function AppLayout() {
  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar />
      <main className="p-4 mx-auto max-w-7xl px-6 flex-grow pt-16 max-h-screen overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}
