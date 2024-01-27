import { notFound } from "next/navigation"

import {
  type ArrayPageProps,
  type PageMetadata,
  type StaticArrayParams,
} from "@/types/common"
import { Heading } from "@shared/ui"
import { Mdx } from "@/features/public/common/ui/mdx-components"
import { getDocMetadata } from "@/features/public/docs/metadata/metadata"
import { Pager } from "@/features/public/docs/ui/pager"
import { TOC } from "@/features/public/docs/ui/toc"
import {
  getDocFromParams,
  getDocSlugs,
} from "@/features/public/docs/utilities/doc"
import { getTableOfContents } from "@/features/public/docs/utilities/toc"

import "@/assets/styles/mdx.css"

export function generateMetadata({ params }: ArrayPageProps): PageMetadata {
  return getDocMetadata(params?.slug?.join("/") || "") || {}
}

export async function generateStaticParams(): Promise<StaticArrayParams> {
  return getDocSlugs()
}

export default async function Page({ params }: ArrayPageProps) {
  const doc = getDocFromParams(params?.slug?.join("/") || "")

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <main className="relative lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0 space-y-6">
        <Heading title={doc.title} description={doc.description || ""} />
        <Mdx code={doc.body.code} />
        <hr />
        <Pager url={doc.url} />
      </div>

      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <TOC toc={toc} />
        </div>
      </div>
    </main>
  )
}
