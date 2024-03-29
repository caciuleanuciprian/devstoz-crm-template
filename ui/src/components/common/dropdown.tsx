import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import {
  DropdownMenuItemProps,
  DropdownMenuProps,
} from "@/components/dashboard/utils/types";

interface DropdownProps {
  icon: any;
  menus: DropdownMenuProps[];
}

const Dropdown = ({ icon, menus }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="p-0">
          <Icon icon={icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
        {menus.map((menu: DropdownMenuProps, index: number) => (
          <div key={menu.label}>
            {menu.label && <DropdownMenuLabel>{menu.label}</DropdownMenuLabel>}
            {menu.label && <DropdownMenuSeparator />}
            {menu.items.map((item: DropdownMenuItemProps) => (
              <div key={`${Math.random()}-${index}`}>
                <DropdownMenuItem
                  onClick={item.onClick}
                  className="cursor-pointer"
                >
                  <div className="flex">
                    {item.icon && <Icon className="mr-2" icon={item.icon} />}
                    <div className="text-xs">{item.name}</div>
                  </div>
                </DropdownMenuItem>
                {item.separator && <DropdownMenuSeparator />}
              </div>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
