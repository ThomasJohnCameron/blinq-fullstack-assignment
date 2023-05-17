import { type ConfigureIntegration } from "@integration/util";

export type Name = "HubSpot";
export type Settings = {
  tenant_domain: string;
  client_id: string;
  client_secret: string;
  field_mappings: Record<string, string>;
};
export type Integration = ConfigureIntegration<Name, Settings>;
