import { type NextPage } from "next"

import { env } from "@/env.mjs"
import { findFirstBillboardBySpaceId } from "@/lib/database/billboard"
import { findAllItemsBySpaceId } from "@/lib/database/items"
import { parseData } from "@/lib/utils"
import Billboard from "@/components/explore/billboard"
import ExploreContainer from "@/components/explore/explore-container"
import ExploreList from "@/components/explore/explore-list"

const Page: NextPage = async () => {
  const billboard = await findFirstBillboardBySpaceId(env.SPACE_ID)
  const items = await findAllItemsBySpaceId({
    spaceId: env.SPACE_ID,
    isFeatured: true,
    isArchived: false,
  })

  return (
    <ExploreContainer>
      <div className="space-y-10 pb-10">
        {billboard && <Billboard data={billboard} />}
        <div className="flex flex-col gap-y-8">
          <ExploreList title="Featured items" items={parseData(items)} />
        </div>
      </div>
    </ExploreContainer>
  )
}

export default Page
