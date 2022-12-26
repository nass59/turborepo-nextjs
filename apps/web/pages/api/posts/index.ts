import { withMethods } from "@lib/api-middlewares/with-methods";
import { authOptions } from "@lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // https://next-auth.js.org/configuration/nextjs#in-api-routes
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  const { user } = session;

  if (req.method === "GET") {
    try {
      return res.json([
        {
          title: "Test title",
          content: "Test content",
          authorId: user.email,
        },
      ]);
    } catch (error) {
      return res.status(500).end();
    }
  }

  if (req.method === "POST") {
    try {
      const body = postSchema.parse(req.body);
      const post = {
        data: {
          title: body.title,
          content: body.content,
          authorId: user.email,
        },
      };

      return res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  }
}

export default withMethods(["GET", "POST"], handler);
