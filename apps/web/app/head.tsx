import { DefaultTags } from "@ui/DefaultTags";

export default function Head() {
  return (
    <>
      <DefaultTags />
      <title>TechShip</title>
      <meta
        name="description"
        content="An open source application built using the new router, server components and everything new in Next.js 13."
      />
      <meta property="og:title" content="TechShip" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://turborepo-nextjs.vercel.app/" />
      <meta
        property="og:image"
        content="https://turborepo-nextjs.vercel.app/og.jpg"
      />
      <meta name="twitter:title" content="TechShip" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://turborepo-nextjs.vercel.app/"
      />
      <meta
        name="twitter:image"
        content="https://turborepo-nextjs.vercel.app/og.jpg"
      />
    </>
  );
}
