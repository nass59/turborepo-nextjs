import { Icons } from "@/components/icons"

import { BreadcrumbItems } from "./breadcrumb-items"

export const Breadcrumb = () => {
  return (
    <div className="hidden rounded-md bg-slate-50 px-5 py-2 sm:flex">
      <div className="flex space-x-1 text-sm font-medium">
        <div className="flex items-center">
          <Icons.tree className="size-4" />
          <span className="px-2 text-slate-400">TechShip</span>
        </div>

        <BreadcrumbItems />
      </div>
    </div>
  )
}
