import { useState } from "react";
import { Button } from "@heroui/button";

import TaskComponent from "@/feature/task/task";
import { SolarAddCircleBold } from "@/shared/components/icons";
import { Task } from "@/feature/task/model";

interface TaskViewProps {
  tasks: Task[];
  onAdd: () => Promise<Task>;
  onDelete: Function;
}

export default function TaskView({ tasks, onAdd, onDelete }: TaskViewProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div
        className={`absolute inset-0 bg-background bg-opacity-50 backdrop-blur-sm transition-all duration-200 ${
          selected ? "opacity-100 z-10" : "opacity-0 -z-10"
        }`}
      />

      <div className="max-w-md">
        {tasks.map((task) => (
          <TaskComponent
            key={task.id}
            className={selected == task.id ? "z-20" : "z-0"}
            isOpen={selected == task.id}
            task={task}
            onClose={() => setSelected(null)}
            onDelete={() => {
              onDelete();
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
        onPress={async () => setSelected((await onAdd()).id)}
      >
        <SolarAddCircleBold size={48} />
      </Button>
    </>
  );
}
