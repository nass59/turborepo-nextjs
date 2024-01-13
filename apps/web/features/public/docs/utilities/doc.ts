import { allDocs } from "@/.contentlayer/generated"

export const getDocFromParams = (slug: string) => {
  const doc = allDocs.find((doc) => doc.slug === slug)

  return doc || null
}

export const getDocSlugs = () => {
  return allDocs.map((doc) => ({ slug: doc.slug.split("/") }))
}
