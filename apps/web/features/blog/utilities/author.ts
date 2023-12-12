import { allAuthors, type Post } from "contentlayer/generated"

export const getAuthorsFromPost = (post: Post) => {
  return post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === author)
  )
}
