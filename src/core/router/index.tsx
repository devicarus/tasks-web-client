import { createRoute, redirect } from "@tanstack/react-router";

import rootRoute from "@/core/router/root";
import AppLayout from "@/shared/layouts/app";
import BlankLayout from "@/shared/layouts/blank";
import { loginRoute } from "@/feature/auth/routes";
import { appProjectRoute } from "@/feature/project/routes";
import {
  appTodayRoute,
  appUpcommingRoute,
  appAnytimeRoute,
} from "@/feature/task/routes";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/app" });
  },
});

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authRoute",
  component: BlankLayout,
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute.addChildren([loginRoute]),
  appRoute.addChildren([
    appTodayRoute,
    appUpcommingRoute,
    appAnytimeRoute,
    appProjectRoute,
  ]),
]);

export default routeTree;
