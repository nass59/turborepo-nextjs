import { GetStaticPaths } from "next";
import { useRouter } from "next/router";

interface Post {
  id: number;
  title: string;
}

export default function Posts({ post }: { post: Post }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{post.id}</h2>
      <h2>{id}</h2>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    {
      params: { id: "1" },
    },
    {
      params: { id: "2" },
    },
  ];

  return { paths, fallback: false };
};

// This also gets called at build time
export async function getStaticProps({ params }: { params: { id: string } }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      post,
    },
  };
}
