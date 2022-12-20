import MdxHead from "@components/docs/mdx-head";
import { allDocs } from "contentlayer/generated";

interface HeadProps {
  params: {
    slug?: string[];
  };
}

export default function Head({ params }: HeadProps) {
  const slug = params?.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slug === slug);

  if (!doc) {
    return null;
  }

  return (
    <MdxHead
      params={{ slug }}
      og={{
        heading: doc.description || "",
        type: "Documentation",
        mode: "light",
      }}
    />
  );
}
