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

    if (await User.findOne({ email }))
      return res.status(422).send({ message: "User already exists" });

    try {
      const hash = await bcrypt.hash(password, 5);

      const newUser = await User.create({ email, password: hash });

      const token = createJwt({ email: newUser.email, id: newUser._id });

      return res.status(200).json({ user: newUser, token: `Bearer ${token}` });
    } catch (error) {
      console.log(error);
    }
  }
}
