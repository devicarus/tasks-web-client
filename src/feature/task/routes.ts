import { createRoute } from "@tanstack/react-router";

import { appRoute } from "@/core/router";
import AppTodayPage from "@/feature/task/pages/today";
import AppUpcommingPage from "@/feature/task/pages/upcomming";
import AppAnytimePage from "@/feature/task/pages/anytime";
import { formatTitle } from "@/shared/util/formatTitle";

export const appTodayRoute = createRoute({
  getParentRoute: () => appRoute,
  component: AppTodayPage,
  path: "/",
  head: () => ({ meta: [{ title: formatTitle("Today") }] }),
});

export const appUpcommingRoute = createRoute({
  getParentRoute: () => appRoute,
  component: AppUpcommingPage,
  path: "/upcomming",
  head: () => ({ meta: [{ title: formatTitle("Upcomming") }] }),
});

export const appAnytimeRoute = createRoute({
  getParentRoute: () => appRoute,
  component: AppAnytimePage,
  path: "/anytime",
  head: () => ({ meta: [{ title: formatTitle("Anytime") }] }),
});
