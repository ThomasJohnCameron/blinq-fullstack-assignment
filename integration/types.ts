import * as HubSpot from "@integration/hubspot";
import * as Salesforce from "@integration/salesforce";
import * as Zapier from "@integration/zapier";
import type { Extends } from "@utils/types";

type BaseIntegration = {
  readonly name: string;
  settings: unknown;
};

type IntegrationVariants =
  | Salesforce.Integration
  | Zapier.Integration
  | HubSpot.Integration;

export type Integration = Extends<IntegrationVariants, BaseIntegration>;

export type IntegrationName = Integration["name"];

export type AddIntegrationComponentProps<Name> = {
  name: Name;
  addIntegration: (integration: Integration) => void;
};

export type EditIntegrationComponentProps<I> = {
  integration: I;
  addIntegration: (integration: Integration) => void;
  removeIntegration: (name: IntegrationName) => void;
};

export const parseName = (name: string | null): IntegrationName | null => {
  switch (name) {
    case "HubSpot":
    case "Salesforce":
    case "Zapier": {
      return name;
    }
    default:
      return null;
  }
};
