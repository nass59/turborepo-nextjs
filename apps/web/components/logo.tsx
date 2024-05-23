import Link from "next/link"
import { RocketIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { routes } from "@/constants/routes"
import { buttonVariants, cn } from "@shared/ui"

export const Logo = ({ ...props }) => {
  return (
    <Link
      href={routes.home}
      className={cn(
        buttonVariants({ variant: "ghost", size: "xs" }),
        "hidden space-x-2 md:flex"
      )}
      {...props}
    >
      <RocketIcon className="size-6" />
      <span className="font-bold">{siteConfig.name}</span>
    </Link>
  )
}
