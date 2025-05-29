import { createRoute, redirect } from "@tanstack/react-router";

import { authRoute } from "@/core/router";
import LoginPage from "@/feature/auth/pages/login";
import { formatTitle } from "@/shared/util/formatTitle";

export const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  component: LoginPage,
  path: "/login",
  head: () => ({ meta: [{ title: formatTitle("Login") }] }),
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
