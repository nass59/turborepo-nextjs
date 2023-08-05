import { findAllBySpaceId } from "@/lib/database/billboard"
import { BillboardClient } from "@/components/admin/billboard-client"

type PageProps = {
  params: {
    spaceId: string
  }
}

export default async function Page({ params }: PageProps) {
  const billboards = await findAllBySpaceId(params.spaceId)
  console.log(billboards)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={JSON.parse(JSON.stringify(billboards))} />
      </div>
    </div>
  )
}
