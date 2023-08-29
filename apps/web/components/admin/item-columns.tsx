"use client"

import { type ColumnDef } from "@tanstack/react-table"

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

export const columns: ColumnDef<ItemColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => {
      return row.original.isArchived ? (
        <Icons.eyeDisabled className="h-4 w-4 fill-slate-300 text-slate-500" />
      ) : (
        <Icons.eye className="h-4 w-4 text-slate-500" />
      )
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => {
      return row.original.isFeatured ? (
        <Icons.star className="h-4 w-4 fill-yellow-300 text-yellow-500" />
      ) : (
        <Icons.starDisabled className="h-4 w-4 fill-slate-300 text-slate-500" />
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.category}</Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
