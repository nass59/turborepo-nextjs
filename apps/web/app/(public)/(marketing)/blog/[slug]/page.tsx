import { type Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { ContentContainer } from "@/components/content-container"
import { Mdx } from "@/components/mdx-components"
import { getPostMetadata } from "@/features/blog/metadata/metadata"
import { BackLink } from "@/features/blog/ui/back-link"
import { PostHeader } from "@/features/blog/ui/post-header"
import { getPostFromParams, getPostSlugs } from "@/features/blog/utilities/post"

type Props = {
  params: {
    slug: string
  }
}

/**
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export function generateMetadata({
  params,
}: Props): Promise<Metadata> | object {
  return getPostMetadata(params.slug) || {}
}

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params
 */
export async function generateStaticParams(): Promise<Props["params"][]> {
  return getPostSlugs()
}

export default function Page({ params }: Props) {
  const post = getPostFromParams(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <ContentContainer>
      <BackLink className="absolute left-[-150px] top-20 hidden xl:inline-flex" />
      <article className="container max-w-3xl space-y-8">
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
