import { Project, ProjectDto } from "@/feature/project/model";
import { mapTaskDtoToModel, mapTaskModelToDto } from "@/feature/task/model";

export const mapProjectDtoToModel = (projectDto: ProjectDto): Project => {
  return {
    id: projectDto.id,
    name: projectDto.name,
    tasks: projectDto.tasks.map(mapTaskDtoToModel),
  };
};

export const mapProjectModelToDto = (project: Project): ProjectDto => {
  return {
    id: project.id,
    name: project.name,
    tasks: project.tasks.map(mapTaskModelToDto),
  };
};
