import { findFirstByStoreId } from "@/lib/database/store"

interface DashboardStoreProps {
  params: { storeId: string }
}

export default async function Page({ params }: DashboardStoreProps) {
  const store = await findFirstByStoreId(params.storeId)

  return <div>Active Store: {store?.name}</div>
}
