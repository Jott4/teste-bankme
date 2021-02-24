import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import connect from "../../database/config";

import User from "../../database/models/User";

import { createJwt } from "../../utils/jwtService";

connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send({ message: "Missing params" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).send({ message: "User not found" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).send({ message: "Invalid password" });

    const token = createJwt({ email: user.email, password: user.password });

    return res
      .status(200)
      .send({ message: "Authenticated", user, token: `Bearer ${token}` });
  }
}
