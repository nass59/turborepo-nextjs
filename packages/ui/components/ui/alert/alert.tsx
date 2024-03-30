import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../../lib/utils"
import { AlertStyle } from "./style"

const alertVariants = cva(AlertStyle.base, {
  variants: {
    variant: AlertStyle.variants,
  },
  defaultVariants: {
    variant: "default",
  },
})

const Alert = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))

Alert.displayName = "Alert"

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))

AlertTitle.displayName = "AlertTitle"

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))

AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, AlertStyle }
