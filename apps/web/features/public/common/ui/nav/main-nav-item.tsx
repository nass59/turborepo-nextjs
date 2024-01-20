import Link from "next/link"
import { type MainNavItem as TypeMainNavItem } from "@/types"

import { buttonVariants, cn } from "@shared/ui"

type Props = {
  item: TypeMainNavItem
  isActive: boolean
}

export const MainNavItem = ({ item, isActive, ...props }: Props) => {
  if (item.disabled) return null

  return (
    <Link
      href={item.href}
      className={cn(buttonVariants({ variant: "ghost", size: "xs" }), {
        "text-foreground": isActive,
        "text-foreground/70": !isActive,
      })}
      {...props}
    >
      {item.title}
    </Link>
  )
}
