import { TaskDto } from "@/feature/task/model";

export type ProjectDto = {
  id: number;
  name: string;
  tasks: TaskDto[];
};

export type ProjectBriefDto = {
  id: number;
  name: string;
};
