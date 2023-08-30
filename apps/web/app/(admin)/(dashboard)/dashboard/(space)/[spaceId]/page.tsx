import { findFirstBySpaceId } from "@/lib/database/space"

interface DashboardSpaceProps {
  params: {
    spaceId: string
  }
}

/**
 * This component fetches the first space with the given spaceId from the database.
 * It then displays the name of the active space.
 */
const Page = async ({ params }: DashboardSpaceProps) => {
  const space = await findFirstBySpaceId(params.spaceId)

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        Active Space: <span className="font-semibold">{space?.name}</span>
      </div>
    </div>
  )
}

export default Page
