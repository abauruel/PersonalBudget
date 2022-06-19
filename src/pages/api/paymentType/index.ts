import { NextApiRequest, NextApiResponse } from "next";
import { createCategory, getCategories } from "@lib/categories";
import { createType } from "@lib/types";
import { createPaymentType, getPaymentTypes } from "@lib/paymentTypes";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;

  if (method == "POST") {
    const { name } = request.body;
    const typeCreated = await createPaymentType(name);
    if (typeCreated) {
      return response.status(201).json(typeCreated);
    } else {
      return response.status(400).end();
    }
  }

  if (method == "GET") {
    const paymentTypes = await getPaymentTypes();

    return response.status(200).json(paymentTypes);
  }

  return response.status(404).end();
}
