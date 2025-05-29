import { useEffect } from "react";
import { Form } from "@heroui/form";
import { useStore } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { today, getLocalTimeZone } from "@internationalized/date";

import {
  SolarCalendarLinear as CalendarIcon,
  SolarFlagLinear as FlagIcon,
  SolarFlagBold as FlagIconFilled,
  SolarCloseSquareBold as CloseIcon,
} from "@/shared/components/icons";
import { Task as TaskModel } from "@/feature/task/model";
import { updateTask, deleteTask } from "@/feature/task/api";
import { withForm, useAppForm } from "@/shared/hooks/useFormTools";
import { formatDate } from "@/shared/util";

type TaskProps = {
  task: TaskModel;
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
    onSubmit: ({ value }) => patchMutation.mutateAsync(value),
  });

  const patchMutation = useMutation({
    mutationFn: updateTask,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => onDelete?.(),
  });

  useEffect(() => {
    if (!form.state.isPristine) form.handleSubmit();
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
          onClose?.();
        }}
      >
        <TaskHeader
          form={form}
          isOpen={isOpen}
          onDelete={() => deleteMutation.mutateAsync(task.id)}
        />
        <div
          className={`w-full transition-all duration-200
            ${isOpen ? "max-h-96 opacity-100 ease-in" : "max-h-0 opacity-0"}`}
        >
          {isOpen && <TaskBody form={form} />}
        </div>
      </Form>
    </div>
  );
}

const TaskHeader = withForm({
  defaultValues: {} as TaskModel,
  props: {
    isOpen: false,
    onDelete: () => {},
  },
  render: function Render({ form, isOpen, onDelete }) {
    return (
      <div
        className={`flex items-center w-full px-2 h-10 ${isOpen ? "" : "cursor-pointer"}`}
      >
        <form.AppField name="done">
          {({ Checkbox }) => <Checkbox className="-mr-1 pr-0" />}
        </form.AppField>
        {isOpen ? (
          <form.AppField name="name">
            {({ Input, state }) => (
              <Input
                autoFocusOnEmpty
                placeholder="New To-Do"
                size="sm"
                variant="plain"
                onKeyDown={(e) => {
                  if (e.code === "Backspace" && !state.value) onDelete();
                }}
              />
            )}
          </form.AppField>
        ) : (
          <>
            <form.Subscribe selector={(state) => state.values.done}>
              {(done) => (
                <span
                  className={`ml-2 truncate ${done ? "line-through text-default-400" : ""} ${form.state.values.name ? "" : "text-default-400"}`}
                >
                  {form.state.values.name || "New To-Do"}
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
                    {deadlineDate!.compare(today(getLocalTimeZone()))}d left
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
  defaultValues: {} as TaskModel,
  render: function Render({ form }) {
    return (
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col gap-2 p-2">
          {form.state.values.dueDate && (
            <form.AppField name="dueDate">
              {({ PopoverCalendar, state, setValue }) => (
                <div className="flex flex-row gap-[2px]">
                  <PopoverCalendar
                    buttonContent={
                      <>
                        <CalendarIcon size={18} /> {formatDate(state.value!)}
                      </>
                    }
                    classNames={{
                      button: "rounded-none rounded-l-lg",
                    }}
                  />
                  <Button
                    isIconOnly
                    className="rounded-none rounded-r-lg "
                    size="sm"
                    onPress={() => setValue(null)}
                  >
                    <CloseIcon className="opacity-70" size={18} />
                  </Button>
                </div>
              )}
            </form.AppField>
          )}
          {form.state.values.deadlineDate && (
            <form.AppField name="deadlineDate">
              {({ PopoverCalendar, state, setValue }) => (
                <div className="flex flex-row gap-[2px]">
                  <PopoverCalendar
                    buttonContent={
                      <>
                        <FlagIconFilled size={18} /> {formatDate(state.value!)}
                      </>
                    }
                    classNames={{
                      button: "rounded-none rounded-l-lg",
                    }}
                  />
                  <Button
                    isIconOnly
                    className="rounded-none rounded-r-lg "
                    size="sm"
                    onPress={() => setValue(null)}
                  >
                    <CloseIcon className="opacity-70" size={18} />
                  </Button>
                </div>
              )}
            </form.AppField>
          )}
        </div>
        <div className="flex items-end">
          {!form.state.values.dueDate && (
            <form.AppField name="dueDate">
              {({ PopoverCalendar }) => (
                <PopoverCalendar
                  buttonContent={<CalendarIcon size={18} />}
                  classNames={{ button: "bg-transparent" }}
                />
              )}
            </form.AppField>
          )}
          {!form.state.values.deadlineDate && (
            <form.AppField name="deadlineDate">
              {({ PopoverCalendar }) => (
                <PopoverCalendar
                  buttonContent={<FlagIcon size={18} />}
                  classNames={{ button: "bg-transparent" }}
                />
              )}
            </form.AppField>
          )}
        </div>
      </div>
    );
  },
});
