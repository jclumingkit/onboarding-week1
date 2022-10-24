import { NextApiRequest, NextApiResponse } from "next";
import supabaseClient from "../../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const foodData = req.body;
    const { data, error } = await supabaseClient.from("food").insert(foodData);
    console.log(data);
    console.log(error);
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
