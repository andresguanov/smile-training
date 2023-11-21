export type EnvFile = {
  local: EnvKeyObject;
  testing: EnvKeyObject;
  production: EnvKeyObject;
};

export type EnvKeyObject = {
  GTM_ID?: string;
  HUBSPOT_ID?: string;
  BASE_API_URL?: string;
  BASE_URL?: string;
  BASE_API_CONFIG_URL?: string;
  BASE_API_CONTACTS_URL?: string;
  COOKIE_TOKEN?: string;
  COOKIE_NOTIFICATION?: string;
  CHAT_COOKIE?: string;
};
