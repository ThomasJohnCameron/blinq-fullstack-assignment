import type { Integration, IntegrationName } from "@integration/types";
import type { User, Contact } from "./types";

export class Database {
  private userEnabledIntegrations: Integration[];

  constructor(userEnabledIntegrations?: Integration[]) {
    if (userEnabledIntegrations) {
      this.userEnabledIntegrations = userEnabledIntegrations;
    } else {
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
  }

  public getAvailableIntegrations(): Array<IntegrationName> {
    return ["Salesforce", "HubSpot", "Zapier"];
  }

  public getUserEnabledIntegrations(): Array<Integration> {
    return this.userEnabledIntegrations as Array<Integration>;
  }

  public removeUserIntegration(name: IntegrationName): Array<Integration> {
    this.userEnabledIntegrations = this.userEnabledIntegrations.filter(
      (integration) => integration.name !== name
    );
    return this.userEnabledIntegrations as Array<Integration>;
  }

  public addUserIntegration(newIntegration: Integration): Array<Integration> {
    this.userEnabledIntegrations = this.userEnabledIntegrations.filter(
      (integration) => integration.name !== newIntegration.name
    );
    this.userEnabledIntegrations.push(newIntegration);
    return this.userEnabledIntegrations as Array<Integration>;
  }

  public getUser(): User {
    return {
      id: "12345",
      given_name: "Jane",
      family_name: "Doe",
      email: "jane@blinq.me",
    };
  }

  public getContacts(): Contact[] {
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

export const database = new Database();
