"use client"

import { useEffect } from "react"

import { useSpaceModal } from "@/features/admin/space/hooks/use-space-modal"

/**
 * Page is a Next.js page component that triggers the space modal to open on mount.
 * It uses the useSpaceModal hook to get the current state of the modal and the function to open it.
 * If the modal is not open when the component mounts, it opens the modal.
 */
export default function Page() {
  // Get the function to open the modal and its current state
  const onOpen = useSpaceModal((state) => state.onOpen)
  const isOpen = useSpaceModal((state) => state.isOpen)

  // If the modal is not open when the component mounts, open it
  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  // This component does not render anything
  return null
}
