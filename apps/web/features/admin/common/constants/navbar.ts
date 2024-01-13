import { NAVIGATION_LABELS } from "@/constants/navigation"

export const navRoutes = [
  {
    path: "",
    key: "overview",
    label: NAVIGATION_LABELS.overview,
  },
  {
    path: `/billboards`,
    key: "billboards",
    label: NAVIGATION_LABELS.billboards,
  },
  {
    path: `/categories`,
    key: "categories",
    label: NAVIGATION_LABELS.categories,
  },
  {
    path: `/items`,
    key: "items",
    label: NAVIGATION_LABELS.items,
  },
  {
    path: `/settings`,
    key: "settings",
    label: NAVIGATION_LABELS.settings,
  },
] as const
