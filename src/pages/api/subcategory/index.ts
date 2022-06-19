import { NextApiRequest, NextApiResponse } from "next";
import { createSubcategory, getSubcategories } from "@lib/subcategories";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;
  switch (method) {
    case "GET":
      const { categoryId } = request.query;
      const subcategories = await getSubcategories(Number(categoryId));
      return response.status(200).json(subcategories);
      break;
    case "POST":
      const { name } = request.body;
      const subcategory = await createSubcategory({
        name,
        categoryId: Number(request.body.categoryId),
      });
      if (subcategory) {
        return response.status(201).json(subcategory);
      }
      return response.status(400).end();
      break;
    default:
      return response.status(404).send({});
      break;
  }
}
