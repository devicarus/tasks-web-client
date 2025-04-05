import { createRoute, redirect } from "@tanstack/react-router";

import rootRoute from "@/routes/root";
import AppLayout from "@/shared/layouts/app";
import BlankLayout from "@/shared/layouts/blank";
import LoginPage from "@/feature/auth/pages/login";
import AppTodayPage from "@/feature/task/pages/today";
import AppProjectPage from "@/feature/project/page";

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
  component: AppTodayPage,
  path: "/",
});

const appProjectRoute = createRoute({
  getParentRoute: () => appRoute,
  component: AppProjectPage,
  path: "/project/$id",
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  blankLayout.addChildren([loginRoute]),
  appRoute.addChildren([appHomeRoute, appProjectRoute]),
]);

export default routeTree;
