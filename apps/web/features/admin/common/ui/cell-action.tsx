"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { routes } from "@/constants/routes"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@shared/ui"
import { Icons } from "@/components/icons"
import { type BillboardColumn } from "@/features/admin/billboard/ui/columns"
import { type CategoryColumn } from "@/features/admin/category/ui/columns"
import { type ItemColumn } from "@/features/admin/item/ui/columns"

import { onCopy } from "../utilities/copy"
import { CellModal } from "./cell-modal"

type Props = {
  data: CategoryColumn | BillboardColumn | ItemColumn
  resource: "categories" | "billboards" | "items"
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

  const [open, setOpen] = useState<boolean>(false)

  const onClick = () => {
    router.push(`${routes.dashboard}/${params.spaceId}/${resource}/${data.id}`)
  }

  return (
    <>
      <CellModal
        resource={resource}
        resourceId={data.id}
        open={open}
        setOpen={setOpen}
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
          <DropdownMenuItem onClick={() => onCopy(data.id, labels.copied)}>
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
