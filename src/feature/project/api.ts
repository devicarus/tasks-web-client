import { axiosPrivate } from "@/shared/util/axios";
import {
  Project,
  ProjectBrief,
  mapProjectDtoToModel,
} from "@/feature/project/model";

export const fetchProjects = async (): Promise<[ProjectBrief]> => {
  const response = await axiosPrivate.get("/projects").catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });

  return response.data;
};

export const createProject = async (): Promise<void> => {
  await axiosPrivate.post("/projects", {}).catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });
};

export const fetchProject = async (id: number): Promise<Project> => {
  const response = await axiosPrivate.get(`/projects/${id}`).catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });

  return mapProjectDtoToModel(response.data);
};
