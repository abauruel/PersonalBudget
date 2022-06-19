import { NextApiRequest, NextApiResponse } from "next";
import { createCategory, getCategories } from "@lib/categories";
import { createType } from "@lib/types";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;

  if (method == "POST") {
    const { name } = request.body;
    const typeCreated = await createType(name);
    return response.status(201).json(typeCreated);
  } else {
    return response.status(404);
  }
}
