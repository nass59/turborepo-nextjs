import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@workspace/design-system/lib/utils";

const cardVariants = cva(
  "bg-card relative text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
  {
    variants: {
      variant: {
        default: "rounded-xl border py-6 shadow-sm",
        poster: "p-0 rounded-sm aspect-poster bg-slate-800 text-slate-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  );
}

type CardHeaderProps = React.ComponentProps<"div"> & {
  isAbsolute?: boolean;
};

function CardHeader({
  className,
  isAbsolute = false,
  ...props
}: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        {
          "absolute top-0 left-0 z-[1] p-3": isAbsolute,
        },
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

type CardContentProps = React.ComponentProps<"div"> & { isPoster?: boolean };

function CardContent({ className, isPoster, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "relative px-6",
        {
          "aspect-poster": isPoster,
        },
        className
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "relative flex items-center px-6 [.border-t]:pt-6",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
