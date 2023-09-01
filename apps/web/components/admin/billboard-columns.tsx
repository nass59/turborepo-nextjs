"use client"

import { BILLBOARD_LABELS } from "@/constants/billboard"
import { type ColumnDef } from "@tanstack/react-table"

import { CellAction } from "@/components/admin/billboard-cell-action"

export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
}

const columnsLabels = BILLBOARD_LABELS.list.columns

export const columns: ColumnDef<BillboardColumn>[] = [
  columnsLabels.label,
  columnsLabels.createdAt,
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
