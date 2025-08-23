'use client';

import { Button } from '@workspace/design-system/components/ui/button';
import { FullscreenIcon } from 'lucide-react';
import type { MouseEventHandler } from 'react';

import { usePreviewModal } from '@/features/public/explore/hooks/use-preview-modal';
import type { ItemModel } from '@/lib/database/models/Item';

type Props = {
  data: ItemModel;
};

export const PreviewBtn = ({ data }: Props) => {
  const previewModal = usePreviewModal();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  return (
    <div className="absolute bottom-5 w-full px-6 opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100">
      <div className="flex justify-center gap-x-6">
        <Button
          className="bg-white text-black transition hover:scale-110"
          onClick={onPreview}
          size="icon"
          variant="outline"
        >
          <FullscreenIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
