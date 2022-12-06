import PostList from "./PostList";

export type Post = {
  id: number;
  slug: string;
  title: string;
  body: string;
};

const posts: Post[] = [
  {
    id: 1,
    slug: "post-1",
    title: "Post 1",
    body: "Post 1",
  },
];

export default function Page() {
  return (
    <div>
      <h1>Blog</h1>
      <PostList posts={posts} />
    </div>
  );
}
