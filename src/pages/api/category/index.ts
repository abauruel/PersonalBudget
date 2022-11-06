// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { createCategory, getCategories } from "@lib/categories";
import {
  getAccessToken,
  withApiAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0";

async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { accessToken } = getSession(request, response);
  console.log("accessToken =>", getSession(request, response));

  const { method } = request;
  switch (method) {
    case "GET":
      const categories = await getCategories();
      return response.status(200).json(categories);
    case "POST":
      const { name, costcenterid } = request.body;
      const category = await createCategory({ name, costcenterid });
      return response.status(201).json(category);
  }

  return response.status(200).json({ name: "John Doe" });
}

export default withApiAuthRequired(handler);
