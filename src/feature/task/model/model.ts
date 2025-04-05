import { CalendarDate } from "@internationalized/date";

export interface Task {
  id: number;
  name: string;
  done: boolean;
  note: string;
  dueDate: CalendarDate | null;
  deadlineDate: CalendarDate | null;
}
