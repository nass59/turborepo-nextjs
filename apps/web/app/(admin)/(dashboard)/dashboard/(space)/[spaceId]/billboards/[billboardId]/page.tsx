import { findFirstByBillboardId } from "@/lib/database/billboard"
import { BillboardForm } from "@/components/admin/billboard-form"

interface BillboardProps {
  params: {
    billboardId: string
  }
}

export default async function Page({ params }: BillboardProps) {
  const billboard = await findFirstByBillboardId(params.billboardId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={JSON.parse(JSON.stringify(billboard))} />
      </div>
    </div>
  )
}
