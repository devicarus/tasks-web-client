import { axiosPrivate } from "@/shared/util/axios";
import {
  Project,
  ProjectBrief,
  ProjectDto,
  mapProjectDtoToModel,
  mapProjectModelToDto,
} from "@/feature/project/model";

export const fetchProjects = async (): Promise<[ProjectBrief]> => {
  const response = await axiosPrivate
    .get<[ProjectBrief]>("/projects")
    .catch((error) => {
      throw new Error(error?.response?.data?.error || "An error occurred");
    });

  return response.data;
};

export const createProject = async (): Promise<Project> => {
  const response = await axiosPrivate.post("/projects", {}).catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });

  return response.data;
};

export const fetchProject = async (projectId: string): Promise<Project> => {
  const response = await axiosPrivate
    .get<ProjectDto>(`/projects/${projectId}`)
    .catch((error) => {
      throw new Error(error?.response?.data?.error || "An error occurred");
    });

  return mapProjectDtoToModel(response.data);
};

export const updateProject = async (project: Project): Promise<void> => {
  const projectDto: ProjectDto = mapProjectModelToDto(project);

  await axiosPrivate
    .put(`/projects/${project.id}`, projectDto)
    .catch((error) => {
      throw new Error(error?.response?.data?.error || "An error occurred");
    });
};

export const updateProjectName = async ({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}): Promise<void> => {
  await axiosPrivate
    .patch(`/projects/${projectId}`, { name: projectName })
    .catch((error) => {
      throw new Error(error?.response?.data?.error || "An error occurred");
    });
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await axiosPrivate.delete(`/projects/${projectId}`).catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });
};
