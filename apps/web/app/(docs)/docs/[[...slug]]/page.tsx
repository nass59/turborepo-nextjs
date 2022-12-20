import { Mdx } from "@components/docs/mdx";
import { DocsPageHeader } from "@components/DocsPageHeader";
import { DocsPager } from "@components/DocsPager";
import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { getTableOfContents } from "@lib/toc";
import { DocsTableOfContents } from "@components/DocsTableOfContents";
import "@styles/mdx.css";

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({ slug: doc.slug.split("/") }));
}

export default async function Page({ params }: PageProps) {
  const slug = params?.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slug === slug);

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="relative py-6 lg:py-10 lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <Mdx code={doc.body.code} />
        <hr className="my-4 md:my-6 border-slate-200" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden xl:block text-sm">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DocsTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
