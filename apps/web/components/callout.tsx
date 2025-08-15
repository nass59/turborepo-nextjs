import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@workspace/design-system/lib/utils";

const calloutVariants = cva(
  "my-6 flex items-start rounded-md border border-l-4 p-4",
  {
    variants: {
      variant: {
        default: "border-slate-600 bg-slate-50",
        success: "border-green-600 bg-slate-50",
        destructive: "border-red-900 bg-red-50",
        warning: "border-yellow-900 bg-yellow-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type CallooutProps = ComponentProps<"div"> &
  VariantProps<typeof calloutVariants> & {
    children?: React.ReactNode;
  };

const Callout = ({ className, variant, ...props }: CallooutProps) => (
  <div className={cn(calloutVariants({ variant, className }))} {...props} />
);

export { Callout, calloutVariants };
