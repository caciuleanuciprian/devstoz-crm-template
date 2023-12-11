import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { RecoilRoot } from "recoil";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./routes/error-page.tsx";
import Dashboard from "./routes/dashboard.tsx";
import Clients from "./routes/clients.tsx";
import Reports from "./routes/reports.tsx";

import Authentication from "./routes/authentication.tsx";

import { Toaster } from "./components/ui/toaster.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <RecoilRoot>
        {/* <AuthGuard> */}
        {/* <DisclaimerGuard> */}
        <RouterProvider router={router} />
        <Toaster />
        {/* </DisclaimerGuard> */}
        {/* </AuthGuard> */}
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);
