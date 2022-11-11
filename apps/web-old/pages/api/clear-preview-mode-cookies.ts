import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.end("Cookies cleared");
}
