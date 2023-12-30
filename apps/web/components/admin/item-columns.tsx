"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { ITEM_LABELS } from "@/constants/item"
import { Badge } from "@shared/ui"
import { CellAction } from "@/components/admin/item-cell-action"
import { Icons } from "@/components/icons"

export type ItemColumn = {
  id: string
  name: string
  category: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

const columnsLabels = ITEM_LABELS.list.columns

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

export const columns: ColumnDef<ItemColumn>[] = [
  columnsLabels.name,
  {
    ...columnsLabels.isArchived,
    cell: ({ row }) => getIsArchivedIcon(row.original.isArchived),
  },
  {
    ...columnsLabels.isFeatured,
    cell: ({ row }) => getIsFeaturedIcon(row.original.isFeatured),
  },
  {
    ...columnsLabels.category,
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.category}</Badge>
    ),
  },
  columnsLabels.createdAt,
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
