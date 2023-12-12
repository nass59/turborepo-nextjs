import { type Post } from "@/.contentlayer/generated"

import { formatDate } from "@/lib/utils"

import { Authors } from "./authors"

type Props = {
  post: Post
}

export const PostHeader = ({ post }: Props) => {
  return (
    <div>
      {post.date && (
        <time
          dateTime={post.date}
          className="block text-sm text-muted-foreground"
        >
          Published on {formatDate(post.date)}
        </time>
      )}

      <h1 className="mt-2 inline-block font-heading leading-tight lg:text-5xl">
        {post.title}
      </h1>

      <Authors post={post} />
    </div>
  )
}
