import { getPosts } from "../utilities/post"
import { Post } from "./post"

export const Posts = () => {
  const posts = getPosts()

  if (!posts.length) {
    return <p>No posts published</p>
  }

  return (
    <div className="grid gap-10 sm:grid-cols-2">
      {posts.map((post, index) => (
        <Post key={post._id} post={post} hasPriority={index <= 1} />
      ))}
    </div>
  )
}
