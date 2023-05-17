import type {
  AddIntegrationComponentProps,
  EditIntegrationComponentProps,
} from "@integration/types";
import type { Integration as HubspotIntegration, Name } from "./index";
import styles from "@styles/Home.module.css";

export const AddHubSpot: React.FC<AddIntegrationComponentProps<Name>> = ({
  addIntegration,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const tenant_domain = data.get("tenant_domain") as string;
    const client_id = data.get("client_id") as string;
    const client_secret = data.get("client_secret") as string;
    // const field_mappings = data.get("field_mappings") as string;

    const integration: HubspotIntegration = {
      name: "HubSpot",
      settings: {
        tenant_domain,
        client_id,
        client_secret,
        field_mappings: {},
      },
    };
    addIntegration(integration);
  };
  return (
    <>
      <h3>Add integration</h3>
      <form className={styles.card} onSubmit={handleSubmit}>
        <input
          name="tenant_domain"
          placeholder="Tenant Domain"
          required
          type="url"
        />
        <input name="client_id" placeholder="Client ID" required />
        <input name="client_secret" placeholder="Client Secret" required />
        {/* <input name="field_mappings" placeholder="Field Mappings" required /> */}
        <button type="submit">Connect HubSpot</button>
      </form>
    </>
  );
};

export const EditHubSpot: React.FC<
  EditIntegrationComponentProps<HubspotIntegration>
> = ({ integration, addIntegration, removeIntegration }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const tenant_domain = data.get("tenant_domain") as string;
    const client_id = data.get("client_id") as string;
    const client_secret = data.get("client_secret") as string;
    // const field_mappings = data.get("field_mappings") as string;

    const integration: HubspotIntegration = {
      name: "HubSpot",
      settings: {
        tenant_domain,
        client_id,
        client_secret,
        field_mappings: {},
      },
    };
    addIntegration(integration);
  };
  return (
    <>
      <h3>Remove</h3>
      <button type="button" onClick={() => removeIntegration(integration.name)}>
        Remove HubSpot Integration
      </button>
      <h3>Edit</h3>
      <form className={styles.card} onSubmit={handleSubmit}>
        <input
          name="tenant_domain"
          placeholder="Tenant Domain"
          required
          type="url"
        />
        <input name="client_id" placeholder="Client ID" required />
        <input name="client_secret" placeholder="Client Secret" required />
        {/* <input name="field_mappings" placeholder="Field Mappings" required /> */}
        <button type="submit">Update HubSpot Integration</button>
      </form>
    </>
  );
};
