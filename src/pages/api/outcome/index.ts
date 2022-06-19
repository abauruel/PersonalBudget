import { NextApiRequest, NextApiResponse } from "next";
import { createCategory, getCategories } from "@lib/categories";
import { createType } from "@lib/types";
import { createPaymentType, getPaymentTypes } from "@lib/paymentTypes";
import { createOutcome, getOutcomeByMonth } from "@lib/outcome";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;

  if (method == "POST") {
    const data = request.body;
    const typeCreated = await createOutcome(data);
    if (typeCreated) {
      return response.status(201).json(typeCreated);
    } else {
      return response.status(400).end();
    }
  }

  if (method == "GET") {
    const calendatr = new Date();
    const outcomes = await getOutcomeByMonth(calendatr);

    return response.status(200).json(outcomes);
  }

  return response.status(404).end();
}
