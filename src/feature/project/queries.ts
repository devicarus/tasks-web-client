import { queryOptions } from "@tanstack/react-query";

import { fetchProject } from "@/feature/project/api";

export const projectQueryOptions = (projectId: string) =>
  queryOptions({
    queryKey: ["project", { projectId }],
    queryFn: () => fetchProject(projectId),
  });
