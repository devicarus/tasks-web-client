import { siteConfig } from "@/core/config/site";

export const formatTitle = (title?: string) =>
  title ? `${title} | ${siteConfig.name}` : siteConfig.name;
