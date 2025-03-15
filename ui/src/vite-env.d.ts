/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_FRONT_END_BASE_URL: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_CLIENT_SECRET: string;
  readonly VITE_BREVO_API_KEY: string;
  readonly VITE_DEMO_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
