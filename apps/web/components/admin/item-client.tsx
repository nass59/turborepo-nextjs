"use client"

import { useParams, useRouter } from "next/navigation"
import { routes } from "@/constants/routes"

import { Button, DataTable, Heading, Separator } from "@shared/ui"
import { ApiList } from "@/components/admin/api-list"
import { columns, type ItemColumn } from "@/components/admin/item-columns"
import { Icons } from "@/components/icons"

interface ItemClientProps {
  data: ItemColumn[]
}

export const ItemClient: React.FC<ItemClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Items (${data.length})`}
          description="Manage items for your space"
        />

        <Button
          onClick={() =>
            router.push(`${routes.dashboard}/${params.spaceId}/items/new`)
          }
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Items" />

      <Separator />

      <ApiList entityName="items" entityIdName="itemId" />
    </>
  )
}
