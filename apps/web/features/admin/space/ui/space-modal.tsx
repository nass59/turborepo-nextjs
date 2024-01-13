"use client"

import { SPACE_LABELS } from "@/constants/space"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shared/ui"

import { useSpaceModal } from "../hooks/use-space-modal"
import { SpaceForm } from "./space"

export const SpaceModal = () => {
  const spaceModal = useSpaceModal()
  const { title, description } = SPACE_LABELS.create

  const onChange = (open: boolean) => {
    if (!open) spaceModal.onClose()
  }

  return (
    <Dialog open={spaceModal.isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <SpaceForm />
      </DialogContent>
    </Dialog>
  )
}