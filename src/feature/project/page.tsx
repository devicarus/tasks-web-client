import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

import Task from "@/feature/task/task";
import { fetchProject } from "@/feature/project/api";

export default function AppProjectPage() {
  const { id } = useParams({ strict: false });

  const [selected, setSelected] = useState<number | null>(null);

  const { data, refetch } = useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProject(id),
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
          data.tasks.map((task) => (
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
    </>
  );
}
