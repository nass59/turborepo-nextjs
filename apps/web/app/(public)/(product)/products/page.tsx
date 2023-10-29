import { type NextPage } from "next"
import getBillboard from "@/actions/get-billboard"
import getItems from "@/actions/get-items"

import Billboard from "@/components/product/billboard"
import ProductContainer from "@/components/product/product-container"
import ProductList from "@/components/product/product-list"

export const revalidate = 0

const Page: NextPage = async () => {
  const billboard = await getBillboard("64ce885e51546a1ecc7a88f8")
  const items = await getItems({ isFeatured: true })

  return (
    <ProductContainer>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8">
          <ProductList title="Featured items" items={items} />
        </div>
      </div>
    </ProductContainer>
  )
}

export default Page
