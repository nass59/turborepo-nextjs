import { useRouter } from "next/navigation"
import {
  CheckIcon,
  PlusCircledIcon,
  RadiobuttonIcon,
} from "@radix-ui/react-icons"

import { routes } from "@/constants/routes"
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
import { type NavbarItem } from "@/features/admin/common/types/navbar"

import { SPACE_LABELS } from "../constants/space"
import { useSpaceModal } from "../hooks/use-space-modal"

type Props = {
  items: NavbarItem[]
  current?: NavbarItem
  setOpen: (open: boolean) => void
}

export const SpaceCommand = ({ items, current, setOpen }: Props) => {
  const router = useRouter()
  const spaceModal = useSpaceModal()

  const onSelect = (space: NavbarItem) => {
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
              <RadiobuttonIcon className="mr-2 size-4" />
              {item.label}
              <CheckIcon
                className={cn(
                  "ml-auto size-4",
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
            <PlusCircledIcon className="mr-2 size-5" />
            {labels.create}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
