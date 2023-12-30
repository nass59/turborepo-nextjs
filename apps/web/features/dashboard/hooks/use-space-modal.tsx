import { create } from "zustand"

type State = {
  isOpen: boolean
}

type Action = {
  onOpen: () => void
  onClose: () => void
}

export const useSpaceModal = create<State & Action>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
