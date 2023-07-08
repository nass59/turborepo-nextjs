import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { allDocs } from "contentlayer/generated"

import { env } from "@/env.mjs"
import { getTableOfContents } from "@/lib/toc"
import { absoluteUrl } from "@/lib/utils"
import { DocsPageHeader } from "@/components/docs/docs-page-header"
import { DocsPager } from "@/components/docs/docs-pager"
import { DocsTableOfContents } from "@/components/docs/docs-toc"
import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"

interface PageProps {
  params: {
    slug: string[]
  }
}

function getDocFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slug === slug)

  return doc || null
}

export function generateMetadata({
  params,
}: PageProps): Promise<Metadata> | object {
  const doc = getDocFromParams(params)

  if (!doc) {
    return {}
  }

  const url = env.NEXT_PUBLIC_APP_URL

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

// @see https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
export function generateStaticParams(): PageProps["params"][] {
  return allDocs.map((doc) => ({ slug: doc.slug.split("/") }))
}

export default async function Page({ params }: PageProps) {
  const doc = getDocFromParams(params)

  if (!doc) {
    notFound()
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <main className="relative py-2 lg:gap-10 lg:py-2 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <Mdx code={doc.body.code} />
        <hr className="my-4 md:my-6" />
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
