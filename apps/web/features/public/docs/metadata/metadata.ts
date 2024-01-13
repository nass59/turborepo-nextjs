import { type Metadata } from "next"

import { getMetadata } from "@/lib/metadata"
import { getOgUrl } from "@/lib/og"

import { getDocFromParams } from "../utilities/doc"

export const getDocMetadata = (slug: string): Metadata | null => {
  const doc = getDocFromParams(slug)

  if (!doc) {
    return {}
  }

  return getMetadata(
    getOgUrl(doc.description ?? doc.title, "Documentation"),
    doc
  )
}
