// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { createCategory, getCategories } from "@lib/categories";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;
  switch (method) {
    case "GET":
      const categories = await getCategories();
      return response.status(200).json(categories);
    case "POST":
      const { name, typeId } = request.body;
      const category = await createCategory({ name, typeId });
      return response.status(201).json(category);
  }

  return response.status(200).json({ name: "John Doe" });
}
