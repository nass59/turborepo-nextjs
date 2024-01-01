"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { SPACE_LABELS } from "@/constants/space"
import { type SpaceModel } from "@/lib/database/models/Space"
import { Button, cn, Popover, PopoverContent, PopoverTrigger } from "@shared/ui"
import { Icons } from "@/components/icons"

import { type NavbarItem } from "../types/navbar"
import { SpaceCommand } from "./space-command"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

type Props = PopoverTriggerProps & {
  items: SpaceModel[]
}

/**
 * This component allows users to switch between different spaces.
 * It displays a list of spaces and allows users to select a space.
 * When a space is selected, the user is redirected to the dashboard of the selected space.
 */
export const SpaceSwitcher = ({ className, items = [] }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const params = useParams()

  const formattedItems: NavbarItem[] = items.map((item) => ({
    label: item.name,
    value: String(item._id),
  }))

  const currentSpace = formattedItems.find(
    (item) => item.value === params.spaceId
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label={SPACE_LABELS.switcher.label}
          className={cn("w-[200px] justify-between", className)}
        >
          <Icons.space className="mr-2 h-4 w-4" />
          {currentSpace?.label}
          <Icons.chevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <SpaceCommand
          items={formattedItems}
          current={currentSpace}
          setOpen={setOpen}
        />
      </PopoverContent>
    </Popover>
  )
}
