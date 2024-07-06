import { PagesURL } from "@/components/authentication/utils/consts";
import { createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "./authentication";
import ClientsPage from "./clients";
import DashboardPage from "./dashboard";
import ErrorPage from "./error-page";
import ReportsPage from "./reports";
import SettingsPage from "./settings";
import { ClientDetailsPage } from "./client-details";
import { OauthRedirectPage } from "./oauth-redirect";
import { InitialSettingsPage } from "./initial-settings";
import { OrganizationSelectionPage } from "./organization-selection";
import DocumentsPage from "./documents";

export const router = createBrowserRouter([
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
    path: `${PagesURL.CLIENTS}/:clientId`,
    element: <ClientDetailsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PagesURL.REPORTS,
    element: <ReportsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PagesURL.DOCUMENTS,
    element: <DocumentsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PagesURL.SETTINGS,
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PagesURL.OAUTH2_REDIRECT,
    element: <OauthRedirectPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PagesURL.INITIAL_SETTINGS,
    element: <InitialSettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: PagesURL.ORGANIZATION_SELECTION,
    element: <OrganizationSelectionPage />,
    errorElement: <ErrorPage />,
  },
]);
