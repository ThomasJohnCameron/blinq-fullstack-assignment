export type ConfigureIntegration<Name extends string, Settings> = {
  readonly name: Name;
  settings: Settings;
};
