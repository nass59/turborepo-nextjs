"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"

import { apiRoutes, routes } from "@/constants/routes"
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
import { type CategoryColumn } from "@/components/admin/category-columns"
import { AlertModal } from "@/components/admin/modals/alert-modal"
import { Icons } from "@/components/icons"

type Props = {
  data: CategoryColumn
  resource: "categories"
  labels: {
    copied: string
    open: string
    label: string
    copy: string
    update: string
    delete: string
  }
}

export const CellAction = ({ data, resource, labels }: Props) => {
  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast({ title: labels.copied })
  }

  const onClick = () => {
    router.push(`${routes.dashboard}/${params.spaceId}/${resource}/${data.id}`)
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      const baseUrl = `${apiRoutes.spaces}/${params.spaceId}/${resource}`
      await axios.delete(`${baseUrl}/${data.id}`)
      router.refresh()
      toast({ title: "This resource has been successfully deleted" })
    } catch (error) {
      toastError(error, "An error occurred while deleting the resource")
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
            <span className="sr-only">{labels.open}</span>
            <Icons.moreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{labels.label}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Icons.copy className="mr-2 h-4 w-4" />
            {labels.copy}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClick()}>
            <Icons.edit className="mr-2 h-4 w-4" />
            {labels.update}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Icons.trash className="mr-2 h-4 w-4" />
            {labels.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
