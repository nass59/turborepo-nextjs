import { type Metadata } from "next"
import { type Doc, type Page, type Post } from "@/.contentlayer/generated"

import { absoluteUrl } from "./utils"

export const getMetadata = (ogUrl: URL, item: Post | Page | Doc): Metadata => {
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
