import { createRoute } from "@tanstack/react-router";

import AppProjectPage from "@/feature/project/pages/project";
import { appRoute } from "@/core/router";
import { projectQueryOptions } from "@/feature/project/queries";
import { formatTitle } from "@/shared/util/formatTitle";

export const appProjectRoute = createRoute({
  getParentRoute: () => appRoute,
  component: AppProjectPage,
  path: "/project/$projectId",
  loader: ({ context: { queryClient }, params: { projectId } }) =>
    queryClient.ensureQueryData(projectQueryOptions(projectId)),
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: formatTitle(loaderData.name) }] : undefined,
  }),
});
