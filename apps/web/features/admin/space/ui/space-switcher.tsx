'use client';

import { Button } from '@workspace/design-system/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/design-system/components/ui/popover';
import { cn } from '@workspace/design-system/lib/utils';
import { BlendIcon, ChevronDownIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import type { NavbarItem } from '@/features/admin/common/types/navbar';
import type { SpaceModel } from '@/lib/database/models/Space';

import { SPACE_LABELS } from '../constants/space';
import { SpaceCommand } from './space-command';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type Props = PopoverTriggerProps & {
  items: SpaceModel[];
};

/**
 * This component allows users to switch between different spaces.
 * It displays a list of spaces and allows users to select a space.
 * When a space is selected, the user is redirected to the dashboard of the selected space.
 */
export const SpaceSwitcher = ({ className, items = [] }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();

  const formattedItems: NavbarItem[] = items.map((item) => ({
    label: item.name,
    value: String(item._id),
  }));

  const currentSpace = formattedItems.find(
    (item) => item.value === params.spaceId
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          aria-label={SPACE_LABELS.switcher.label}
          className={cn('w-[200px] justify-between', className)}
          role="combobox"
          size="sm"
          variant="outline"
        >
          <BlendIcon className="mr-2 size-4" />
          {currentSpace?.label}
          <ChevronDownIcon className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <SpaceCommand
          current={currentSpace}
          items={formattedItems}
          setOpen={setOpen}
        />
      </PopoverContent>
    </Popover>
  );
};
