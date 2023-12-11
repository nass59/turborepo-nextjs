import { type PropsWithChildren } from "react"
import { type MainNavItem as TypeMainNavItem } from "@/types"

import { MainNavItem } from "./main-nav-item"

type Props = PropsWithChildren & {
  items?: TypeMainNavItem[]
  segment: string | null
  className?: string
}

export const MainNavItems = ({
  items,
  segment,
  className,
  ...props
}: Props) => {
  if (!items?.length) return null

  return (
    <nav className={className} {...props}>
      {items.map((item, index) => (
        <MainNavItem
          key={index}
          item={item}
          isActive={String(item.href).startsWith(`/${segment}`)}
        />
      ))}
    </nav>
  )
}
