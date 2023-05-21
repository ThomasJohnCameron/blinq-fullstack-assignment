import type {
  AddIntegrationComponentProps,
  EditIntegrationComponentProps,
} from "@integration/types";
import type { Integration as ZapierIntegration, Name } from "./index";
import styles from "@styles/Home.module.css";

export const AddZapier: React.FC<AddIntegrationComponentProps<Name>> = ({
  addIntegration,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const api_key = data.get("api_key") as string;

    const integration: ZapierIntegration = {
      name: "Zapier",
      settings: {
        api_key,
      },
    };
    addIntegration(integration);
  };
  return (
    <>
      <h3>Add integration</h3>
      <form className={styles.card} onSubmit={handleSubmit}>
        <input name="api_key" placeholder="API Key" required />
        <button className={styles.button} type="submit">
          Connect Zapier
        </button>
      </form>
    </>
  );
};

export const EditZapier: React.FC<
  EditIntegrationComponentProps<ZapierIntegration>
> = ({ integration, addIntegration, removeIntegration }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const api_key = data.get("api_key") as string;

    const integration: ZapierIntegration = {
      name: "Zapier",
      settings: {
        api_key,
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
          Update Zapier Integration
        </button>
      </form>
      <h3>Remove</h3>
      <button
        className={styles.button}
        type="button"
        onClick={() => removeIntegration(integration.name)}
      >
        Remove Zapier Integration
      </button>
    </>
  );
};
