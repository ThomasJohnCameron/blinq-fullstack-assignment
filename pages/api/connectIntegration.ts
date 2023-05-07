import type { NextApiRequest, NextApiResponse } from "next";
import { IntegrationSettings } from "../../types/integrationTypes";

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
    const requestBody: IntegrationSettings = req.body;

    const { integrationType, settings } = requestBody;

    res.status(200).json({ success: true, message: "Integration connected" });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
