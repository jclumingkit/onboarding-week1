import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await supabaseClient.from("auth.users").select("*");
    console.log(res);
    res.send(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
