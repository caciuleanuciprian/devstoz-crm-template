import {
  BarChart3,
  LayoutDashboard,
  Settings,
  UsersRound,
  FileBarChart2,
} from "lucide-react";
import { useRecoilState } from "recoil";
import { expandedNavBarAtom } from "./navigation.recoil";

export enum LinkIDS {
  DASHBOARD = 0,
  CLIENTS = 1,
  REPORTS = 2,
  DOCUMENTS = 3,
  SETTINGS = 4,
}

export const linksToLabel = (dictionary: any) => {
  const [expandedNavBar] = useRecoilState(expandedNavBarAtom);
  return [
    {
      id: 0,
      name: expandedNavBar ? dictionary.Dashboard : "",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-[1.2rem] h-[1.2rem]" />,
    },
    {
      id: 1,
      name: expandedNavBar ? dictionary.Clients : "",
      href: "/clients",
      icon: <UsersRound className="w-[1.2rem] h-[1.2rem]" />,
    },
    {
      id: 2,
      name: expandedNavBar ? dictionary.Reports : "",
      href: "/reports",
      icon: <BarChart3 className="w-[1.2rem] h-[1.2rem]" />,
    },
    {
      id: 3,
      name: expandedNavBar ? dictionary.Documents : "",
      href: "/documents",
      icon: <FileBarChart2 className="w-[1.2rem] h-[1.2rem]" />,
    },
    {
      id: 4,
      name: expandedNavBar ? dictionary.Settings : "",
      href: "/settings",
      icon: <Settings className="w-[1.2rem] h-[1.2rem]" />,
    },
  ];
};
