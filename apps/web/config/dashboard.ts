import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Pages",
      href: "/",
      icon: "page",
      disabled: true,
    },
    {
      title: "Media",
      href: "/",
      icon: "media",
      disabled: true,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
      disabled: true,
    },
  ],
};
