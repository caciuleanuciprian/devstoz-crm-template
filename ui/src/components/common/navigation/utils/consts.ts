export enum LinkIDS {
  DASHBOARD = 0,
  CLIENTS = 1,
  REPORTS = 2,
  SETTINGS = 3,
}

export const linksToLabel = (dictionary: any) => {
  return [
    { id: 0, name: dictionary.Dashboard, href: "/dashboard" },
    { id: 1, name: dictionary.Clients, href: "/clients" },
    { id: 2, name: dictionary.Reports, href: "/reports" },
    { id: 3, name: dictionary.Settings, href: "/settings" },
  ];
};
