import { type ConfigureIntegration } from "@integration/util";
import { type Result, ok, err } from "@utils/types";

export type Name = "HubSpot";
export type Settings = {
  tenant_domain: string;
  client_id: string;
  client_secret: string;
  field_mappings: Record<string, string>;
};
export type Integration = ConfigureIntegration<Name, Settings>;
export const parseSettings = (i: Integration): Result<string[], Settings> => {
  if (Math.random() > 0.5) {
    return ok(i.settings);
  }
  return err(["invalid tenant domain"]);
};
