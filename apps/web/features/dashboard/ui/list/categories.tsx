"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { CATEGORY_LABELS } from "@/constants/category"

import { CellAction } from "./cell-action"

type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

const columnsLabels = CATEGORY_LABELS.list.columns

export const columns: ColumnDef<CategoryColumn>[] = [
  columnsLabels.name,
  columnsLabels.billboard,
  columnsLabels.createdAt,
  {
    id: "actions",
    cell: ({ row }) => (
      <CellAction
        data={row.original}
        resource="categories"
        labels={columnsLabels.actions}
      />
    ),
  },
]
