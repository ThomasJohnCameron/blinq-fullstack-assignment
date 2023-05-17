import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@database/types";
import { database } from "../../database";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<User>
) {
  res.status(200).json(database.getUser());
}
