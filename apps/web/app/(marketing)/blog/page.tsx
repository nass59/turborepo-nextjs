import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@lib/utils";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export default async function Page() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-slate-600">
            A blog built using ContentLayer. Posts are written in MDX.
          </p>
        </div>
      </div>

      <hr className="my-8 border-slate-200" />

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
                  width={704}
                  height={352}
                  priority={index <= 1}
                  className="border border-slate-200 rounded-md bg-slate-800 transition-colors group-hover:border-green-600"
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-slate-600">{post.description}</p>
              )}
              {post.date && (
                <p className="text-sm text-slate-600">
                  {formatDate(post.date)}
                </p>
              )}
              <Link
                href={post.url}
                className="absolute inset-0 -top-2 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 rounded-md"
              >
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published</p>
      )}
    </div>
  );
}
