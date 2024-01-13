import { CATEGORY_LABELS } from "@/constants/category"
import { parseData } from "@/lib/utils"
import { DataTable, Separator } from "@shared/ui"
import { columnsData } from "@/features/admin/category/ui/columns"
import { getAllCategories } from "@/features/admin/category/utilities/category"
import { ApiList } from "@/features/admin/common/ui/api-list"
import { ListHeading } from "@/features/admin/common/ui/list-heading"

type Props = {
  params: {
    spaceId: string
  }
}

export default async function Page({ params }: Props) {
  const categories = await getAllCategories(params.spaceId)
  const labels = CATEGORY_LABELS.list
  const apiLabels = CATEGORY_LABELS.api

  return (
    <>
      <ListHeading
        labels={labels}
        value={categories.length}
        path={`/${labels.resource}/new`}
      />

      <DataTable
        columns={columnsData}
        data={parseData(categories)}
        searchKey="name"
      />

      <Separator />

      <ApiList
        resource={apiLabels.resource}
        resourceId={apiLabels.resourceId}
        spaceId={params.spaceId}
      />
    </>
  )
}
