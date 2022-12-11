"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function BlogNavLink({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = slug === segment;

  return (
    <Link
      href={`/blog/${slug}`}
      // Change style depending on whether the link is active
      style={{ fontWeight: isActive ? "bold" : "normal" }}
    >
      {children}
    </Link>
  );
}
