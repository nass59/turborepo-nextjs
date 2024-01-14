"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { BILLBOARD_LABELS } from "@/constants/billboard"

import { CellAction } from "../../common/ui/cell-action"

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
