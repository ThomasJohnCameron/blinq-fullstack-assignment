import { useState, useCallback, useEffect, useRef } from "react";
import type { NextPage, GetServerSidePropsContext } from "next";
import type { IntegrationName, Integration } from "@integration/types";
import { UnreachableCaseError } from "@utils/types";
import syntheticNextFetch from "@utils/syntheticNextFetch";
import { User } from "../database/types";
import { Database, database } from "../database";
import integrations from "@api/integrations";

import Head from "next/head";
import styles from "@styles/Home.module.css";
import ExpanderPanel from "../components/Expander";

import { AddHubSpot, EditHubSpot } from "@integration/hubspot/settings";
import {
  AddSalesforce,
  EditSalesforce,
} from "@integration/salesforce/settings";
import { AddZapier, EditZapier } from "@integration/zapier/settings";

const addSettingsForm = (
  name: IntegrationName,
  addIntegration: (integration: Integration) => void
) => {
  switch (name) {
    case "HubSpot": {
      return <AddHubSpot name={name} addIntegration={addIntegration} />;
    }
    case "Salesforce": {
      return <AddSalesforce name={name} addIntegration={addIntegration} />;
    }
    case "Zapier": {
      return <AddZapier name={name} addIntegration={addIntegration} />;
    }
    default:
      throw new UnreachableCaseError(name);
  }
};

const editSettingsform = (
  integration: Integration,
  addIntegration: (integration: Integration) => void,
  removeIntegration: (name: IntegrationName) => void
) => {
  switch (integration.name) {
    case "HubSpot": {
      return (
        <EditHubSpot
          integration={integration}
          addIntegration={addIntegration}
          removeIntegration={removeIntegration}
        />
      );
    }
    case "Salesforce": {
      return (
        <EditSalesforce
          integration={integration}
          addIntegration={addIntegration}
          removeIntegration={removeIntegration}
        />
      );
    }
    case "Zapier": {
      return (
        <EditZapier
          integration={integration}
          addIntegration={addIntegration}
          removeIntegration={removeIntegration}
        />
      );
    }
    default:
      throw new UnreachableCaseError(integration);
  }
};

type Props = {
  user: User;
  availableIntegrations: IntegrationName[];
  userEnabledIntegrations: Integration[];
};

const ignore = (_value: any) => undefined;

const Home: NextPage<Props> = ({
  user,
  availableIntegrations,
  userEnabledIntegrations,
}) => {
  const [userIntegrations, setUserIntegrations] = useState(
    () => userEnabledIntegrations
  );

  /*
    Since we don't have DB persistance,
    We can hijack the normal fetch
    and constuct the DB using react state.
    If the DB persists we can just remove this effect.
  */
  useEffect(() => {
    syntheticNextFetch({
      "/api/integrations": (req, res) => {
        return integrations(new Database(userIntegrations), req, res);
      },
    });
  }, [userIntegrations]);

  const addIntegration = useCallback(
    async (integration: Integration) => {
      ignore(userIntegrations);
      try {
        const response = await fetch("/api/integrations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ integration }),
        });

        const result = await response.json();
        setUserIntegrations(() => result.body.userEnabledIntegrations);
      } catch (error) {
        console.log("addIntegration error", error);
      }
    },
    [userIntegrations]
  );

  const removeIntegration = useCallback(
    async (name: IntegrationName) => {
      ignore(userIntegrations);
      try {
        const response = await fetch("/api/integrations", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });

        const result = await response.json();
        setUserIntegrations(() => result.body.userEnabledIntegrations);
      } catch (error) {
        console.log("removeIntegration error", error);
      }
    },
    [userIntegrations]
  );

  const [expandedPanel, setExpandedPanel] = useState<number | null>(null);

  const handleToggleExpander = (panelIndex: number) => {
    if (expandedPanel === panelIndex) {
      setExpandedPanel(null);
    } else {
      setExpandedPanel(panelIndex);
    }
  };

  return (
    <>
      <Head>
        <title>Blinq • Integrations</title>
        <meta name="description" content="Manage your Blinq integrations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Blinq</h1>
          <p>Welcome back, {user.given_name}</p>
          <p className={styles.description}>Manage your integrations</p>

          <div className={styles.grid}>
            {availableIntegrations.map(
              (name: IntegrationName, index: number) => {
                const userIntegration: Integration | undefined =
                  userIntegrations.find((i: Integration) => i.name === name);
                return (
                  <ExpanderPanel
                    key={name}
                    title={
                      <span>
                        {name}
                        {userIntegration && (
                          <span className={styles.chip}>enabled</span>
                        )}
                      </span>
                    }
                    expanded={expandedPanel === index}
                    onToggle={() => handleToggleExpander(index)}
                  >
                    {userIntegration
                      ? editSettingsform(
                          userIntegration,
                          addIntegration,
                          removeIntegration
                        )
                      : addSettingsForm(name, addIntegration)}
                  </ExpanderPanel>
                );
              }
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  return {
    props: {
      user: database.getUser(),
      availableIntegrations: database.getAvailableIntegrations(),
      userEnabledIntegrations: database.getUserEnabledIntegrations(),
    },
  };
}
