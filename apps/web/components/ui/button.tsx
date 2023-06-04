import { ButtonHTMLAttributes, forwardRef } from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400",
        destructive: "",
        outline:
          "border-slate-200 bg-white text-black hover:bg-slate-100/90 focus:ring-slate-800/50",
        subtle: "",
        ghost:
          "font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:ring-slate-200",
        link: "",
        yellow: "bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-600",
        black:
          "bg-slate-800 text-white hover:bg-slate-500 focus:ring-slate-600",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 py-1 px-6",
        lg: "h-11 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
