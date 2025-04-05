import { Outlet } from "@tanstack/react-router";

import { ThemeSwitch } from "@/shared/components/theme-switch";

export default function DefaultLayout() {
  return (
    <div className="relative flex flex-col h-screen">
      <ThemeSwitch className="absolute top-6 right-6 z-20" />
      <main className="container mx-auto max-w-7xl p-4 flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
