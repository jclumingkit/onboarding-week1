import { NextApiRequest, NextApiResponse } from "next";
import supabaseClient from "../../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data, error } = await supabaseClient
      .from("food")
      .select("*")
      .eq("is_public", true);
    console.log(error);
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
