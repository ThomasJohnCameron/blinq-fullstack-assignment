import { type ConfigureIntegration } from "@integration/util";

export type Name = "Zapier";
export type Settings = {
  api_key: string;
};
export type Integration = ConfigureIntegration<Name, Settings>;
export const enableZapier = (i: Integration) => {
  console.log("enabling zapier");
};
