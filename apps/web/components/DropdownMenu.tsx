"use client"

import { forwardRef } from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { cn } from "@lib/utils"

type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuProps

export const DropdownMenu = ({ ...props }: DropdownMenuProps) => {
  return <DropdownMenuPrimitive.Root {...props} />
}

DropdownMenu.Trigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuPrimitive.DropdownMenuTriggerProps
>(function DropdownMenuTrigger({ ...props }, ref) {
  return <DropdownMenuPrimitive.Trigger {...props} ref={ref} />
})

DropdownMenu.Portal = DropdownMenuPrimitive.Portal

DropdownMenu.Content = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.MenuContentProps
>(function DropdownMenuContent({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Content
      className={cn(
        "overflow-hidden rounded-md border border-slate-50 bg-white shadow-md animate-in slide-in-from-top-1 md:w-32",
        className
      )}
      ref={ref}
      align="end"
      {...props}
    />
  )
})

DropdownMenu.Separator = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.MenuSeparatorProps
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("h-px bg-slate-200", className)}
      ref={ref}
      {...props}
    />
  )
})

DropdownMenu.Item = forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.MenuItemProps
>(function DropdownMenuItem({ className, ...props }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "flex cursor-default select-none items-center px-3 py-2 text-sm text-slate-600 outline-none focus:bg-slate-50 focus:text-black",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
