import { GetServerSideProps } from "next";

interface Post {
  id: string;
  title: string;
}

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).
//
// In the background, a revalidation request will be made to populate the cache
// with a fresh value. If you refresh the page, you will see the new value.
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Call an external API endpoint to get posts
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
};
