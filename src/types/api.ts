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
  dueDate: string;
  deadlineDate: string;
};

export type Task = {
  id: number;
  name: string;
  done: boolean;
  note: string;
  dueDate: CalendarDate;
  deadlineDate: CalendarDate;
};
