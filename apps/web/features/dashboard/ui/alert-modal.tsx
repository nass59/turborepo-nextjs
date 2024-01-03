import { useEffect, useState } from "react"

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/ui"

type Props = {
  isOpen: boolean
  loading: boolean
  onClose: () => void
  onConfirm: () => void
}

export const AlertModal = ({ isOpen, onClose, onConfirm, loading }: Props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const onChange = (open: boolean) => {
    if (!open) onClose()
  }

  // Here we are in client side and we can display the modal
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            <Button disabled={loading} variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="destructive"
              onClick={onConfirm}
            >
              Continue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
