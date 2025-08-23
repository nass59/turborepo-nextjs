'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@workspace/design-system/components/ui/dialog';

import { SPACE_LABELS } from '../constants/space';
import { useSpaceModal } from '../hooks/use-space-modal';
import { SpaceForm } from './form';

export const SpaceModal = () => {
  const spaceModal = useSpaceModal();
  const { title, description } = SPACE_LABELS.create;

  const onChange = (open: boolean) => {
    if (!open) {
      spaceModal.onClose();
    }
  };

  return (
    <Dialog onOpenChange={onChange} open={spaceModal.isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <SpaceForm />
      </DialogContent>
    </Dialog>
  );
};
