import { parseDate } from "@internationalized/date";

import { Task, TaskDto } from "@/feature/task/model";

export const mapTaskDtoToModel = (taskDto: TaskDto): Task => {
  return {
    id: taskDto.id,
    name: taskDto.name,
    done: taskDto.done,
    note: taskDto.note,
    dueDate: taskDto.dueDate ? parseDate(taskDto.dueDate) : null,
    deadlineDate: taskDto.deadlineDate ? parseDate(taskDto.deadlineDate) : null,
  };
};

export const mapTaskModelToDto = (task: Task): TaskDto => {
  return {
    id: task.id,
    name: task.name,
    done: task.done,
    note: task.note,
    dueDate: task.dueDate?.toString() || null,
    deadlineDate: task.deadlineDate?.toString() || null,
  };
};
