import { parseData } from "@/lib/utils"
import { BILLBOARD_LABELS } from "@/features/admin/billboard/constants/billboard"
import { BillboardForm } from "@/features/admin/billboard/ui/form"
import { getBillboard } from "@/features/admin/billboard/utilities/billboard"
import { FormContentHeading } from "@/features/admin/common/ui/form-content-heading"

type Props = {
  params: {
    billboardId: string
  }
}

export default async function Page({ params }: Props) {
  const billboard = await getBillboard(params.billboardId)

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
