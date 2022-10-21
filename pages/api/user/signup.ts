import { NextApiRequest, NextApiResponse } from "next";
import { supabaseClient } from "../../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });
    console.log(error);
    res.send(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
