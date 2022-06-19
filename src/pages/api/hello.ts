// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  return response.status(200).json({ name: "John Doe" });
}
