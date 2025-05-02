import { useState, useEffect } from "react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useHotkeys } from "react-hotkeys-hook";

import { SHORTCUTS } from "@/core/config/shortcuts";
import { Button } from "@/shared/components/variants/button";
import Task from "@/feature/task/task";
import { title } from "@/shared/components/primitives";
import { appProjectRoute } from "@/feature/project/routes";
import { projectQueryOptions } from "@/feature/project/queries";
import { useAppForm } from "@/shared/hooks/form";
import { deleteProject, updateProjectName } from "@/feature/project/api";
import {
  SolarMenuDotsLinear,
  SolarPenLinear,
  SolarTrashBinTrashLinear,
  SolarUnreadLinear,
} from "@/shared/components/icons";
import { getQueryClient } from "@/shared/query-client";
import { formatShortcut } from "@/shared/util/formatShortcut";

export default function AppProjectPage() {
  const navigate = useNavigate();
  const queryClient = getQueryClient();
  const { projectId } = appProjectRoute.useParams();
  const projectQuery = useSuspenseQuery(projectQueryOptions(projectId));

  const [selected, setSelected] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<boolean>(
    !!projectQuery.data.name,
  );

  const updateProjectNameMutation = useMutation({
    mutationFn: updateProjectName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      navigate({
        to: "/app",
      });
    },
  });

  const projectNameForm = useAppForm({
    defaultValues: {
      name: projectQuery.data.name,
    },
    onSubmit: async ({ value }) => {
      await updateProjectNameMutation.mutateAsync({
        projectId,
        projectName: value.name,
      });
      await projectQuery.refetch();
      setEditingName(false);
    },
  });

  useEffect(() => {
    setEditingName(
      projectQuery.data.name == "" || projectQuery.data.name == undefined,
    );
    projectNameForm.reset();
  }, [projectQuery.data.name]);

  useHotkeys(SHORTCUTS.DELETE_PROJECT, () =>
    deleteProjectMutation.mutateAsync(),
  );
  useHotkeys(SHORTCUTS.EDIT_PROJECT_NAME, () => setEditingName(true));

  return (
    <div className="max-w-md">
      <div
        className={`absolute inset-0 bg-background bg-opacity-50 backdrop-blur-sm transition-all duration-200 ${
          selected ? "opacity-100 z-10" : "opacity-0 -z-10"
        }`}
      />

      <header className="h-[43px]">
        {editingName ? (
          <Form
            className="flex-row items-center"
            onSubmit={(e) => {
              e.preventDefault();
              projectNameForm.handleSubmit();
            }}
          >
            <projectNameForm.AppField name="name">
              {({ Input }) => (
                <Input
                  autoFocus
                  placeholder="Enter Project Name"
                  size="header-sm"
                  variant="plain"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") projectNameForm.handleSubmit();
                  }}
                />
              )}
            </projectNameForm.AppField>
            <Button isIconOnly type="submit" variant="plain">
              <SolarUnreadLinear />
            </Button>
          </Form>
        ) : (
          <div className="fill w-full h-full flex items-center">
            <span className={title({ size: "sm" }) + " mr-auto"}>
              {projectQuery.data?.name}
            </span>
            <Dropdown showArrow>
              <DropdownTrigger>
                <Button isIconOnly variant="plain">
                  <SolarMenuDotsLinear />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown menu with icons"
                variant="faded"
              >
                <DropdownItem
                  key="edit"
                  shortcut={formatShortcut(SHORTCUTS.EDIT_PROJECT_NAME)}
                  startContent={
                    <SolarPenLinear className="text-xl text-default-500 pointer-events-none flex-shrink-0" />
                  }
                  onPress={() => setEditingName(true)}
                >
                  Edit name
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  shortcut={formatShortcut(SHORTCUTS.DELETE_PROJECT)}
                  startContent={
                    <SolarTrashBinTrashLinear className="text-xl pointer-events-none flex-shrink-0 text-danger" />
                  }
                  onPress={() => deleteProjectMutation.mutateAsync()}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </header>
      <Divider className="my-4" />
      <div>
        {projectQuery.data &&
          projectQuery.data.tasks.map((task) => (
            <Task
              key={task.id}
              className={selected == task.id ? "z-20" : "z-0"}
              isOpen={selected == task.id}
              task={task}
              onClose={() => setSelected(null)}
              onDelete={() => {
                projectQuery.refetch();
                setSelected(null);
              }}
              onOpen={() => setSelected(task.id)}
            />
          ))}
      </div>
    </div>
  );
}
