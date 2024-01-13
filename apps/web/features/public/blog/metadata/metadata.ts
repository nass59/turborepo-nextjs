import { type Metadata } from "next"

import { siteConfig } from "@/config/site"
import { getMetadata } from "@/lib/metadata"
import { getOgUrl } from "@/lib/og"

import { getPageFromParams } from "../utilities/page"
import { getPostFromParams } from "../utilities/post"

export const getPostMetadata = (slug: string): Metadata | null => {
  const post = getPostFromParams(slug)

  if (!post) return null

  return {
    ...getMetadata(getOgUrl(post.title, "Blog Post"), post),
    authors: post?.authors.map((author) => ({
      name: author,
    })),
  }
}

export const getPageMetadata = (slug: string): Metadata | null => {
  const page = getPageFromParams(slug)

  if (!page) return null

  return getMetadata(getOgUrl(page.title, siteConfig.name), page)
}
