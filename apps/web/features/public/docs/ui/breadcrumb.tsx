import { RocketIcon } from "@radix-ui/react-icons"

import { BreadcrumbItems } from "./breadcrumb-items"

export const Breadcrumb = () => {
  return (
    <div className="hidden rounded-md bg-slate-50 p-2 sm:flex">
      <div className="flex space-x-1 text-sm font-medium">
        <div className="flex items-center">
          <RocketIcon className="size-4 text-slate-400" />
          <span className="px-2 text-slate-400">TechShip</span>
          <span className="text-slate-600">/</span>
        </div>

        <BreadcrumbItems />
      </div>
    </div>
  )
}
