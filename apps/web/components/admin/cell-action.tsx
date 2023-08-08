"use client"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  toast,
} from "@shared/ui"
import { type BillboardColumn } from "@/components/admin/columns"
import { Icons } from "@/components/icons"

interface CellActionProps {
  data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast({
      title: "Billboard Id copied to the clipboard",
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icons.moreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Icons.copy className="mr-2 h-4 w-4" />
          Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icons.edit className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icons.trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
