"use client"

import { useParams, useRouter } from "next/navigation"

import { Button, DataTable, Heading, Separator } from "@shared/ui"
import { columns, type BillboardColumn } from "@/components/admin/columns"
import { Icons } from "@/components/icons"

interface BillboardClientProps {
  data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your space"
        />

        <Button
          onClick={() =>
            router.push(`/dashboard/${params.spaceId}/billboards/new`)
          }
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  )
}
