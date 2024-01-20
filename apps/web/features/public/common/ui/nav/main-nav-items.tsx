import { type PropsWithChildren } from "react"
import { type MainNavItem as TypeMainNavItem } from "@/types"

import { MainNavItem } from "./main-nav-item"

type Props = PropsWithChildren & {
  items?: TypeMainNavItem[]
  pathName: string | null
  className?: string
}

export const MainNavItems = ({
  items,
  pathName,
  className,
  ...props
}: Props) => {
  if (!items?.length) return null

  return (
    <nav className={className} {...props}>
      {items.map((item, index) => {
        const path = pathName?.split("/")
        const isActive =
          path && path.length === 1
            ? item.href === pathName
            : String(pathName).startsWith(String(item.href))

        return <MainNavItem key={index} item={item} isActive={isActive} />
      })}
    </nav>
  )
}
