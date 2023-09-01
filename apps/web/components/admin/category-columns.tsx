"use client"

import { CATEGORY_LABELS } from "@/constants/category"
import { type ColumnDef } from "@tanstack/react-table"

import { CellAction } from "@/components/admin/category-cell-action"

export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

const columnsLabels = CATEGORY_LABELS.list.columns

export const columns: ColumnDef<CategoryColumn>[] = [
  columnsLabels.name,
  {
    ...columnsLabels.billboard,
    cell: ({ row }) => row.original.billboardLabel,
  },
  columnsLabels.createdAt,
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
