import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

export const getPosts = () => {
  return allPosts
    .filter((post) => post.published)
    .sort((current, next) => {
      return compareDesc(new Date(current.date), new Date(next.date))
    })
}
