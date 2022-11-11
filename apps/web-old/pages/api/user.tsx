import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { User } from "../../interfaces";
import { serialize, CookieSerializeOptions } from "cookie";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  res.setHeader("Set-Cookie", serialize(name, stringValue, options));
};

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// Fake users data
const users: User[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Calling our pure function using the `res` object, it will add the `set-cookie` header
  setCookie(res, "Next.js", "api-middleware!!");

  res.status(200).json(users);
}
