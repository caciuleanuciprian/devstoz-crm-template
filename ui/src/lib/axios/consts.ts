export const USERS_PREFIX = "/users";
export const CLIENTS_PREFIX = "/clients";
export const TRANSACTIONS_PREFIX = "/transactions";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_URL_AUTHORIZED = `${BASE_URL}/authorized`;

export const FRONT_END_BASE_URL = import.meta.env.VITE_FRONT_END_BASE_URL;

export const USERS_URL = `${BASE_URL_AUTHORIZED}${USERS_PREFIX}`;
export const CLIENTS_URL = `${BASE_URL_AUTHORIZED}${CLIENTS_PREFIX}`;
export const TRANSACTIONS_URL = `${BASE_URL_AUTHORIZED}${TRANSACTIONS_PREFIX}`;

export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
