import { Database } from "../database/index";

// Run this command to work the script. It should log saved settings to the console.
// ts-node testDatabase.ts

const salesforceSettings = {
  client_id: "123",
  client_secret: "abc",
};

const zapierSettings = {
  api_key: "xyz",
};

const hubspotSettings = {
  tenant_domain: "example.com",
  client_id: "456",
  client_secret: "def",
  field_mappings: {
    firstName: "first_name",
    lastName: "last_name",
  },
};

// Set integration settings
Database.setIntegrationSettings("Salesforce", salesforceSettings);
Database.setIntegrationSettings("Zapier", zapierSettings);
Database.setIntegrationSettings("HubSpot", hubspotSettings);

// Get integration settings
const savedSalesforceSettings = Database.getIntegrationSettings("Salesforce");
const savedZapierSettings = Database.getIntegrationSettings("Zapier");
const savedHubspotSettings = Database.getIntegrationSettings("HubSpot");

console.log("Salesforce settings:", savedSalesforceSettings);
console.log("Zapier settings:", savedZapierSettings);
console.log("HubSpot settings:", savedHubspotSettings);
