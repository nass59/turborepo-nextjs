import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../../lib/utils"
import { BadgeStyle } from "./style"

const badgeVariants = cva(BadgeStyle.base, {
  variants: {
    variant: BadgeStyle.variants,
  },
  defaultVariants: {
    variant: "default",
  },
})

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants, BadgeStyle }
