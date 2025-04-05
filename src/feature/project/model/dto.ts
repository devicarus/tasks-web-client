import { TaskDto } from "@/feature/task/model";

export type ProjectDto = {
  id: number;
  name: string;
  tasks: TaskDto[];
};
