import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants, cn } from "@shared/ui"

import { Icons } from "./icons"

export const Logo = ({ ...props }) => {
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: "ghost", size: "xs" }),
        "hidden space-x-2 md:flex"
      )}
      {...props}
    >
      <Icons.logo />
      <span className="font-bold">{siteConfig.name}</span>
    </Link>
  )
}
