import { CalendarDate } from "@internationalized/date";

export type Credentials = {
  username: string;
  password: string;
};

export type TaskDto = {
  id: number;
  name: string;
  done: boolean;
  note: string;
  dueDate: string | null;
  deadlineDate: string | null;
};

export type Task = {
  id: number;
  name: string;
  done: boolean;
  note: string;
  dueDate: CalendarDate | null;
  deadlineDate: CalendarDate | null;
};

export type Project = {
  id: number;
  name: string;
};
