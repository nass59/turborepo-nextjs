import { Button } from "ui";
import Link from "next/link";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Button />
      <div style={{ marginTop: "1rem" }}>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
      </div>
      <div style={{ marginTop: "1rem" }}>
        {/* encodeURIComponent is used in the example to keep the path utf-8 compatible. */}
        <Link href={`/posts/${encodeURIComponent(1)}`}>
          <a>Post 1</a>
        </Link>
      </div>
      <div style={{ marginTop: "1rem" }}>
        {/* Alternatively, using a URL Object: */}
        <Link
          href={{
            pathname: "/posts/[id]",
            query: { id: 1 },
          }}
        >
          <a>Post 1</a>
        </Link>
      </div>
    </div>
  );
}
