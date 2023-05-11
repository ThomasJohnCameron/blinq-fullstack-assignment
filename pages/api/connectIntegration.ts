import type { NextApiRequest, NextApiResponse } from "next";
import type { Integration } from "@integration/types";
// edit the integration settings type on the integrationTypes.ts file.

type Data = {
  success: boolean;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const requestBody: Integration = req.body;

    res.status(200).json({ success: true, message: "Integration connected" });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
