import Link from "next/link";
import type { Post } from "./page";

type PageProps = {
  posts: Post[];
};

export default function PostList({ posts }: PageProps) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
