'use client';

import { Button } from '@workspace/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@workspace/design-system/components/ui/dropdown-menu';
import { CopyIcon, EllipsisIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { routes } from '@/constants/routes';
import type { BillboardColumn } from '@/features/admin/billboard/ui/columns';
import type { CategoryColumn } from '@/features/admin/category/ui/columns';
import type { ItemColumn } from '@/features/admin/item/ui/columns';

import { onCopy } from '../utilities/copy';
import { CellModal } from './cell-modal';

type Props = {
  data: CategoryColumn | BillboardColumn | ItemColumn;
  resource: 'categories' | 'billboards' | 'items';
  labels: {
    copied: string;
    open: string;
    label: string;
    copy: string;
    update: string;
    delete: string;
  };
};

export const CellAction = ({ data, resource, labels }: Props) => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    router.push(`${routes.dashboard}/${params.spaceId}/${resource}/${data.id}`);
  };

  return (
    <>
      <CellModal
        open={open}
        resource={resource}
        resourceId={data.id}
        setOpen={setOpen}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant="ghost">
            <span className="sr-only">{labels.open}</span>
            <EllipsisIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{labels.label}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id, labels.copied)}>
            <CopyIcon className="mr-2 size-4" />
            {labels.copy}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClick()}>
            <PencilIcon className="mr-2 size-4" />
            {labels.update}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <TrashIcon className="mr-2 size-4" />
            {labels.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
