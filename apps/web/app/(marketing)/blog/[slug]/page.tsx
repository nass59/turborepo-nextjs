// @see https://beta.nextjs.org/docs/routing/defining-routes#typescript
// @see https://beta.nextjs.org/docs/data-fetching/fetching#data-fetching-patterns

import type { Post } from "../page";

export const revalidate = 120; // revalidate this page every 60 seconds

type PageProps = {
  params: { slug: string; body: string };
};

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post: Post) => ({ slug: post.id.toString() }));
}

async function getPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=1"
  );

  return res.json();
}

async function getPost(slug: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  return res.json();
}

async function getUser() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/1`);
  return res.json();
}

export default async function Page({ params: { slug } }: PageProps) {
  // Initiate both requests in parallel
  const postData = getPost(slug);
  const userData = getUser();

  // Wait for the promises to resolve
  const [post, user] = await Promise.all([postData, userData]);

  return (
    <div>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <p>
        By <b>{user.name}</b> - email : <em>{user.email}</em>
      </p>
    </div>
  );
}
