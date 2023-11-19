import { create } from "zustand"

import { type ItemModel } from "@/lib/database/models/Item"

interface PreviewModalStore {
  isOpen: boolean
  data?: ItemModel
  onOpen: (data: ItemModel) => void
  onClose: () => void
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: ItemModel) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default usePreviewModal
