import { axiosPrivate } from "@/util/axios";
import { Task } from "@/types";

export const fetchTasks = async (): Promise<[Task]> => {
  const response = await axiosPrivate.get("/tasks").catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });

  return response.data;
};

export const patchTask = async (task: Task): Promise<void> => {
  await axiosPrivate.patch(`/tasks/${task.id}`, task).catch((error) => {
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
