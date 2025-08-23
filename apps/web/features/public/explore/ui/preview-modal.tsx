'use client';

import { usePreviewModal } from '../hooks/use-preview-modal';
import { Item } from './item';
import { Modal } from './modal';

export const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const item = usePreviewModal((state) => state.data);

  if (!item) {
    return null;
  }

  return (
    <Modal onClose={previewModal.onClose} open={previewModal.isOpen}>
      <Item item={item} />
    </Modal>
  );
};
