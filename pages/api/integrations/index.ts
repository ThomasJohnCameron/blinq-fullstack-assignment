import type { NextApiRequest, NextApiResponse } from "next";
import { parseName } from "@integration/types";
import type { Integration, IntegrationName } from "@integration/types";
import { database } from "../../../database";
import integrations from "@api/integrations";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  integrations(database, req, res);
}
