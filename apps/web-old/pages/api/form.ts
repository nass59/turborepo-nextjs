import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get data submitted in request's body.
  const { body } = req;

  if (!body.first || !body.last) {
    return res.status(400).json({ data: "First or last name not found" });
  }

  return res.status(200).json({ data: `${body.first} ${body.last}` });
}
