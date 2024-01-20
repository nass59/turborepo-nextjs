"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { CellAction } from "@/features/admin/common/ui/cell-action"

import { CATEGORY_LABELS } from "../constants/category"

export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

const { columns, resource } = CATEGORY_LABELS.list

export const columnsData: ColumnDef<CategoryColumn>[] = [
  columns.name,
  columns.billboard,
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
