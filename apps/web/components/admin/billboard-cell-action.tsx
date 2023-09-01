"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { BILLBOARD_LABELS } from "@/constants/billboard"
import { apiRoutes, routes } from "@/constants/routes"
import axios from "axios"

import { toastError } from "@/lib/api-response/api-responses"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  toast,
} from "@shared/ui"
import { type BillboardColumn } from "@/components/admin/billboard-columns"
import { AlertModal } from "@/components/admin/modals/alert-modal"
import { Icons } from "@/components/icons"

interface CellActionProps {
  data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const actionsLabels = BILLBOARD_LABELS.list.columns.actions

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast({ title: actionsLabels.copied })
  }

  const onClick = () => {
    router.push(`${routes.dashboard}/${params.spaceId}/billboards/${data.id}`)
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/billboards`
      await axios.delete(`${baseUrl}/${data.id}`)
      router.refresh()
      toast({ title: BILLBOARD_LABELS.delete.toastMessage })
    } catch (error) {
      toastError(error, BILLBOARD_LABELS.delete.error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{actionsLabels.open}</span>
            <Icons.moreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{actionsLabels.label}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Icons.copy className="mr-2 h-4 w-4" />
            {actionsLabels.copy}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClick()}>
            <Icons.edit className="mr-2 h-4 w-4" />
            {actionsLabels.update}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Icons.trash className="mr-2 h-4 w-4" />
            {actionsLabels.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
