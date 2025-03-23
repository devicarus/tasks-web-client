import { createRoute, redirect } from "@tanstack/react-router";

import AppLayout from "@/layouts/app";
import BlankLayout from "@/layouts/blank";
import LandingPage from "@/pages/landing";
import LoginPage from "@/pages/login";
import rootRoute from "@/routes/root";
import AppHomePage from "@/pages/app/home";
import AppSettingsPage from "@/pages/app/settings";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/app" });
  },
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/landing",
  component: LandingPage,
});

const blankLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "blankLayout",
  component: BlankLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => blankLayout,
  component: LoginPage,
  path: "/login",
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/app",
      });
    }
  },
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: AppLayout,
  path: "/app",
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

const appHomeRoute = createRoute({
  getParentRoute: () => appRoute,
  component: AppHomePage,
  path: "/",
});

const appSettingsRoute = createRoute({
  getParentRoute: () => appRoute,
  component: AppSettingsPage,
  path: "/settings",
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  blankLayout.addChildren([loginRoute]),
  appRoute.addChildren([appHomeRoute, appSettingsRoute]),
  landingRoute,
]);

export default routeTree;
