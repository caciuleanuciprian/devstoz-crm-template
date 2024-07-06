import {
  BarChart3,
  LayoutDashboard,
  Settings,
  UsersRound,
  FileBarChart2,
} from "lucide-react";

export enum LinkIDS {
  DASHBOARD = 0,
  CLIENTS = 1,
  REPORTS = 2,
  DOCUMENTS = 3,
  SETTINGS = 4,
}

export const linksToLabel = (dictionary: any) => {
  return [
    {
      id: 0,
      name: dictionary.Dashboard,
      href: "/dashboard",
      icon: <LayoutDashboard className="w-[1.2rem] h-[1.2rem]" />,
    },
    {
      id: 1,
      name: dictionary.Clients,
      href: "/clients",
      icon: <UsersRound className="w-[1.2rem] h-[1.2rem]" />,
    },
    {
      id: 2,
      name: dictionary.Reports,
      href: "/reports",
      icon: <BarChart3 className="w-[1.2rem] h-[1.2rem]" />,
    },
    {
      id: 3,
      name: dictionary.Documents,
      href: "/documents",
      icon: <FileBarChart2 className="w-[1.2rem] h-[1.2rem]" />,
    },
    {
      id: 4,
      name: dictionary.Settings,
      href: "/settings",
      icon: <Settings className="w-[1.2rem] h-[1.2rem]" />,
    },
  ];
};
