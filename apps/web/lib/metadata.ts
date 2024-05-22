import { type Metadata } from "next"

import { absoluteUrl } from "./utils"

type mdxMetadata = {
  title: string
  description: string
  url: string
}

export const getMetadata = (ogUrl: URL, mdxMetadata: mdxMetadata): Metadata => {
  return {
    title: mdxMetadata.title,
    description: mdxMetadata.description,
    openGraph: {
      title: mdxMetadata.title,
      description: mdxMetadata.description,
      type: "article",
      url: absoluteUrl(mdxMetadata.url),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: mdxMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: mdxMetadata.title,
      description: mdxMetadata.description,
      images: [ogUrl.toString()],
    },
  }
}
