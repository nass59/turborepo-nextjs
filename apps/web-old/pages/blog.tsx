import { GetStaticProps } from "next";

interface Post {
  id: string;
  title: string;
}

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post: Post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
};
