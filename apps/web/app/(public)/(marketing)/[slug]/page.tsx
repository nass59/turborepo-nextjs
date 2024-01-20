import { notFound } from "next/navigation"

import {
  type PageMetadata,
  type PageProps,
  type StaticParams,
} from "@/types/common"
import { Heading } from "@shared/ui"
import { getPageMetadata } from "@/features/public/blog/metadata/metadata"
import {
  getPageFromParams,
  getPageSlugs,
} from "@/features/public/blog/utilities/page"
import { ContentContainer } from "@/features/public/common/ui/content-container"
import { Mdx } from "@/features/public/common/ui/mdx-components"

export function generateMetadata({ params }: PageProps): PageMetadata {
  return getPageMetadata(params.slug) || {}
}

export function generateStaticParams(): StaticParams {
  return getPageSlugs()
}

export default function Page({ params }: PageProps) {
  const page = getPageFromParams(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <ContentContainer centered>
      <Heading title={page.title} description={page.description} />
      <Mdx code={page.body.code} />
    </ContentContainer>
  )
}
