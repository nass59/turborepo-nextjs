import { Types } from "mongoose"

import { env } from "@/env.mjs"
import { findAllItems, findOneItemWithCategory } from "@/lib/database/items"
import ExploreContainer from "@/components/explore/explore-container"
import ExploreList from "@/components/explore/explore-list"
import Gallery from "@/components/explore/gallery"
import Info from "@/components/explore/info"

interface ExploreItemPageProps {
  params: {
    exploreId: string
  }
}

const ExploreItemPage: React.FC<ExploreItemPageProps> = async ({ params }) => {
  const item = await findOneItemWithCategory(params.exploreId, env.SPACE_ID, {
    isArchived: false,
  })

  if (!item) return null

  const suggestedItems = await findAllItems({
    _id: { $ne: new Types.ObjectId(params.exploreId) },
    categoryId: item.categoryId,
  })

  return (
    <ExploreContainer>
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <Gallery images={item.images || []} />
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <Info data={item} />
        </div>
      </div>
      <hr className="my-10" />
      <ExploreList title="Suggested items" items={suggestedItems} />
    </ExploreContainer>
  )
}

export default ExploreItemPage
