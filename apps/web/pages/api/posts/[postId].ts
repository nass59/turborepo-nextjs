import { withMethods } from "@lib/api-middlewares/with-methods";
import { authOptions } from "@lib/auth";
import { postSchema } from "@lib/validation/post";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { z } from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  if (req.method === "PATCH") {
    try {
      const postId = req.query.postId as string;
      const post = {
        title: "Test Title",
        content: "Test content",
      };

      const body = postSchema.parse(req.body);

      return res.end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  }

  if (req.method === "DELETE") {
    try {
      return res.status(204).end();
    } catch (error) {
      return res.status(500).end();
    }
  }
}

export default withMethods(["PATCH", "DELETE"], handler);
