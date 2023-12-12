import Image from "next/image"
import Link from "next/link"
import { type Post } from "@/.contentlayer/generated"

import { getAuthorsFromPost } from "../utilities/author"

type Props = {
  post: Post
}

export const Authors = ({ post }: Props) => {
  const authors = getAuthorsFromPost(post)

  if (!authors?.length) return null

  return (
    <div className="mt-4 flex space-x-4">
      {authors.map((author) =>
        author ? (
          <Link
            key={author._id}
            href={`https://twitter.com/${author.twitter}`}
            className="flex items-center space-x-2 text-sm"
          >
            <Image
              src={author.avatar}
              alt={author.title}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{author.title}</p>
              <p className="text-xs text-muted-foreground">@{author.twitter}</p>
            </div>
          </Link>
        ) : null
      )}
    </div>
  )
}
