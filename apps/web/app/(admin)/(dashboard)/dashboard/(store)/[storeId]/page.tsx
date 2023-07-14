import { findFirstByStoreId } from "@/lib/database/store"

interface DashboardStoreProps {
  params: { storeId: string }
}

export default async function Page({ params }: DashboardStoreProps) {
  const store = await findFirstByStoreId(params.storeId)

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        Active Store: <span className="font-semibold">{store?.name}</span>
      </div>
    </div>
  )
}
