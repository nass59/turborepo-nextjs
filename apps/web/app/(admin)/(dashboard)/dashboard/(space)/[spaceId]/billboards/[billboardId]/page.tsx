import { BILLBOARD_LABELS } from "@/constants/billboard"
import { findOneBillboard } from "@/lib/database/billboard"
import { parseData } from "@/lib/utils"
import { BillboardForm } from "@/features/admin/billboard/ui/form"
import { FormContentHeading } from "@/features/admin/common/ui/form-content-heading"

type Props = {
  params: {
    billboardId: string
  }
}

export default async function Page({ params }: Props) {
  const billboard = await findOneBillboard(params.billboardId)

  return (
    <>
      <FormContentHeading
        labels={BILLBOARD_LABELS}
        isEdit={Boolean(billboard)}
      />

      <BillboardForm initialData={parseData(billboard)} />
    </>
  )
}
