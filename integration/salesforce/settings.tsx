import type {
  AddIntegrationComponentProps,
  EditIntegrationComponentProps,
} from "@integration/types";
import type { Integration as SalesforceIntegration, Name } from "./index";
import styles from "@styles/Home.module.css";

export const AddSalesforce: React.FC<AddIntegrationComponentProps<Name>> = ({
  addIntegration,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const client_id = data.get("client_id") as string;
    const client_secret = data.get("client_secret") as string;

    const integration: SalesforceIntegration = {
      name: "Salesforce",
      settings: {
        client_id,
        client_secret,
      },
    };
    addIntegration(integration);
  };
  return (
    <>
      <h3>Add integration</h3>
      <form className={styles.card} onSubmit={handleSubmit}>
        <input name="client_id" placeholder="Client ID" required />
        <input name="client_secret" placeholder="Client Secret" required />
        <button className={styles.button} type="submit">
          Connect Salesforce
        </button>
      </form>
    </>
  );
};

export const EditSalesforce: React.FC<
  EditIntegrationComponentProps<SalesforceIntegration>
> = ({ integration, addIntegration, removeIntegration }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const client_id = data.get("client_id") as string;
    const client_secret = data.get("client_secret") as string;

    const integration: SalesforceIntegration = {
      name: "Salesforce",
      settings: {
        client_id,
        client_secret,
      },
    };
    addIntegration(integration);
  };
  return (
    <>
      <h3>Update</h3>
      <form className={styles.card} onSubmit={handleSubmit}>
        <input
          name="tenant_domain"
          placeholder="Tenant Domain"
          required
          type="url"
        />
        <input name="client_id" placeholder="Client ID" required />
        <input name="client_secret" placeholder="Client Secret" required />
        <button className={styles.button} type="submit">
          Update Salesforce Integration
        </button>
      </form>
      <h3>Remove</h3>
      <button
        className={styles.button}
        type="button"
        onClick={() => removeIntegration(integration.name)}
      >
        Remove Salesforce Integration
      </button>
    </>
  );
};
