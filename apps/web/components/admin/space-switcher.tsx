"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { type SpaceModel } from "@/lib/database/models/Space"
import { useSpaceModal } from "@/hooks/use-space-modal"
import {
  Button,
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
  cn,
} from "@shared/ui"
import { Icons } from "@/components/icons"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface SpaceSwitcherProps extends PopoverTriggerProps {
  items: SpaceModel[]
}

export default function SpaceSwitcher({
  className,
  items = [],
}: SpaceSwitcherProps) {
  const [open, setOpen] = useState<boolean>(false)
  const spaceModal = useSpaceModal()
  const params = useParams()
  const router = useRouter()

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item._id.toString(),
  }))

  const currentSpace = formattedItems.find(
    (item) => item.value === params.spaceId
  )

  const onSpaceSelect = (space: { value: string; label: string }) => {
    setOpen(false)
    router.push(`/dashboard/${space.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a space"
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
            <CommandInput placeholder="Search space..." />
            <CommandEmpty>No space found.</CommandEmpty>
            <CommandGroup heading="Spaces">
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
                Create Space
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
