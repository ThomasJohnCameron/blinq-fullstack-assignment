import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  message: string;
};

interface SalesforceSettings {
  client_id: string;
  client_secret: string;
}

interface ZapierSettings {
  api_key: string;
}

interface HubSpotSettings {
  tenant_domain: string;
  client_id: string;
  client_secret: string;
  field_mappings: Record<string, string>;
}

type IntegrationSettings =
  | { integrationType: "Salesforce"; settings: SalesforceSettings }
  | { integrationType: "Zapier"; settings: ZapierSettings }
  | { integrationType: "HubSpot"; settings: HubSpotSettings };

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
