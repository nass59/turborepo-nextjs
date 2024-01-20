import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../../lib/utils"
import { CalloutStyle } from "./style"

const calloutVariants = cva(CalloutStyle.base, {
  variants: {
    variant: CalloutStyle.variants,
  },
  defaultVariants: {
    variant: "default",
  },
})

export type CallooutProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof calloutVariants> & {
    children?: React.ReactNode
  }

const Callout = ({ className, variant, ...props }: CallooutProps) => (
  <div className={cn(calloutVariants({ variant, className }))} {...props} />
)

Callout.displayName = "Callout"

export { Callout, CalloutStyle, calloutVariants }
