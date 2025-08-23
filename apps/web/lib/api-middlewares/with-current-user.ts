import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from "next-auth/next"
import { z } from 'zod';

// import { authOptions } from "@/lib/auth"

export const schema = z.object({
  userId: z.string(),
});

const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

export function withCurrentUser(handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // const query = await schema.parse(req.query)

      // Check if the user has access to this user.
      // const session = await getServerSession(req, res, authOptions)

      // if (query.userId !== session?.user.id) {
      //   return res.status(403).end()
      // }

      return handler(req, res);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json(error.issues);
      }

      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).end();
    }
  };
}
