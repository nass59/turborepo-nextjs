import { useRouter } from "next/navigation"

import { routes } from "@/constants/routes"
import { SPACE_LABELS } from "@/constants/space"
import {
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@shared/ui"
import { Icons } from "@/components/icons"

import { useSpaceModal } from "../hooks/use-space-modal"

type Item = {
  label: string
  value: string
}

type Props = {
  items: Item[]
  current?: Item
  setOpen: (open: boolean) => void
}

export const SpaceCommand = ({ items, current, setOpen }: Props) => {
  const router = useRouter()
  const spaceModal = useSpaceModal()

  const onSelect = (space: Item) => {
    setOpen(false)
    router.push(`${routes.dashboard}/${space.value}`)
  }

  const onCreate = () => {
    setOpen(false)
    spaceModal.onOpen()
  }

  const labels = SPACE_LABELS.switcher

  return (
    <Command>
      <CommandList>
        <CommandInput placeholder={labels.placeholder} />
        <CommandEmpty>{labels.noSpaceFound}</CommandEmpty>
        <CommandGroup heading={labels.heading}>
          {items.map((item) => (
            <CommandItem
              key={item.value}
              onSelect={() => onSelect(item)}
              className="cursor-pointer text-sm"
            >
              <Icons.space className="mr-2 h-4 w-4" />
              {item.label}
              <Icons.check
                className={cn(
                  "ml-auto h-4 w-4",
                  current?.value === item.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <CommandSeparator />
      <CommandList>
        <CommandGroup>
          <CommandItem className="cursor-pointer" onSelect={() => onCreate()}>
            <Icons.plusCircle className="mr-2 h-5 w-5" />
            {labels.create}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
