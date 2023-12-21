import { notFound } from "next/navigation"

import {
  type PageMetadata,
  type PageProps,
  type StaticParams,
} from "@/types/common"
import { ContentContainer } from "@/components/content-container"
import { getItemPageMetadata } from "@/features/explore/metadata/metadata"
import { Item } from "@/features/explore/ui/item"
import { List } from "@/features/explore/ui/list"
import {
  getItem,
  getPageSlugs,
  getSuggestedItems,
} from "@/features/explore/utilities/item"

export function generateMetadata({ params }: PageProps): PageMetadata {
  return getItemPageMetadata(params.slug) || {}
}

export async function generateStaticParams(): Promise<StaticParams> {
  return await getPageSlugs()
}

export default async function Page({ params }: PageProps) {
  const item = await getItem(params.slug)

  if (!item) {
    notFound()
  }

  const suggestedItems = await getSuggestedItems(
    String(item._id),
    item.categoryId
  )

  return (
    <ContentContainer withSpace>
      <Item item={item} />
      <hr />
      <List title="Suggested items" items={suggestedItems} nbCols={5} />
    </ContentContainer>
  )
}
