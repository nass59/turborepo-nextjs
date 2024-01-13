import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

export const getPosts = () => {
  return allPosts
    .filter((post) => post.published)
    .sort((current, next) => {
      return compareDesc(new Date(current.date), new Date(next.date))
    })
}

export const getPostFromParams = (slug: string) => {
  const post = allPosts.find((post) => post.slug === slug)

  return post || null
}

export const getPostSlugs = () => {
  return allPosts.map((post) => ({ slug: post.slug }))
}
