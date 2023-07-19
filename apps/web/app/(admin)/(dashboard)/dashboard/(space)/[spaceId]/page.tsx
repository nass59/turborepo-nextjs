import { findFirstBySpaceId } from "@/lib/database/space"

interface DashboardSpaceProps {
  params: { spaceId: string }
}

export default async function Page({ params }: DashboardSpaceProps) {
  const space = await findFirstBySpaceId(params.spaceId)

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        Active Space: <span className="font-semibold">{space?.name}</span>
      </div>
    </div>
  )
}
