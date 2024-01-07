import { forwardRef } from "react"

import { cn } from "../../../lib/utils"
import { Separator } from "../separator"

type HeadingProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  suffixTitle?: string
  description?: string
}

const Heading = forwardRef<HTMLDivElement, HeadingProps>(
  ({ title, suffixTitle, description, className, children, ...props }, ref) => (
    <div className={cn("relative space-y-4", className)} ref={ref} {...props}>
      <h1
        className="flex items-center gap-2 font-heading text-4xl lg:text-5xl"
        ref={ref}
        {...props}
      >
        {title}
        {suffixTitle && (
          <span className="mt-1 text-3xl text-muted-foreground">
            {suffixTitle}
          </span>
        )}
      </h1>

      {description && (
        <p className="text-xl text-muted-foreground">{description}</p>
      )}

      {children}

      <Separator />
    </div>
  )
)

Heading.displayName = "Heading"

const HeadingAction = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("absolute right-0 top-0", className)}
    ref={ref}
    {...props}
  />
))

HeadingAction.displayName = "HeadingAction"

export { Heading, HeadingAction }
