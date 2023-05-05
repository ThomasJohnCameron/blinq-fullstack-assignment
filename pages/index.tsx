import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ExpanderPanel from "../components/Expander/Index";

const Home: NextPage = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    integrationType: string
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const settings = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/connect-integration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ integrationType, settings }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("Error connecting integration");
    }
  };

  const [expandedPanel, setExpandedPanel] = useState<number | null>(null);

  const handleToggle = (panelIndex: number) => {
    if (expandedPanel === panelIndex) {
      setExpandedPanel(null);
    } else {
      setExpandedPanel(panelIndex);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Blinq • Integrations</title>
        <meta name="description" content="Manage your Blinq integrations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Blinq</h1>
        <p className={styles.description}>Manage your integrations here</p>

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.grid}>
          <ExpanderPanel
            title="Salesforce"
            expanded={expandedPanel === 1}
            onToggle={() => handleToggle(1)}
          >
            <form
              className={styles.card}
              onSubmit={(event) => handleSubmit(event, "Salesforce")}
            >
              <input name="client_id" placeholder="Client ID" required />
              <input
                name="client_secret"
                placeholder="Client Secret"
                required
              />
              <button type="submit">Connect</button>
            </form>
          </ExpanderPanel>

          <ExpanderPanel
            title="HubSpot"
            expanded={expandedPanel === 2}
            onToggle={() => handleToggle(2)}
          >
            <form
              className={styles.card}
              onSubmit={(event) => handleSubmit(event, "HubSpot")}
            >
              <input
                name="tenant_domain"
                placeholder="Tenant Domain"
                required
              />
              <input name="client_id" placeholder="Client ID" required />
              <input
                name="client_secret"
                placeholder="Client Secret"
                required
              />
              <input
                name="field_mappings"
                placeholder="Field Mappings"
                required
              />
              <button type="submit">Connect</button>
            </form>
          </ExpanderPanel>

          <ExpanderPanel
            title="Zapier"
            expanded={expandedPanel === 3}
            onToggle={() => handleToggle(3)}
          >
            <form
              className={styles.card}
              onSubmit={(event) => handleSubmit(event, "Zapier")}
            >
              <input name="api_key" placeholder="API Key" required />
              <button type="submit">Connect</button>
            </form>
          </ExpanderPanel>
        </div>
      </main>
    </div>
  );
};

export default Home;
