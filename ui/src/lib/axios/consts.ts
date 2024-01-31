export const USERS_PREFIX = "/users";
export const CLIENTS_PREFIX = "/clients";
export const TRANSACTIONS_PREFIX = "/transactions";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const USERS_URL = `${BASE_URL}${USERS_PREFIX}`;
export const CLIENTS_URL = `${BASE_URL}${CLIENTS_PREFIX}`;
export const TRANSACTIONS_URL = `${BASE_URL}${TRANSACTIONS_PREFIX}`;
