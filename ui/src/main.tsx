import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./components/ui-custom/theme-provider.tsx";
import { RecoilRoot } from "recoil";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./routes/error-page.tsx";
import Dashboard from "./routes/dashboard.tsx";
import Clients from "./routes/clients.tsx";
import Reports from "./routes/reports.tsx";
import Settings from "./routes/settings.tsx";

import Authentication from "./routes/authentication.tsx";

import { Toaster } from "./components/ui/toaster.tsx";
import { LanguageProvider } from "./i18n/language-context.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />, // redirect to auth
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/clients",
    element: <Clients />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reports",
    element: <Reports />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/authentication",
    element: <Authentication />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <Settings />,
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
