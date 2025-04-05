import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@heroui/button";

import Task from "@/components/task";
import { fetchTasks, createTask } from "@/api/tasks";
import { SolarAddCircleBold } from "@/components/icons";

export default function AppProjectPage() {
  const [selected, setSelected] = useState<number | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });

  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: ({ id }) => {
      setSelected(id);
      refetch();
    },
  });

  return (
    <>
      <div
        className={`absolute inset-0 bg-background bg-opacity-50 backdrop-blur-sm transition-all duration-200 ${
          selected ? "opacity-100 z-10" : "opacity-0 -z-10"
        }`}
      />

      <div className="max-w-md">
        {data &&
          data.map((task) => (
            <Task
              key={task.id}
              className={selected == task.id ? "z-20" : "z-0"}
              isOpen={selected == task.id}
              task={task}
              onClose={() => setSelected(null)}
              onDelete={() => {
                refetch();
                setSelected(null);
              }}
              onOpen={() => setSelected(task.id)}
            />
          ))}
      </div>

      <Button
        isIconOnly
        className="absolute bottom-16 right-16 text-primary bg-transparent"
        size="lg"
        onPress={() => mutate()}
      >
        <SolarAddCircleBold size={48} />
      </Button>
    </>
  );
}
