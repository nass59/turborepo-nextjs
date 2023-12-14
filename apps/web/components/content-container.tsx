import { type PropsWithChildren } from "react"

import { cn } from "@shared/ui"

type Props = PropsWithChildren & {
  className?: string
}

export const ContentContainer = ({ className, children }: Props) => {
  return (
    <div
      className={cn("container relative max-w-4xl py-6 lg:py-10", className)}
    >
      {children}
    </div>
  )
}
