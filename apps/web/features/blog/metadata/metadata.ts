import { type Metadata } from "next"
import { type Page, type Post } from "@/.contentlayer/generated"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"

import { getPageFromParams } from "../utilities/page"
import { getPostFromParams } from "../utilities/post"

const getMetadata = (ogUrl: URL, item: Post | Page): Metadata => {
  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      type: "article",
      url: absoluteUrl(item.url),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [ogUrl.toString()],
    },
  }
}

const getOgUrl = (
  item: Post | Page,
  type: string,
  mode: string = "dark"
): URL => {
  const ogUrl = new URL(`${env.NEXT_PUBLIC_APP_URL}/api/og`)
  ogUrl.searchParams.set("heading", item.title)
  ogUrl.searchParams.set("type", type)
  ogUrl.searchParams.set("mode", mode)

  return ogUrl
}

export const getPostMetadata = (slug: string): Metadata | null => {
  const post = getPostFromParams(slug)

  if (!post) return null

  return {
    ...getMetadata(getOgUrl(post, "Blog Post"), post),
    authors: post?.authors.map((author) => ({
      name: author,
    })),
  }
}

export const getPageMetadata = (slug: string): Metadata | null => {
  const page = getPageFromParams(slug)

  if (!page) return null

  return getMetadata(getOgUrl(page, siteConfig.name), page)
}
