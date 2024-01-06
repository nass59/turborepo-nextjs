import { forwardRef } from "react"

import { cn } from "../../../lib/utils"
import { Separator } from "../separator"

const Heading = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div className={cn("relative space-y-4", className)} ref={ref} {...props}>
    {children}
    <Separator />
  </div>
))

Heading.displayName = "Heading"

const HeadingTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    className={cn("inline-block font-heading text-4xl lg:text-5xl", className)}
    ref={ref}
    {...props}
  />
))

HeadingTitle.displayName = "HeadingTitle"

const HeadingDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={cn("text-xl text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
))

HeadingDescription.displayName = "HeadingDescription"

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

export { Heading, HeadingTitle, HeadingDescription, HeadingAction }
