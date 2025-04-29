import { Button } from "@heroui/button";
import { useRouterState, Link } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  Logo,
  SolarCalendarDateLinear as TodayIcon,
  SolarWidget2Linear as ProjectsIcon,
  SolarSettingsLinear as SettingsIcon,
  SolarAddCircleBold as AddIcon,
} from "@/shared/components/icons";
import { ThemeSwitch } from "@/shared/components/theme-switch";
import { fetchProjects, createProject } from "@/feature/project/api";

type SidebarLinkProps = {
  href: string;
  startContent: React.ReactNode;
  label: string;
  isActive?: boolean | undefined;
};

function SidebarLink({
  href,
  startContent,
  label,
  isActive,
}: SidebarLinkProps) {
  return (
    <Link
      className={
        "flex gap-2 items-center justify-between relative py-1.5 w-full box-border subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none px-3 min-h-11 rounded-large h-[44px] " +
        (isActive
          ? "bg-default-100 opacity-100"
          : "hover:transition-colors hover:bg-default/40 hover:text-default-foreground")
      }
      to={href}
    >
      {startContent}
      <span className="flex-1 truncate text-small font-medium text-foreground">
        {label}
      </span>
    </Link>
  );
}

export default function Sidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      projectsQuery.refetch();
    },
  });

  return (
    <div className="h-screen min-h-[48rem] overflow-y-scroll">
      <div className="h-full w-72 border-r-small border-divider p-6">
        <div className="flex items-center gap-2 px-2 justify-between">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            to="/"
          >
            <Logo />
            <p className="font-bold text-inherit">Tasks</p>
          </Link>
          <ThemeSwitch />
        </div>
        <div className="overflow-y-auto pt-12">
          <nav>
            <ul className="flex flex-col gap-4">
              <li>
                <section>
                  <span className="pl-1 text-tiny text-foreground-500">
                    Overview
                  </span>
                  <ul>
                    <li>
                      <SidebarLink
                        href="/app"
                        isActive={currentPath == "/app"}
                        label="Today"
                        startContent={
                          <TodayIcon
                            className="text-foreground"
                            date={new Date().getDate()}
                          />
                        }
                      />
                    </li>
                    <li>
                      <SidebarLink
                        href="/app/settings"
                        isActive={currentPath == "/app/settings"}
                        label="Settings"
                        startContent={
                          <SettingsIcon className="text-foreground" />
                        }
                      />
                    </li>
                  </ul>
                </section>
              </li>
              <li>
                <section>
                  <span className="pl-1 text-tiny text-foreground-500">
                    Projects
                  </span>
                  <ul>
                    {projectsQuery.data &&
                      projectsQuery.data.map(({ id, name }) => (
                        <li key={id}>
                          <SidebarLink
                            href={`/app/project/${id}`}
                            isActive={currentPath == `/app/project/${id}`}
                            label={name}
                            startContent={
                              <ProjectsIcon className="text-foreground" />
                            }
                          />
                        </li>
                      ))}
                    <li>
                      <Button
                        className="w-full mt-1"
                        startContent={<AddIcon />}
                        variant="ghost"
                        onPress={() => createMutation.mutate()}
                      >
                        Create Project
                      </Button>
                    </li>
                  </ul>
                </section>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
