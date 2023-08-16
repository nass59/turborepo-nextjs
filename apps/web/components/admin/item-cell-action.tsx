"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ITEM_LABELS } from "@/constants/item"
import { apiRoutes, routes } from "@/constants/routes"
import axios from "axios"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  toast,
} from "@shared/ui"
import { type ItemColumn } from "@/components/admin/item-columns"
import { AlertModal } from "@/components/admin/modals/alert-modal"
import { Icons } from "@/components/icons"

interface CellActionProps {
  data: ItemColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast({
      title: "Item Id copied to the clipboard",
    })
  }

  const onDelete = async () => {
    try {
      setLoading(true)

      await axios.delete(
        `${apiRoutes.spaces}/${params.spaceId}/items/${data.id}`
      )
      router.refresh()

      toast({ title: ITEM_LABELS.delete.toastMessage })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        variant: "destructive",
        description: ITEM_LABELS.delete.error,
      })
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
            <span className="sr-only">Open menu</span>
            <Icons.moreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Icons.copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `${routes.dashboard}/${params.spaceId}/items/${data.id}`
              )
            }
          >
            <Icons.edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Icons.trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
