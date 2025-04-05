import { Task } from "@/feature/task/model";

export type ProjectBrief = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  name: string;
  tasks: Task[];
};
