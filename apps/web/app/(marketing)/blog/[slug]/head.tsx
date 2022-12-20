import MdxHead from "@components/docs/mdx-head";

interface HeadProps {
  params: {
    slug: string;
  };
}

export default function Head({ params }: HeadProps) {
  return (
    <MdxHead
      params={params}
      og={{
        heading: "",
        type: "Blog Post",
        mode: "dark",
      }}
    />
  );
}
