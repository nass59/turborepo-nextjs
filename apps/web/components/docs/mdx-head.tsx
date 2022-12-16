import { absoluteUrl } from "@lib/utils";
import { ogImageSchema } from "@lib/validation/og";
import { allDocuments } from "contentlayer/generated";
import { z } from "zod";

interface MdxHeadProps {
  params: {
    slug: string;
  };
  og: z.infer<typeof ogImageSchema>;
}

export default function MdxHead({ params, og }: MdxHeadProps) {
  const { slug } = params;
  const mdxDoc = allDocuments.find((doc) => doc.slug === slug);

  if (!mdxDoc) {
    return null;
  }

  const title = `${mdxDoc.title} - TechShip`;
  const url = process.env.NEXT_PUBLIC_APP_URL;
  let ogUrl = new URL(`${url}/og.jpg`);

  const ogTitle = mdxDoc.title;
  const ogDescription = mdxDoc.description;

  if (og?.type) {
    ogUrl = new URL(`${url}/api/og`);
    ogUrl.searchParams.set("heading", ogTitle);
    ogUrl.searchParams.set("type", og.type);
    ogUrl.searchParams.set("mode", og.mode || "dark");
  }

  const fullUrl = absoluteUrl(mdxDoc.url);

  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={fullUrl} />
      <meta name="description" content={ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogUrl.toString()} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:image" content={ogUrl.toString()} />
    </>
  );
}
