import { type NextPage } from "next"

import { env } from "@/env.mjs"
import { findFirstBillboardBySpaceId } from "@/lib/database/billboard"
import { findAllItemsBySpaceId } from "@/lib/database/items"
import { parseData } from "@/lib/utils"
import Billboard from "@/components/product/billboard"
import ProductContainer from "@/components/product/product-container"
import ProductList from "@/components/product/product-list"

export const revalidate = 0

const Page: NextPage = async () => {
  const billboard = await findFirstBillboardBySpaceId(env.SPACE_ID)
  const items = await findAllItemsBySpaceId({
    spaceId: env.SPACE_ID,
    isFeatured: true,
    isArchived: false,
  })

  return (
    <ProductContainer>
      <div className="space-y-10 pb-10">
        {billboard && <Billboard data={billboard} />}
        <div className="flex flex-col gap-y-8">
          <ProductList title="Featured items" items={parseData(items)} />
        </div>
      </div>
    </ProductContainer>
  )
}

export default Page
