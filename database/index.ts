import type { Integration, IntegrationName } from "@integration/types";

export interface User {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
}

export interface Contact {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
  met_at_location: string;
  notes?: string;
}

export class Database {
  private userEnabledIntegrations: Array<Integration>;

  constructor() {
    this.userEnabledIntegrations = [
      {
        name: "Salesforce",
        settings: {
          client_id: "12345",
          client_secret: "12345",
        },
      },
    ];
  }

  public static getAvaliableIntegrations(): Array<IntegrationName> {
    return ["Salesforce", "HubSpot", "Zapier"];
  }

  getUserEnabledIntegrations(): Array<Integration> {
    return this.userEnabledIntegrations as Array<Integration>;
  }

  removeUserIntegration(name: IntegrationName): Array<Integration> {
    this.userEnabledIntegrations = this.userEnabledIntegrations.filter(
      (integration) => integration.name !== name
    );
    return this.userEnabledIntegrations as Array<Integration>;
  }

  addUserIntegration(newIntegration: Integration): Array<Integration> {
    this.userEnabledIntegrations = this.userEnabledIntegrations.filter(
      (integration) => integration.name !== newIntegration.name
    );
    this.userEnabledIntegrations.push(newIntegration);
    return this.userEnabledIntegrations as Array<Integration>;
  }

  public static getUser(): User {
    return {
      id: "12345",
      given_name: "Jane",
      family_name: "Doe",
      email: "jane@blinq.me",
    };
  }

  public static getContacts(): Contact[] {
    return [
      {
        id: "1234",
        given_name: "Terry",
        family_name: "Walker",
        email: "terry@waffles.co",
        met_at_location: "Melbourne, Australia",
        notes: "Terry has a beard.",
      },
      {
        id: "1235",
        given_name: "Terry",
        family_name: "Walker",
        email: "terry@waffles.co",
        met_at_location: "Melbourne, Australia",
        notes: "Terry has a beard.",
      },
    ];
  }
}
