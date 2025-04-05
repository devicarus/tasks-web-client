import { TaskDto, Task, mapTaskDtoToModel, mapTaskModelToDto } from "./model";

import { axiosPrivate } from "@/shared/util/axios";

export const fetchTasks = async (
  sortBy?: string,
  sortDir?: string,
  filter?: string,
): Promise<[Task]> => {
  let query = "/tasks";

  if (sortBy || sortDir || filter) {
    const queryParams = new URLSearchParams();

    if (sortBy) queryParams.append("sortBy", sortBy);
    if (sortDir) queryParams.append("sortDir", sortDir);
    if (filter) queryParams.append("filter", filter);

    query += `?${queryParams.toString()}`;
  }

  const response = await axiosPrivate.get(query).catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });

  return response.data.map(mapTaskDtoToModel);
};

export const updateTask = async (task: Task): Promise<void> => {
  const taskDto: TaskDto = mapTaskModelToDto(task);

  await axiosPrivate.put(`/tasks/${task.id}`, taskDto).catch((error) => {
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
