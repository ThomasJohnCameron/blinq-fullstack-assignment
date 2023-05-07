// If you want to add a new integration service, make the type here (mimicing the expected input needed for the service)
// then add it to the integrationSettings type at the bottom.

export interface SalesforceSettings {
  client_id: string;
  client_secret: string;
}

export interface ZapierSettings {
  api_key: string;
}

export interface HubSpotSettings {
  tenant_domain: string;
  client_id: string;
  client_secret: string;
  field_mappings: Record<string, string>;
}

export type IntegrationSettings =
  | { integrationType: "Salesforce"; settings: SalesforceSettings }
  | { integrationType: "Zapier"; settings: ZapierSettings }
  | { integrationType: "HubSpot"; settings: HubSpotSettings };
