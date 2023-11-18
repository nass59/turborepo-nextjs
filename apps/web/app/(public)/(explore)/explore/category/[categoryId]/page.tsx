import { env } from "@/env.mjs"
import { findOneCategoryWithData } from "@/lib/database/category"
import { findAllItems } from "@/lib/database/items"
import Billboard from "@/components/explore/billboard"
import ExploreContainer from "@/components/explore/explore-container"
import ExploreList from "@/components/explore/explore-list"

interface CategoryPageProps {
  params: {
    categoryId: string
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const items = await findAllItems({
    categoryId: params.categoryId,
  })

  const category = await findOneCategoryWithData(
    params.categoryId,
    env.SPACE_ID
  )

  return (
    <div className="bg-white ">
      <ExploreContainer>
        {category && <Billboard data={category.billboard} />}
        <ExploreList title="Items" items={items} />
      </ExploreContainer>
    </div>
  )
}

export default CategoryPage
