import { useQuery, useMutation } from "@tanstack/react-query";

import { fetchTasks, createTask } from "@/feature/task/api";
import { CreateTaskDto } from "@/feature/task/model";
import TaskView from "@/feature/task/task-view";

interface SmartTaskViewProps {
  filter?: string;
  filterTemplate?: CreateTaskDto;
}

export default function SmartTaskView({
  filter,
  filterTemplate,
}: SmartTaskViewProps) {
  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks("deadlineDate", "asc", filter),
  });

  const createTaskMutation = useMutation({
    mutationFn: () => createTask(filterTemplate),
    onSuccess: () => tasksQuery.refetch(),
  });

  return (
    <TaskView
      tasks={tasksQuery.data || []}
      onAdd={async () => await createTaskMutation.mutateAsync()}
      onDelete={() => tasksQuery.refetch()}
    />
  );
}
