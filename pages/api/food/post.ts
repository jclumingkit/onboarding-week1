import { NextApiRequest, NextApiResponse } from "next";
import { Food, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data: Food = req.body;
    const food: Food = await prisma.food.create({ data: data });
    res.status(200).json(food);
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
