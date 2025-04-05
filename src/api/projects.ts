import { axiosPrivate } from "@/util/axios";
import { Project } from "@/types";

export const fetchProjects = async (): Promise<[Project]> => {
  const response = await axiosPrivate.get("/projects").catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });

  return response.data;
};

export const createProject = async (): Promise<[Project]> => {
  const response = await axiosPrivate.post("/projects", {}).catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });

  return response.data;
};
