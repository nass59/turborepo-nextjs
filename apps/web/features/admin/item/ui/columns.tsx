"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { ITEM_LABELS } from "@/constants/item"
import { Badge } from "@shared/ui"
import { Icons } from "@/components/icons"
import { CellAction } from "@/features/admin/common/ui/cell-action"

export type ItemColumn = {
  id: string
  name: string
  category: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

const { columns, resource } = ITEM_LABELS.list

const getIsArchivedIcon = (isArchived: boolean) => {
  return isArchived ? (
    <Icons.eyeDisabled className="h-4 w-4 fill-slate-300 text-slate-500" />
  ) : (
    <Icons.eye className="h-4 w-4 text-slate-500" />
  )
}

const getIsFeaturedIcon = (isFeatured: boolean) => {
  return isFeatured ? (
    <Icons.star className="h-4 w-4 fill-yellow-300 text-yellow-500" />
  ) : (
    <Icons.starDisabled className="h-4 w-4 fill-slate-300 text-slate-500" />
  )
}

export const columnsData: ColumnDef<ItemColumn>[] = [
  columns.name,
  {
    ...columns.isArchived,
    cell: ({ row }) => getIsArchivedIcon(row.original.isArchived),
  },
  {
    ...columns.isFeatured,
    cell: ({ row }) => getIsFeaturedIcon(row.original.isFeatured),
  },
  {
    ...columns.category,
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.category}</Badge>
    ),
  },
  columns.createdAt,
  {
    id: "actions",
    cell: ({ row }) => (
      <CellAction
        data={row.original}
        resource={resource}
        labels={columns.actions}
      />
    ),
  },
]
