"use client"

import { usePreviewModal } from "../hooks/use-preview-modal"
import { Item } from "./item"
import { Modal } from "./modal"

export const PreviewModal = () => {
  const previewModal = usePreviewModal()
  const item = usePreviewModal((state) => state.data)

  if (!item) return null

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <Item item={item} />
    </Modal>
  )
}
