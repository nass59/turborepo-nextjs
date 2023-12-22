import { create } from "zustand"

interface useSpaceModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSpaceModal = create<useSpaceModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
