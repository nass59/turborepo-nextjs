"use client"

import { useParams, useRouter } from "next/navigation"

import { BILLBOARD_LABELS } from "@/constants/billboard"
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

  const listLabels = BILLBOARD_LABELS.list
  const apiLabels = BILLBOARD_LABELS.api

  const onClick = () => {
    router.push(`${routes.dashboard}/${params.spaceId}/billboards/new`)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${listLabels.title} (${data.length})`}
          description={listLabels.desscription}
        />

        <Button onClick={() => onClick()}>
          <Icons.add className="mr-2 h-4 w-4" />
          {listLabels.add}
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title={apiLabels.title} description={apiLabels.desscription} />

      <Separator />

      <ApiList
        entityName={apiLabels.entityName}
        entityIdName={apiLabels.entityIdName}
      />
    </>
  )
}
