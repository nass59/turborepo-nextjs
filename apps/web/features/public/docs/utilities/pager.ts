import { docsConfig } from "@/config/docs"

const flatten = (links: { items?: any }[]): any => {
  return links.reduce((flat, link) => {
    return flat.concat(link.items ? flatten(link.items) : link)
  }, [])
}

export const getPagerForDoc = (url: string) => {
  const flattenLinks = [null, ...flatten(docsConfig.sidebarNav), null]
  const activeIndex = flattenLinks.findIndex((link) => url === link?.href)

  const prev = activeIndex !== 0 ? flattenLinks[activeIndex - 1] : null

  const next =
    activeIndex !== flattenLinks.length - 1
      ? flattenLinks[activeIndex + 1]
      : null

  return { prev, next }
}
