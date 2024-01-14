import { CATEGORY_LABELS } from "@/constants/category"
import { findAllBillboardsBySpaceId } from "@/lib/database/billboard"
import { parseData } from "@/lib/utils"
import { CategoryForm } from "@/features/admin/category/ui/form"
import { getCategory } from "@/features/admin/category/utilities/category"
import { FormContentHeading } from "@/features/admin/common/ui/form-content-heading"

type Props = {
  params: {
    spaceId: string
    categoryId: string
  }
}

export default async function Page({ params }: Props) {
  const category = await getCategory(params.categoryId)
  const billboards = await findAllBillboardsBySpaceId(params.spaceId)

  return (
    <>
      <FormContentHeading labels={CATEGORY_LABELS} isEdit={Boolean(category)} />

      <CategoryForm
        initialData={parseData(category)}
        billboards={parseData(billboards)}
      />
    </>
  )
}
