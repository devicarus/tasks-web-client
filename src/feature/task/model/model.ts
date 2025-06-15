import { CalendarDate } from "@internationalized/date";

import { ProjectBriefDto } from "@/feature/project/model";

export interface Task {
  id: number;
  name: string;
  done: boolean;
  note: string;
  dueDate: CalendarDate | null;
  deadlineDate: CalendarDate | null;
  project: ProjectBriefDto | null;
}
