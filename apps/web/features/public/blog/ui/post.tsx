import { type Route } from "next"
import Image from "next/image"
import Link from "next/link"

import { formatDate } from "@/lib/utils"

import { type Author } from "./authors"

export type Post = {
  authors: Author[]
  date: string
  description: string
  image: string
  slug: string
  title: string
  url: string
}

type Props = {
  post: Post
  hasPriority?: boolean
}

export const Post = ({ post, hasPriority = false }: Props) => {
  return (
    <article className="group relative flex flex-col space-y-2">
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={587}
          height={587}
          priority={hasPriority}
          className="rounded-md border bg-slate-800 transition-colors"
        />
      )}

      <h2 className="text-2xl font-extrabold">{post.title}</h2>

      {post.description && (
        <p className="text-muted-foreground">{post.description}</p>
      )}

      {post.date && (
        <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
      )}

      <Link
        href={post.url as Route}
        className="absolute inset-0 -top-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
      >
        <span className="sr-only">View Post</span>
      </Link>
    </article>
  )
}
