import Image from "next/image"
import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"

import "@/styles/mdx.css"

export const metadata = {
  title: "Blog",
}

export default function Page() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            A blog built using ContentLayer. Posts are written in MDX.
          </p>
        </div>
      </div>

      <hr className="my-8" />

      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={587}
                  height={587}
                  priority={index <= 1}
                  className="rounded-md border bg-slate-800 transition-colors"
                />
              )}

              <h2 className="text-2xl font-extrabold">{post.title}</h2>

              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}

              {post.date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
              )}

              <Link
                href={post.url}
                className="absolute inset-0 -top-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
              >
                <span className="sr-only">View Post</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published</p>
      )}
    </div>
  )
}
