import { NextApiRequest, NextApiResponse } from "next";
import supabaseClient from "../../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId } = req.body;
    const { data, error } = await supabaseClient
      .from("user_profiles")
      .insert({ id: userId, avatar_id: null })
      .eq("id", userId);
    console.log(error);
    console.log(data);
    res.send(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
