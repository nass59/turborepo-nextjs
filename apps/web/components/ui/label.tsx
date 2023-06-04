import { forwardRef } from "react"
import * as LabelPrimitives from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

const Label = forwardRef<
  React.ElementRef<typeof LabelPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitives.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitives.Root
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))

Label.displayName = LabelPrimitives.Root.displayName

export { Label }
