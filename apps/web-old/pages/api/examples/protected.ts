import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    res.send({
      content:
        "This is a protected content. You can access this content because you are signed in.",
    });

    return;
  }

  res.status(401).send({
    error: "You must be signed in to view the protected content on this page.",
  });
}
