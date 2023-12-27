import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/common/theme-provider.tsx";
import { RecoilRoot } from "recoil";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/index.css";

import { Toaster } from "@/components/ui/toaster.tsx";
import { LanguageProvider } from "@/i18n/language-context.tsx";

import { PagesURL } from "@/components/authentication/utils/consts.ts";
import DashboardPage from "@/routes/dashboard.tsx";
import AuthenticationPage from "@/routes/authentication.tsx";
import ClientsPage from "@/routes/clients.tsx";
import ReportsPage from "@/routes/reports.tsx";
import SettingsPage from "@/routes/settings.tsx";
import ErrorPage from "@/routes/error-page.tsx";

const router = createBrowserRouter([
  {
    path: PagesURL.AUTHENTICATION,
    element: <AuthenticationPage />, // redirect to auth
    errorElement: <ErrorPage />,
  },
  {
    path: PagesURL.DASHBOARD,
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PagesURL.CLIENTS,
    element: <ClientsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PagesURL.REPORTS,
    element: <ReportsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PagesURL.SETTINGS,
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <LanguageProvider>
        <RecoilRoot>
          <RouterProvider router={router} />
          <Toaster />
        </RecoilRoot>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
