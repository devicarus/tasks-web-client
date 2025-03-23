import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { useAuth } from "@/providers/authProvider";
import { HeroProvider } from "@/providers/heroProvider";

const RootComponent = () => (
  <HeroProvider>
    <Outlet />
  </HeroProvider>
);

interface RouterContext {
  auth: ReturnType<typeof useAuth>;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

export default rootRoute;
