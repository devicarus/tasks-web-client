import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { User } from "@heroui/user";
import { useRouterState, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
  Logo,
  SolarCalendarDateLinear as TodayIcon,
  SolarWidget2Linear as ProjectsIcon,
  //SolarSettingsLinear as SettingsIcon,
  SolarAddCircleBold as AddIcon,
  SolarCalendarMarkLinear as UpcommingIcon,
  SolarCalendarMinimalisticLinear as AnytimeIcon,
  SolarLogout2Bold,
} from "@/shared/components/icons";
import { ThemeSwitch } from "@/shared/components/theme-switch";
import { fetchProjects, createProject } from "@/feature/project/api";
import { siteConfig } from "@/core/config/site";
import { useAuth } from "@/shared/hooks/useAuth";
import { fetchUserInfo } from "@/feature/auth/api";

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

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const navigate = useNavigate();
  const { logout } = useAuth();

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const userInfoQuery = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserInfo,
  });

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: ({ id }) => {
      projectsQuery.refetch();
      navigate({
        to: `/app/project/${id}`,
      });
    },
  });

  return (
    <div
      className={`h-screen min-h-[48rem] p-6 overflow-y-scroll ${className}`}
    >
      <div className="flex items-center gap-2 px-2 justify-between">
        <Link
          className="flex justify-start items-center gap-1"
          color="foreground"
          to="/"
        >
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.name}</p>
        </Link>
        <ThemeSwitch />
      </div>
      <div className="overflow-y-auto pt-12">
        <nav>
          <ul className="flex flex-col gap-4">
            <li className="mt-auto mb-4">
              <section>
                <Dropdown placement="bottom">
                  <DropdownTrigger>
                    <User
                      as="button"
                      avatarProps={{
                        isBordered: true,
                        size: "sm",
                      }}
                      className="w-full justify-start px-2"
                      name={userInfoQuery.data?.username}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem
                      key="logout"
                      className="text-danger"
                      color="danger"
                      startContent={
                        <SolarLogout2Bold className="text-xl pointer-events-none flex-shrink-0 text-danger" />
                      }
                      onPress={logout}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </section>
            </li>
            <li>
              <section>
                <span className="pl-1 text-tiny text-foreground-500">
                  Overview
                </span>
                <ul>
                  <li>
                    <SidebarLink
                      href="/app/today"
                      isActive={currentPath == "/app/today"}
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
                      href="/app/upcomming"
                      isActive={currentPath == "/app/upcomming"}
                      label="Upcomming"
                      startContent={
                        <UpcommingIcon className="text-foreground" />
                      }
                    />
                  </li>
                  <li>
                    <SidebarLink
                      href="/app/anytime"
                      isActive={currentPath == "/app/anytime"}
                      label="Anytime"
                      startContent={<AnytimeIcon className="text-foreground" />}
                    />
                  </li>
                  {/*<li>
                      <SidebarLink
                        href="/app/settings"
                        isActive={currentPath == "/app/settings"}
                        label="Settings"
                        startContent={
                          <SettingsIcon className="text-foreground" />
                        }
                      />
                    </li>*/}
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
                          label={name || "New Project"}
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
  );
}
