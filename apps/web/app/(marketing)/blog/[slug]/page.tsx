import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { allAuthors, allPosts } from "contentlayer/generated";

import { formatDate } from "@lib/utils";
import { Icons } from "@components/icons";
import { Mdx } from "@components/docs/mdx";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug.toString() }));
}

export default async function Page({ params }: PageProps) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === author)
  );

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className="absolute -left-[200px] top-14 hidden items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900 xl:inline-flex"
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {post.date && (
          <time className="block text-sm text-slate-600">
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
          {post.title}
        </h1>
        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author: any) => (
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
                  className="rounded-full"
                />
                <div className="flex-1 text-left leading-tight">
                  <p className="font-medium text-slate-900">{author.title}</p>
                  <p className="text-xs text-slate-600">@{author.twitter}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={720}
          className="my-8 rounded-md border border-slate-200 bg-slate-800 transition-colors group-hover:border-green-900"
          priority
        />
      )}
      <Mdx code={post.body.code} />
      <hr className="my-4 border-slate-200" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/blog"
          className="inline-flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
}
