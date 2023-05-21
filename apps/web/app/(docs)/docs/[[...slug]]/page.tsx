import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { getTableOfContents } from "@lib/toc"
import { DocsPageHeader } from "@components/DocsPageHeader"
import { DocsPager } from "@components/DocsPager"
import { DocsTableOfContents } from "@components/DocsTableOfContents"
import { Mdx } from "@components/mdx"
import "@styles/mdx.css"

interface PageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc.slug.split("/") }))
}

export default async function Page({ params }: PageProps) {
  const slug = params?.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slug === slug)

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <main className="relative py-2 lg:gap-10 lg:py-2 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <Mdx code={doc.body.code} />
        <hr className="my-4 border-slate-200 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DocsTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  )
}
