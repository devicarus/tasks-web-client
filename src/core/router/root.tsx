import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { useAuth } from "@/feature/auth/provider";
import { HeroProvider } from "@/core/providers/heroui";

interface RouterContext {
  auth: ReturnType<typeof useAuth>;
  queryClient: QueryClient;
}

export default createRootRouteWithContext<RouterContext>()({
  component: () => (
    <HeroProvider>
      <Outlet />
    </HeroProvider>
  ),
});
