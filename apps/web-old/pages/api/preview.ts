import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  slug: string;
  id: number;
  title: string;
  body: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and next parameters
  // This secret should only be known to this API route

  if (req.query.secret !== process.env.PREVIEW_URL_SECRET || !req.query.slug) {
    return res.status(400).json({ message: "Invalid Token" });
  }

  const data: Data = {
    slug: req.query.slug.toString(),
    id: 185,
    title: "Preview post",
    body: "Preview post body",
  };

  res.setPreviewData(data, {
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
    path: "/posts", // The preview mode cookies apply to paths with /posts
  });

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // res.redirect(post.slug);
  res.redirect(data.slug);
}
