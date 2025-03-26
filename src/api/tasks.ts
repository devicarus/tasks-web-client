import { parseDate } from "@internationalized/date";

import { axiosPrivate } from "@/util/axios";
import { TaskDto, Task } from "@/types";

export const fetchTasks = async (): Promise<[Task]> => {
  const response = await axiosPrivate.get("/tasks").catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });

  const tasks: [Task] = response.data.map((task: TaskDto) => ({
    ...task,
    dueDate: task.dueDate ? parseDate(task.dueDate) : null,
    deadlineDate: task.deadlineDate ? parseDate(task.deadlineDate) : null,
  }));

  return tasks;
};

export const patchTask = async (task: Task): Promise<void> => {
  const taskDto: TaskDto = {
    ...task,
    dueDate: task.dueDate?.toString(),
    deadlineDate: task.deadlineDate?.toString(),
  };

  await axiosPrivate.patch(`/tasks/${task.id}`, taskDto).catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });
};

export const createTask = async (): Promise<Task> => {
  const response = await axiosPrivate.post("/tasks", {}).catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });

  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axiosPrivate.delete(`/tasks/${id}`).catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });
};
