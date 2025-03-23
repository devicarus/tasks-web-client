import { Link } from "@heroui/link";
import { useRouterState } from "@tanstack/react-router";

import {
  Logo,
  SolarHome2Linear as HomeIcon,
  SolarWidget2Linear as ProjectsIcon,
  SolarChecklistMinimalisticLinear as TasksIcon,
  SolarSettingsLinear as SettingsIcon,
} from "./icons";
import { ThemeSwitch } from "./theme-switch";

type SidebarLinkProps = {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean | undefined;
};

function SidebarLink({ href, icon, label, isActive }: SidebarLinkProps) {
  const Icon = icon;

  return (
    <Link
      className={
        "flex gap-2 items-center justify-between relative py-1.5 w-full box-border subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none px-3 min-h-11 rounded-large h-[44px] " +
        (isActive
          ? "bg-default-100 opacity-100"
          : "hover:transition-colors hover:bg-default/40 hover:text-default-foreground")
      }
      href={href}
    >
      <Icon className="text-foreground" />
      <span className="flex-1 truncate text-small font-medium text-foreground">
        {label}
      </span>
    </Link>
  );
}

export default function Sidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const items = [
    { label: "Home", icon: HomeIcon, href: "/app" },
    { label: "Projects", icon: ProjectsIcon, href: "/app/projects" },
    { label: "Tasks", icon: TasksIcon, href: "/app/tasks" },
    { label: "Settings", icon: SettingsIcon, href: "/app/settings" },
  ];

  return (
    <div className="h-screen min-h-[48rem] overflow-y-scroll">
      <div className="h-full w-72 border-r-small border-divider p-6">
        <div className="flex items-center gap-2 px-2 justify-between">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">Tasks</p>
          </Link>
          <ThemeSwitch />
        </div>
        <div className="overflow-y-auto pt-12">
          <div className="w-full relative flex flex-col gap-1 p-1 overflow-clip list-none">
            <nav className="w-full flex flex-col gap-0.5 outline-none items-center">
              {items.map(({ label, icon, href }) => (
                <SidebarLink
                  key={href}
                  href={href}
                  icon={icon}
                  isActive={currentPath == href}
                  label={label}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
