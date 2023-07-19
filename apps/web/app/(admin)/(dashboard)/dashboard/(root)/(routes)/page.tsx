"use client"

import { useEffect } from "react"

import { useSpaceModal } from "@/hooks/use-space-modal"

export default function Page() {
  const onOpen = useSpaceModal((state) => state.onOpen)
  const isOpen = useSpaceModal((state) => state.isOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return null
}
