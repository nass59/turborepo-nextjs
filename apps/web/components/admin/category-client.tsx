"use client"

import { useParams, useRouter } from "next/navigation"

import { CATEGORY_LABELS } from "@/constants/category"
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
import {
  columns,
  type CategoryColumn,
} from "@/components/admin/category-columns"
import { Icons } from "@/components/icons"

interface CategoryClientProps {
  data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  const listLabels = CATEGORY_LABELS.list
  const apiLabels = CATEGORY_LABELS.api

  const onClick = () => {
    router.push(`${routes.dashboard}/${params.spaceId}/categories/new`)
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
