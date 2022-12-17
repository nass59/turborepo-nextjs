import { allPages } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@components/docs/mdx";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPages.map((page) => ({ slug: page.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const page = allPages.find((page) => page.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <div className="space-y-4">
        <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-xl text-slate-600">{page.description}</p>
        )}
      </div>

      <hr className="my-4 border-slate-200" />
      <Mdx code={page.body.code} />
    </article>
  );
}
