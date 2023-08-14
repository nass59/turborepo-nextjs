"use client"

import { useParams, useRouter } from "next/navigation"
import { routes } from "@/constants/routes"

import { Button, DataTable, Heading, Separator } from "@shared/ui"
import { ApiList } from "@/components/admin/api-list"
import {
  columns,
  type BillboardColumn,
} from "@/components/admin/billboard-columns"
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
            router.push(`${routes.dashboard}/${params.spaceId}/billboards/new`)
          }
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="API calls for Billboards" />

      <Separator />

      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  )
}
