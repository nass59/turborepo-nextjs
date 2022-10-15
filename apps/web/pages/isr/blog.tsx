import { GetStaticProps } from "next";
import { ChangeEvent, useState } from "react";

interface Post {
  id: number;
  title: string;
}

interface SearchData {
  item: string;
  refIndex: number;
}

const names = ["Tim", "Joe", "Bel", "Lee"];

export default function Blog({ posts }: { posts: Post[] }) {
  const [results, setResults] = useState<SearchData[]>([]);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    // Dynamically load fuse.js
    const Fuse = (await import("fuse.js")).default;
    const fuse = new Fuse(names);

    setResults(fuse.search(value));
  };

  return (
    <div>
      <input type="text" placeholder="Search" onChange={onChange} />
      <pre>Results: {JSON.stringify(results, null, 2)}</pre>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  if (!res.ok) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }

  // If the request was successful, return the posts
  // and revalidate every 10 seconds.
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  };
};
