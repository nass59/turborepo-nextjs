import { forwardRef } from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../../lib/utils"
import { InputStyle } from "./style"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const inputVariants = cva(InputStyle.base)

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants(), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
