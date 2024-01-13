"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { CATEGORY_LABELS } from "@/constants/category"

import { CellAction } from "../../common/ui/cell-action"

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
