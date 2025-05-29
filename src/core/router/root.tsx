import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { useAuth } from "@/shared/hooks/useAuth";
import { HeroUIProvider } from "@/core/providers/HeroUIProvider";
import { formatTitle } from "@/shared/util/formatTitle";

interface RouterContext {
  auth: ReturnType<typeof useAuth>;
  queryClient: QueryClient;
}

export default createRootRouteWithContext<RouterContext>()({
  component: () => (
    <HeroUIProvider>
      <HeadContent />
      <Outlet />
    </HeroUIProvider>
  ),
  head: () => ({ meta: [{ title: formatTitle() }] }),
});
