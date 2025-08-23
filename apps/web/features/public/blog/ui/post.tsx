import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@/lib/utils';

import type { Author } from './authors';

export type Post = {
  authors: Author[];
  date: string;
  description: string;
  image: string;
  slug: string;
  title: string;
  url: string;
};

type Props = {
  post: Post;
  hasPriority?: boolean;
};

export const Post = ({ post, hasPriority = false }: Props) => {
  return (
    <article className="group relative flex flex-col space-y-2">
      {post.image && (
        <Image
          alt={post.title}
          className="rounded-md border bg-slate-800 transition-colors"
          height={587}
          priority={hasPriority}
          src={post.image}
          width={587}
        />
      )}

      <h2 className="font-extrabold text-2xl">{post.title}</h2>

      {post.description && (
        <p className="text-muted-foreground">{post.description}</p>
      )}

      {post.date && (
        <p className="text-muted-foreground text-sm">{formatDate(post.date)}</p>
      )}

      <Link
        className="-top-2 absolute inset-0 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
        href={post.url as Route}
      >
        <span className="sr-only">View Post</span>
      </Link>
    </article>
  );
};
