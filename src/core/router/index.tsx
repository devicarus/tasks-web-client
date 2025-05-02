import { createRoute, redirect } from "@tanstack/react-router";

import rootRoute from "@/core/router/root";
import AppLayout from "@/shared/layouts/app";
import BlankLayout from "@/shared/layouts/blank";
import LoginPage from "@/feature/auth/pages/login";
import AppTodayPage from "@/feature/task/pages/today";
import { appProjectRoute } from "@/feature/project/routes";
import AppAnytimePage from "@/feature/task/pages/anytime";
import AppUpcommingPage from "@/feature/task/pages/upcomming";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/app" });
  },
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
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: search.redirect ?? "/app",
      });
    }
  },
  validateSearch: (search: { redirect?: string }) => {
    return {
      redirect: search.redirect,
    };
  },
});

export const appRoute = createRoute({
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
  component: AppTodayPage,
  path: "/",
});

const appUpcommingRoute = createRoute({
  getParentRoute: () => appRoute,
  component: AppUpcommingPage,
  path: "/upcomming",
});

const appAnytimeRoute = createRoute({
  getParentRoute: () => appRoute,
  component: AppAnytimePage,
  path: "/anytime",
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  blankLayout.addChildren([loginRoute]),
  appRoute.addChildren([
    appHomeRoute,
    appUpcommingRoute,
    appAnytimeRoute,
    appProjectRoute,
  ]),
]);

export default routeTree;
