import type { NextApiRequest, NextApiResponse } from "next";

import connect from "../../database/config";

import User from "../../database/models/User";
import Nfe from "../../database/models/Nfe";

import { verifyJwt } from "../../utils/jwtService";

connect();

const jwtMiddleware = async (res: NextApiResponse, jwt: string | undefined) => {
  console.log(jwt)
  if (!jwt) return res.status(400).send({ message: "Missing token" });

  if (!verifyJwt(jwt))
    return res.status(401).send({ message: "Invalid token" });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await jwtMiddleware(res, req.headers.authorization);

  if (req.method === "POST") {
    const {
      emitterName,
      emitterCNPJ,
      receiverName,
      receiverCNPJ,
      emissionDate,
      amount,
      userId,
    } = req.body;

    if (
      !emitterName ||
      !emitterCNPJ ||
      !receiverName ||
      !receiverCNPJ ||
      !emissionDate ||
      !amount ||
      !userId
    )
      return res.status(400).send({ message: "Missing params" });

    const user = await User.findById(userId);

    if (!user) return res.status(404).send({ message: "User not found" });

    try {
      const nfe = await Nfe.create({
        emitterName,
        emitterCNPJ,
        receiverName,
        receiverCNPJ,
        emissionDate,
        amount,
        userId: user.id,
      });

      return res.status(200).json({ nfe });
    } catch (error) {
      console.log(error);
    }
  }

  if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId) return res.status(404).send({ message: "Missing params" });

    const user = await User.findById(userId);

    if (!user) return res.status(404).send({ message: "User not found" });

    try {
      const nfes = (await Nfe.find({ userId: user.id })) || [];

      return res.status(200).json({ nfes });
    } catch (error) {
      console.log(error);
    }
  }
}
