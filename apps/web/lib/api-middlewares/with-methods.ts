import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const METHOD_NOT_ALLOWED = 405;

export function withMethods(methods: string[], handler: NextApiHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (!methods.includes(req.method || '')) {
      return res.status(METHOD_NOT_ALLOWED).end();
    }

    return handler(req, res);
  };
}
