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
import { useAppForm } from "@/shared/hooks/useFormTools";
import { getQueryClient } from "@/shared/query-client";
import { Button } from "@/shared/components/variants/button";
import { title } from "@/shared/components/primitives";
import {
  SolarMenuDotsLinear,
  SolarPenLinear,
  SolarTrashBinTrashLinear,
  SolarUnreadLinear,
} from "@/shared/components/icons";
import { formatShortcut } from "@/shared/util/formatShortcut";
import { appProjectRoute } from "@/feature/project/routes";
import { projectQueryOptions } from "@/feature/project/queries";
import {
  createProjectTask,
  deleteProject,
  updateProjectName,
} from "@/feature/project/api";
import TaskView from "@/feature/task/components/TaskView";

export default function AppProjectPage() {
  const navigate = useNavigate();
  const queryClient = getQueryClient();
  const { projectId } = appProjectRoute.useParams();
  const projectQuery = useSuspenseQuery(projectQueryOptions(projectId));

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

  const createProjectTaskMutation = useMutation({
    mutationFn: () => createProjectTask(projectId),
    onSuccess: () => projectQuery.refetch(),
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
      <TaskView
        tasks={projectQuery.data.tasks}
        onAdd={() => createProjectTaskMutation.mutateAsync()}
        onDelete={() => projectQuery.refetch()}
      />
    </div>
  );
}
