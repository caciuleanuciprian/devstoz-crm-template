export const USERS_PREFIX = "/users";
export const CLIENTS_PREFIX = "/clients";
export const TRANSACTIONS_PREFIX = "/transactions";
export const ROLES_PREFIX = "/roles";
export const ORGANIZATION_PREFIX = "/organizations";
export const PDF_PREFIX = "/pdfs";
export const DOCUMENTS_PREFIX = "/documents";
export const REPORTS_PREFIX = "/reports";
export const MAIL_PREFIX = "/mail";
export const AUTH_PREFIX = "/auth";

export const BASE_URL =
  localStorage.getItem("isDemo") === "true" &&
  location.hostname === import.meta.env.VITE_DEMO_URL
    ? import.meta.env.VITE_DEMO_BASE_URL
    : import.meta.env.VITE_BASE_URL;
export const BASE_URL_AUTHORIZED = `${BASE_URL}/authorized`;

export const FRONT_END_BASE_URL = `${window.location.origin}`;

export const USERS_URL = `${BASE_URL_AUTHORIZED}${USERS_PREFIX}`;
export const CLIENTS_URL = `${BASE_URL_AUTHORIZED}${CLIENTS_PREFIX}`;
export const TRANSACTIONS_URL = `${BASE_URL_AUTHORIZED}${TRANSACTIONS_PREFIX}`;
export const ROLES_URL = `${BASE_URL_AUTHORIZED}${ROLES_PREFIX}`;
export const ORGANIZATION_URL = `${BASE_URL_AUTHORIZED}${ORGANIZATION_PREFIX}`;
export const REPORTS_URL = `${BASE_URL_AUTHORIZED}${REPORTS_PREFIX}`;
export const MAIL_URL = `${BASE_URL_AUTHORIZED}${MAIL_PREFIX}`;
export const PDF_URL = `${BASE_URL_AUTHORIZED}${PDF_PREFIX}`;
export const AUTH_URL = `${BASE_URL}${AUTH_PREFIX}`;

export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
