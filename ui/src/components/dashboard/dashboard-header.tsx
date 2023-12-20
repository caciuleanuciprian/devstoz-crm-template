import { Bell, PlusSquare, UserRoundPlus } from "lucide-react";
import Dropdown from "@/components/ui-custom/dropdown";
import { DropdownMenuProps } from "@/constants/dashboard/types";
import Icon from "@/components/icons/icon";

const DashboardHeader = () => {
  const DROPDOWN_MENUS: DropdownMenuProps[] = [
    {
      label: "Clients",
      items: [
        {
          name: "Add Client",
          icon: <UserRoundPlus className="h-[1.2rem] w-[1.2rem]" />,
        },
        {
          name: "Other menus",
          icon: <PlusSquare className="h-[1.2rem] w-[1.2rem]" />,
        },
      ],
    },
  ];
  return (
    <div className="flex justify-between h-[5vh] mb-4 pt-4 items-center ">
      <p>Dashboard</p>
      <div className="flex justify-center items-center gap-2">
        <Icon icon={<Bell className="h-[1.2rem] w-[1.2rem] " />} />
        <Dropdown
          icon={<PlusSquare className="h-[1.2rem] w-[1.2rem]" />}
          menus={DROPDOWN_MENUS}
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
