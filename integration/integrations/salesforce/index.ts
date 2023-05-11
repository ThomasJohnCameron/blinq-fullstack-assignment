import { type ConfigureIntegration } from "@integration/util";

export type Name = "Salesforce";
export type Settings = {
  client_id: string;
  client_secret: string;
};
export type Integration = ConfigureIntegration<Name, Settings>;
