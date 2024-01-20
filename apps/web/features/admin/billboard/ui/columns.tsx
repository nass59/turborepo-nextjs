"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { CellAction } from "@/features/admin/common/ui/cell-action"

import { BILLBOARD_LABELS } from "../constants/billboard"

export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
}

const { columns, resource } = BILLBOARD_LABELS.list

export const columnsData: ColumnDef<BillboardColumn>[] = [
  columns.label,
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
