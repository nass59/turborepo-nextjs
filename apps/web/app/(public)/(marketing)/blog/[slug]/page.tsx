import Image from "next/image"
import { notFound } from "next/navigation"

import {
  type PageMetadata,
  type PageProps,
  type StaticParams,
} from "@/types/common"
import { ContentContainer } from "@/components/content-container"
import { Mdx } from "@/components/mdx-components"
import { getPostMetadata } from "@/features/public/blog/metadata/metadata"
import { BackLink } from "@/features/public/blog/ui/back-link"
import { PostHeader } from "@/features/public/blog/ui/post-header"
import {
  getPostFromParams,
  getPostSlugs,
} from "@/features/public/blog/utilities/post"

/**
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export function generateMetadata({ params }: PageProps): PageMetadata {
  return getPostMetadata(params.slug) || {}
}

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
 */
export async function generateStaticParams(): Promise<StaticParams> {
  return getPostSlugs()
}

export default function Page({ params }: PageProps) {
  const post = getPostFromParams(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <ContentContainer centered withSpace={false}>
      <BackLink className="absolute left-[-150px] top-20 hidden xl:inline-flex" />
      <article className="m-auto max-w-3xl space-y-8">
        <PostHeader post={post} />

        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={720}
            height={720}
            className="rounded-md border bg-slate-800 transition-colors"
            priority
          />
        )}

        <Mdx code={post.body.code} />

        <hr />

        <div className="flex justify-center">
          <BackLink />
        </div>
      </article>
    </ContentContainer>
  )
}
