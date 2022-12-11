import BlogNavLink from "./BlogNavLink";
import { Post } from "./page";

async function getPosts() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=1"
  );

  return res.json();
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const featuredPosts = await getPosts();

  return (
    <div>
      {featuredPosts.map((post: Post) => (
        <div key={post.id}>
          <BlogNavLink slug={post.id.toString()}>{post.title}</BlogNavLink>
        </div>
      ))}
      <div className="border">{children}</div>
    </div>
  );
}
