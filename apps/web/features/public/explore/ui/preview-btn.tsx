"use client"

import { type MouseEventHandler } from "react"
import { EnterFullScreenIcon } from "@radix-ui/react-icons"

import { type ItemModel } from "@/lib/database/models/Item"
import { Button } from "@shared/ui"
import { usePreviewModal } from "@/features/public/explore/hooks/use-preview-modal"

type Props = {
  data: ItemModel
}

export const PreviewBtn = ({ data }: Props) => {
  const previewModal = usePreviewModal()

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    previewModal.onOpen(data)
  }

  return (
    <div className="absolute bottom-5 w-full px-6 opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100">
      <div className="flex justify-center gap-x-6">
        <Button
          onClick={onPreview}
          variant="outline"
          size="icon"
          className="bg-white text-black transition hover:scale-110"
        >
          <EnterFullScreenIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}
