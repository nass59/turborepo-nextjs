import { notFound } from "next/navigation"

import {
  type PageMetadata,
  type PageProps,
  type StaticParams,
} from "@/types/common"
import { Heading } from "@shared/ui"
import { ContentContainer } from "@/components/content-container"
import { Mdx } from "@/components/mdx-components"
import { getPageMetadata } from "@/features/blog/metadata/metadata"
import { getPageFromParams, getPageSlugs } from "@/features/blog/utilities/page"

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
    <ContentContainer className="space-y-8">
      <Heading title={page.title} description={page.description} />
      <Mdx code={page.body.code} />
    </ContentContainer>
  )
}
