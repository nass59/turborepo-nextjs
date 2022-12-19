import { Mdx } from "@components/docs/mdx";
import { DocsPageHeader } from "@components/DocsPageHeader";
import { DocsPager } from "@components/DocsPager";
import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import "@styles/mdx.css";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default async function Page({ params }: PageProps) {
  const slug = params?.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slug === slug);

  if (!doc) {
    notFound();
  }

  return (
    <main className="relative py-6 lg:py-10 lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <Mdx code={doc.body.code} />
        <hr className="my-4 md:my-6 border-slate-200" />
        <DocsPager doc={doc} />
      </div>
    </main>
  );
}
