import { allPages } from "@/.contentlayer/generated"

export const getPageFromParams = (slug: string) => {
  const page = allPages.find((page) => page.slug === slug)

  return page || null
}

export const getPageSlugs = () => {
  return allPages.map((page) => ({ slug: page.slug }))
}
