import { useEffect } from "react";
import { Checkbox } from "@heroui/checkbox";
import { Form } from "@heroui/form";
import { useStore } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { today, getLocalTimeZone } from "@internationalized/date";

import {
  SolarCalendarLinear as CalendarIcon,
  SolarFlagLinear as FlagIcon,
  SolarFlagBold as FlagIconFilled,
} from "@/components/icons";
import PopoverCalendar from "@/components/popover-calendar";
import { Task as TaskType } from "@/types";
import { patchTask, deleteTask } from "@/api/tasks";
import { withForm, useAppForm } from "@/hooks/form";

type TaskProps = {
  task: TaskType;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onDelete?: () => void;
  className?: string | undefined;
};

export default function Task({
  task,
  isOpen = false,
  onClose,
  onOpen,
  onDelete,
  className = "",
}: TaskProps) {
  const form = useAppForm({
    defaultValues: task,
    onSubmit: () => onClose?.(),
  });

  const patchMutation = useMutation({
    mutationFn: patchTask,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => onDelete?.(),
  });

  useEffect(() => {
    patchMutation.mutateAsync(form.state.values);
  }, [useStore(form.store, ({ values }) => values)]);

  return (
    <div
      className={`cursor-auto transition-all duration-200 relative hover:bg-default-100 hover:shadow-lg rounded-xl ${className} 
        ${isOpen ? "bg-default-100 shadow-lg" : ""}`}
      id={`task-${task.id}`}
      role="button"
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onClose?.();
      }}
      onClick={() => onOpen?.()}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen?.();
        if (e.key === "Escape") onClose?.();
      }}
    >
      <Form
        className="flex-col gap-0"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <TaskHeader
          form={form}
          isOpen={isOpen}
          onDelete={() => deleteMutation.mutateAsync(task.id)}
        />
        <div
          className={`w-full overflow-hidden transition-all duration-200 
            ${isOpen ? "max-h-96 opacity-100 ease-in" : "max-h-0 opacity-0"}`}
        >
          {isOpen && <TaskBody form={form} />}
        </div>
      </Form>
    </div>
  );
}

const TaskHeader = withForm({
  defaultValues: {} as TaskType,
  props: {
    isOpen: false,
    onDelete: () => {},
  },
  render: function Render({ form, isOpen, onDelete }) {
    return (
      <div
        className={`flex items-center w-full px-2 h-10 ${isOpen ? "" : "cursor-pointer"}`}
      >
        <form.Field name="done">
          {({ state, handleChange, handleBlur }) => (
            <Checkbox
              className="-mr-1 pr-0"
              isSelected={state.value}
              onBlur={handleBlur}
              onValueChange={(checked) => handleChange(checked)}
            />
          )}
        </form.Field>
        {isOpen ? (
          <form.Field name="name">
            {({ state, handleChange, handleBlur }) => (
              <Input
                autoFocus={state.value == ""}
                classNames={{
                  inputWrapper:
                    "bg-transparent shadow-none data-[hover=true]:bg-transparent",
                  input: "text-base",
                }}
                defaultValue={state.value}
                placeholder="New To-Do"
                size="sm"
                type="name"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.code === "Backspace" && state.value == "") onDelete();
                }}
              />
            )}
          </form.Field>
        ) : (
          <>
            <form.Subscribe selector={(state) => state.values.done}>
              {(done) => (
                <span
                  className={`ml-2 truncate ${done ? "line-through text-default-400" : ""}`}
                >
                  {form.state.values.name}
                </span>
              )}
            </form.Subscribe>
            {form.state.values.deadlineDate && (
              <form.Subscribe selector={(state) => state.values.deadlineDate}>
                {(deadlineDate) => (
                  <Chip
                    className="ml-auto"
                    color="danger"
                    startContent={<FlagIconFilled size={18} />}
                    variant="flat"
                  >
                    {deadlineDate.compare(today(getLocalTimeZone()))}d left
                  </Chip>
                )}
              </form.Subscribe>
            )}
          </>
        )}
      </div>
    );
  },
});

const TaskBody = withForm({
  defaultValues: {} as TaskType,
  render: function Render({ form }) {
    return (
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col gap-2 pl-2 pb-2">
          <form.Subscribe selector={(state) => state.values.dueDate}>
            {(dueDate) =>
              dueDate ? (
                <Chip radius="sm" startContent={<CalendarIcon size={18} />}>
                  {dueDate.day}. {dueDate.month}.
                </Chip>
              ) : null
            }
          </form.Subscribe>
          <form.Subscribe selector={(state) => state.values.deadlineDate}>
            {(deadlineDate) =>
              deadlineDate ? (
                <Chip radius="sm" startContent={<FlagIconFilled size={18} />}>
                  {deadlineDate.day}. {deadlineDate.month}.
                </Chip>
              ) : null
            }
          </form.Subscribe>
        </div>
        <div className="flex items-end">
          <form.Field name="dueDate">
            {({ state, handleChange }) => (
              <PopoverCalendar
                defaultValue={state.value}
                trigger={<CalendarIcon size={18} />}
                onChange={(value) => handleChange(value)}
              />
            )}
          </form.Field>
          <form.Field name="deadlineDate">
            {({ state, handleChange }) => (
              <PopoverCalendar
                defaultValue={state.value}
                trigger={<FlagIcon size={18} />}
                onChange={(value) => handleChange(value)}
              />
            )}
          </form.Field>
        </div>
      </div>
    );
  },
});
