import { PlusSquare } from "lucide-react";
import Dropdown from "../dropdown";
import { DropdownMenuProps } from "@/constants/dashboard/types";

const DashboardHeader = () => {
  const DROPDOWN_MENUS: DropdownMenuProps[] = [
    {
      label: "Clients",
      items: [
        { name: "Add Client", icon: <PlusSquare /> },
        { name: "Other menus", icon: <PlusSquare /> },
      ],
    },
  ];
  return (
    <div className="flex justify-between h-[5vh] mb-4 pt-4 items-center ">
      <p>Dashboard</p>
      <Dropdown icon={<PlusSquare />} menus={DROPDOWN_MENUS} />
    </div>
  );
};

export default DashboardHeader;
