"use client"

import { useParams, useRouter } from "next/navigation"

import { ITEM_LABELS } from "@/constants/item"
import { routes } from "@/constants/routes"
import {
  Button,
  DataTable,
  Heading,
  HeadingDescription,
  HeadingTitle,
  Separator,
} from "@shared/ui"
import { ApiList } from "@/components/admin/api-list"
import { columns, type ItemColumn } from "@/components/admin/item-columns"
import { Icons } from "@/components/icons"

interface ItemClientProps {
  data: ItemColumn[]
}

export const ItemClient: React.FC<ItemClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  const listLabels = ITEM_LABELS.list
  const apiLabels = ITEM_LABELS.api

  const onClick = () => {
    router.push(`${routes.dashboard}/${params.spaceId}/items/new`)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading>
          <HeadingTitle>{`${listLabels.title} (${data.length})`}</HeadingTitle>
          <HeadingDescription>{listLabels.desscription}</HeadingDescription>
        </Heading>

        <Button onClick={() => onClick()}>
          <Icons.add className="mr-2 h-4 w-4" />
          {listLabels.add}
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Heading>
        <HeadingTitle>{apiLabels.title}</HeadingTitle>
        <HeadingDescription>{apiLabels.desscription}</HeadingDescription>
      </Heading>

      <Separator />

      <ApiList
        entityName={apiLabels.entityName}
        entityIdName={apiLabels.entityIdName}
      />
    </>
  )
}
