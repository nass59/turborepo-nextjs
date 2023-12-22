"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { routes } from "@/constants/routes"
import { SPACE_LABELS } from "@/constants/space"

import { type SpaceModel } from "@/lib/database/models/Space"
import {
  Button,
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui"
import { Icons } from "@/components/icons"
import { useSpaceModal } from "@/features/dashboard/hooks/use-space-modal"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface SpaceSwitcherProps extends PopoverTriggerProps {
  items: SpaceModel[]
}

/**
 * This component allows users to switch between different spaces.
 * It displays a list of spaces and allows users to select a space.
 * When a space is selected, the user is redirected to the dashboard of the selected space.
 */
const SpaceSwitcher: React.FC<SpaceSwitcherProps> = ({
  className,
  items = [],
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const spaceModal = useSpaceModal()

  const params = useParams()
  const router = useRouter()

  const labels = SPACE_LABELS.switcher

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item._id.toString(),
  }))

  const currentSpace = formattedItems.find(
    (item) => item.value === params.spaceId
  )

  const onSpaceSelect = (space: { value: string; label: string }) => {
    setOpen(false)
    router.push(`${routes.dashboard}/${space.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label={labels.label}
          className={cn("w-[200px] justify-between", className)}
        >
          <Icons.space className="mr-2 h-4 w-4" />
          {currentSpace?.label}
          <Icons.chevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder={labels.placeholder} />
            <CommandEmpty>{labels.noSpaceFound}</CommandEmpty>
            <CommandGroup heading={labels.heading}>
              {formattedItems.map((space) => (
                <CommandItem
                  key={space.value}
                  onSelect={() => onSpaceSelect(space)}
                  className="cursor-pointer text-sm"
                >
                  <Icons.space className="mr-2 h-4 w-4" />
                  {space.label}
                  <Icons.check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentSpace?.value === space.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="cursor-pointer"
                onSelect={() => {
                  setOpen(false)
                  spaceModal.onOpen()
                }}
              >
                <Icons.plusCircle className="mr-2 h-5 w-5" />
                {labels.create}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SpaceSwitcher
