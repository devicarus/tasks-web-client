import type { NavigateOptions, ToOptions } from "@tanstack/react-router";

import { HeroUIProvider as Provider } from "@heroui/system";
import { useRouter } from "@tanstack/react-router";

declare module "@react-types/shared" {
  interface RouterConfig {
    href: ToOptions["to"];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

export const HeroUIProvider = ({ children }: { children: React.ReactNode }) => {
  let router = useRouter();

  return (
    <Provider
      navigate={(to, options) => router.navigate({ to, ...options })}
      useHref={(to) => router.buildLocation({ to }).href}
    >
      {children}
    </Provider>
  );
};
