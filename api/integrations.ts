import type { NextApiRequest, NextApiResponse } from "next";
import { parseName } from "@integration/types";
import type { Integration, IntegrationName } from "@integration/types";
import { type Database } from "../database";

export default function handler(
  database: Database,
  req: NextApiRequest,
  res: NextApiResponse
): NextApiResponse {
  if (req.method === "POST") {
    const integration = req.body?.integration;
    const name = parseName(integration?.name);
    if (name === null) {
      res.status(400);
      res.json({ message: "Bad request", body: req.body });
      return res;
    }
    // More validation logic can go here

    const userEnabledIntegrations = database.addUserIntegration(
      integration as Integration
    );
    const message = `Added integration for ${integration.name}`;
    console.log(message);
    res.status(200);
    res.json({ message, userEnabledIntegrations });
  } else if (req.method === "DELETE") {
    const name = parseName(req.body?.name);
    if (name === null) {
      res.status(400);
      res.json({ message: "Bad request", body: req.body });
      return res;
    }
    // More validation logic can go here

    const userEnabledIntegrations = database.removeUserIntegration(
      name as IntegrationName
    );
    const message = `Removed integration for ${name}`;
    console.log(message);
    res.status(200);
    res.json({ message, userEnabledIntegrations });
  } else {
    // Handle any other HTTP method
    res.status(405);
    res.json({ message: "Method not allowed" });
  }
  return res;
}
