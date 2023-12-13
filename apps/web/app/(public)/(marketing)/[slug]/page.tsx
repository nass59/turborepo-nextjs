import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { Mdx } from "@/components/mdx-components"
import { getPageMetadata } from "@/features/blog/metadata/metadata"
import { Heading } from "@/features/blog/ui/heading"
import { getPageFromParams, getPageSlugs } from "@/features/blog/utilities/page"

type Props = {
  params: {
    slug: string
  }
}

export function generateMetadata({
  params,
}: Props): Promise<Metadata> | object {
  return getPageMetadata(params.slug) || {}
}

export function generateStaticParams(): Props["params"][] {
  return getPageSlugs()
}

export default function Page({ params }: Props) {
  const page = getPageFromParams(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      <Heading title={page.title} description={page.description} />
      <Mdx code={page.body.code} />
    </>
  )
}
