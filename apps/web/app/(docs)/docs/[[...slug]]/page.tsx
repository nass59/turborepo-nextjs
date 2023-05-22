import { Metadata } from "next"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { getTableOfContents } from "@lib/toc"
import { absoluteUrl } from "@lib/utils"
import { DocsPageHeader } from "@components/docs-page-header"
import { DocsPager } from "@components/docs-pager"
import { DocsTableOfContents } from "@components/docs-toc"
import { Mdx } from "@components/mdx"
import "@styles/mdx.css"

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slug === slug)

  return doc || null
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params)

  if (!doc) {
    return {}
  }

  const url = process.env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", doc.description ?? doc.title)
  ogUrl.searchParams.set("type", "Documentation")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.url),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allDocs.map((doc) => ({ slug: doc.slug.split("/") }))
}

export default async function Page({ params }: PageProps) {
  const doc = await getDocFromParams(params)

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
