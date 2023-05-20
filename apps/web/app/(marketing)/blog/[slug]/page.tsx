import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { allAuthors, allPosts } from "contentlayer/generated"

import { absoluteUrl, formatDate } from "@lib/utils"
import { Mdx } from "@components/docs/mdx"
import { Icons } from "@components/icons"

interface PageProps {
  params: {
    slug: string
  }
}

type ParamsProps = PageProps["params"]

async function getPostFromParams(params: ParamsProps) {
  const post = allPosts.find((post) => post.slug === params.slug)

  return post || null
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const url = process.env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", post.title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.url),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  }
}

export async function generateStaticParams(): Promise<ParamsProps[]> {
  return allPosts.map((post) => ({ slug: post.slug }))
}

export default async function Page({ params }: PageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === author)
  )

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className="absolute left-[-200px] top-14 hidden items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900 xl:inline-flex"
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>

      <div>
        {post.date && (
          <time dateTime={post.date} className="block text-sm text-slate-600">
            Published on {formatDate(post.date)}
          </time>
        )}

        <h1 className="mt-2 inline-block text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
          {post.title}
        </h1>

        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium text-slate-900">{author.title}</p>
                    <p className="text-xs text-slate-600">@{author.twitter}</p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={720}
          className="my-8 rounded-md border border-slate-200 bg-slate-800 transition-colors group-hover:border-green-900"
          priority
        />
      )}

      <Mdx code={post.body.code} />

      <hr className="my-4 border-slate-200" />

      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  )
}
