import { useEffect } from "react";
import { Checkbox } from "@heroui/checkbox";
import { Form } from "@heroui/form";
import { useForm, useStore } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@heroui/input";

import {
  SolarCalendarLinear as CalendarIcon,
  SolarFlagLinear as FlagIcon,
} from "@/components/icons";
import PopoverCalendar from "@/components/popover-calendar";
import { Task as TaskType } from "@/types";
import { patchTask, deleteTask } from "@/api/tasks";

type TaskProps = {
  task: TaskType;
  selection?: number | null;
  onSelectionChange?: React.Dispatch<React.SetStateAction<number | null>>;
  onDelete?: () => void;
  className?: string | undefined;
};

export default function Task({
  task,
  selection,
  onSelectionChange = () => {},
  onDelete = () => {},
  className = "",
}: TaskProps) {
  const { Field, Subscribe, state, store, handleSubmit } = useForm({
    defaultValues: task,
    onSubmit: () => onSelectionChange(null),
  });

  const patchMutation = useMutation({
    mutationFn: patchTask,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      onDelete();
      onSelectionChange(null);
    },
  });

  useEffect(() => {
    patchMutation.mutateAsync(state.values);
  }, [useStore(store, ({ values }) => values)]);

  return (
    <div
      className={`transition-all duration-200 relative hover:bg-default-100 hover:shadow-lg rounded-xl ${className} ${selection == task.id ? "bg-default-100 shadow-lg" : ""}`}
      id={`task-${task.id}`}
      role="button"
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onSelectionChange(null);
      }}
      onClick={() => onSelectionChange(task.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelectionChange(task.id);
        if (e.key === "Escape") onSelectionChange(null);
      }}
    >
      <Form
        className="flex-col gap-0"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="cursor-pointer flex flex-row w-full p-2">
          <Field name="done">
            {({ state, handleChange, handleBlur }) => (
              <Checkbox
                className="-mr-1 pr-0"
                isSelected={state.value}
                onBlur={handleBlur}
                onValueChange={(checked) => handleChange(checked)}
              />
            )}
          </Field>
          {selection == task.id ? (
            <Field name="name">
              {({ state, handleChange, handleBlur }) => (
                <Input
                  autoFocus={state.value == ""}
                  classNames={{
                    inputWrapper:
                      "bg-transparent shadow-none data-[hover=true]:bg-transparent -my-1",
                    input: "text-base",
                  }}
                  defaultValue={state.value}
                  placeholder="New To-Do"
                  size="sm"
                  type="name"
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.code === "Backspace" && state.value == "")
                      deleteMutation.mutateAsync(task.id);
                  }}
                />
              )}
            </Field>
          ) : (
            <Subscribe selector={(state) => state.values.done}>
              {(done) => (
                <span
                  className={`my-auto ml-2 ${done ? "line-through text-default-400" : ""}`}
                >
                  {state.values.name}
                </span>
              )}
            </Subscribe>
          )}
        </div>
        {selection == task.id && (
          <div className="w-full">
            <div className="flex justify-end">
              <PopoverCalendar
                icon={CalendarIcon}
              />
              <PopoverCalendar
                icon={FlagIcon}
              />
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
