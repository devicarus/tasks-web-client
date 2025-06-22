import { useQuery, useMutation } from "@tanstack/react-query";
import { Spinner } from "@heroui/spinner";

import { fetchTasks, createTask } from "@/feature/task/api";
import { CreateTaskDto } from "@/feature/task/model";
import TaskView from "@/feature/task/components/TaskView";

interface SmartTaskViewProps {
  filter?: string;
  filterTemplate?: CreateTaskDto;
}

export default function SmartTaskView({
  filter,
  filterTemplate,
}: SmartTaskViewProps) {
  const tasksQuery = useQuery({
    queryKey: [
      "tasks",
      {
        filter: filter || "",
        sortBy: "deadlineDate",
        sortOrder: "asc",
      },
    ],
    queryFn: () => fetchTasks("deadlineDate", "asc", filter),
  });

  const createTaskMutation = useMutation({
    mutationFn: () => createTask(filterTemplate),
    onSuccess: () => tasksQuery.refetch(),
  });

  return tasksQuery.isFetched ? (
    <TaskView
      tasks={tasksQuery.data || []}
      onAdd={async () => await createTaskMutation.mutateAsync()}
      onDelete={() => tasksQuery.refetch()}
    />
  ) : (
    <Spinner className="absolute left-1/2 top-1/2" size="lg" />
  );
}
