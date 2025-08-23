import { notFound } from "next/navigation";

import { ContentContainer } from "@/features/public/common/ui/content-container";
import { getItemPageMetadata } from "@/features/public/explore/metadata/metadata";
import { Item } from "@/features/public/explore/ui/item";
import { List } from "@/features/public/explore/ui/list";
import {
  getItem,
  getPageSlugs,
  getSuggestedItems,
} from "@/features/public/explore/utilities/item";
import {
  type PageMetadata,
  type PageProps,
  type StaticParams,
} from "@/types/common";

export async function generateMetadata({ params }: PageProps): PageMetadata {
  return getItemPageMetadata((await params).slug) || {};
}

export async function generateStaticParams(): Promise<StaticParams> {
  return await getPageSlugs();
}

export default async function Page({ params }: PageProps) {
  const item = await getItem((await params).slug);

  if (!item) {
    notFound();
  }

  const suggestedItems = await getSuggestedItems(
    String(item._id),
    item.categoryId
  );

  return (
    <ContentContainer withSpace>
      <Item item={item} />
      <hr />
      <List title="Suggested items" items={suggestedItems} nbCols={5} />
    </ContentContainer>
  );
}
