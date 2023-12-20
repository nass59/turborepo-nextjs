import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../../lib/utils"
import { CardStyle } from "./style"

const cardVariants = cva(CardStyle.base, {
  variants: {
    variant: CardStyle.variants,
  },
  defaultVariants: {
    variant: "default",
  },
})

export type CardProps = React.ButtonHTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean
  }

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
)

Card.displayName = "Card"

export type CardHeaderProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  isAbsolute?: boolean
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, isAbsolute = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5",
        {
          "absolute left-0 top-0 z-[1] p-3": isAbsolute,
        },
        className
      )}
      {...props}
    />
  )
)

CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))

CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))

CardDescription.displayName = "CardDescription"

export type CardContentProps = React.ButtonHTMLAttributes<HTMLDivElement> & {
  isPoster?: boolean
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, isPoster = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative",
        {
          "aspect-poster": isPoster,
        },
        className
      )}
      {...props}
    />
  )
)

CardContent.displayName = "CardContent"

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center text-sm", className)}
    {...props}
  />
))

CardFooter.displayName = "CardFooter"

const CardBackground = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-0 bg-gradient-to-t from-slate-900",
      className
    )}
    {...props}
  ></div>
))

CardBackground.displayName = "CardBackground"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardBackground,
  CardStyle,
}
