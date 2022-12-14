"use client";

import { cn } from "@lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef } from "react";

type PopoverProps = PopoverPrimitive.PopoverProps;

export const Popover = ({ ...props }: PopoverProps) => {
  return <PopoverPrimitive.Root {...props} />;
};

Popover.Trigger = forwardRef<
  HTMLButtonElement,
  PopoverPrimitive.PopoverTriggerProps
>(function PopoverTrigger({ ...props }, forwardedRef) {
  return <PopoverPrimitive.Trigger {...props} ref={forwardedRef} />;
});

Popover.Portal = PopoverPrimitive.Portal;

Popover.Content = forwardRef<
  HTMLDivElement,
  PopoverPrimitive.PopoverContentProps
>(function PopoverContent({ className, ...props }, forwardedRef) {
  return (
    <PopoverPrimitive.Content
      ref={forwardedRef}
      align="end"
      className={cn(
        "overflow-hidden rounded-md border border-slate-50 bg-white shadow-md animate-in slide-in-from-top-1",
        className
      )}
      {...props}
    />
  );
});
