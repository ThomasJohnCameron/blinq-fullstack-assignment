import * as HubSpot from "@integration/integrations/hubspot";
import * as Salesforce from "@integration/integrations/salesforce";
import * as Zapier from "@integration/integrations/zapier";
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
