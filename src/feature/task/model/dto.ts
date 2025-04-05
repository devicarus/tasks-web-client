export interface TaskDto {
  id: number;
  name: string;
  done: boolean;
  note: string;
  dueDate: string | null;
  deadlineDate: string | null;
}
