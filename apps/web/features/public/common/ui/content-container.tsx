import { type PropsWithChildren } from "react"

import { cn } from "@workspace/ui"

type Props = PropsWithChildren & {
  className?: string
  centered?: boolean
  withSpace?: boolean
}

export const ContentContainer = ({
  className,
  centered = false,
  withSpace = true,
  children,
}: Props) => {
  return (
    <div
      className={cn(
        "container relative py-6 lg:py-10",
        {
          "max-w-4xl": centered,
          "space-y-8": withSpace,
        },
        className
      )}
    >
      {children}
    </div>
  )
}
