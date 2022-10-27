import { NextApiRequest, NextApiResponse } from "next";
import supabaseClient from "../../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { avatarId, userId } = req.body;
    const { error } = await supabaseClient
      .from("user_profiles")
      .update({ avatar_id: avatarId })
      .eq("id", userId);
    res.send(error);
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
