import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@workspace/design-system/components/ui/command';
import { cn } from '@workspace/design-system/lib/utils';
import { CheckIcon, CirclePlusIcon, RadiusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants/routes';
import type { NavbarItem } from '@/features/admin/common/types/navbar';

import { SPACE_LABELS } from '../constants/space';
import { useSpaceModal } from '../hooks/use-space-modal';

type Props = {
  items: NavbarItem[];
  current?: NavbarItem;
  setOpen: (open: boolean) => void;
};

export const SpaceCommand = ({ items, current, setOpen }: Props) => {
  const router = useRouter();
  const spaceModal = useSpaceModal();

  const onSelect = (space: NavbarItem) => {
    setOpen(false);
    router.push(`${routes.dashboard}/${space.value}`);
  };

  const onCreate = () => {
    setOpen(false);
    spaceModal.onOpen();
  };

  const labels = SPACE_LABELS.switcher;

  return (
    <Command>
      <CommandList>
        <CommandInput placeholder={labels.placeholder} />
        <CommandEmpty>{labels.noSpaceFound}</CommandEmpty>
        <CommandGroup heading={labels.heading}>
          {items.map((item) => (
            <CommandItem
              className="cursor-pointer text-sm"
              key={item.value}
              onSelect={() => onSelect(item)}
            >
              <RadiusIcon className="mr-2 size-4" />
              {item.label}
              <CheckIcon
                className={cn(
                  'ml-auto size-4',
                  current?.value === item.value ? 'opacity-100' : 'opacity-0'
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
            <CirclePlusIcon className="mr-2 size-5" />
            {labels.create}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
