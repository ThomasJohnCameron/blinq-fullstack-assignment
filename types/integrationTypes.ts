// integrationTypes.ts

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
  