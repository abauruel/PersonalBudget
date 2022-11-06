import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../services/db";
import { z } from "zod";
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method } = request;
  const createUserObject = z.object({
    user: z.object({
      sub: z.string(),
      name: z.string(),
      nickname: z.string(),
      given_name: z.string(),
      family_name: z.string(),
      locale: z.string().optional(),
      email: z.string().optional(),
      picture: z.string(),
    }),
  });
  console.log("body=>", request.body);

  const { user } = createUserObject.parse(request.body);

  //check user exist
  const userRegistered = await prisma.user.findUnique({
    where: {
      sub: user.sub,
    },
  });

  if (!userRegistered) {
    return prisma.user.create({
      data: {
        email: user?.email,
        name: user.name,
        sub: user.sub,
        picture: user?.picture,
        Group: {
          create: {
            name: "group_" + user.family_name.replace(" ", "_"),
          },
        },
      },
    });
    return response.json(userRegistered);
  }

  return response.json(userRegistered);
}
