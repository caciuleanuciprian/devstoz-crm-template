import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icons/icon";
import {
  DropdownMenuItemProps,
  DropdownMenuProps,
} from "@/constants/dashboard/types";

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
        {menus.map((menu: DropdownMenuProps) => (
          <div key={menu.label}>
            {menu.label && <DropdownMenuLabel>{menu.label}</DropdownMenuLabel>}
            {menu.label && <DropdownMenuSeparator />}
            {menu.items.map((item: DropdownMenuItemProps) => (
              <div key={item.name}>
                <DropdownMenuItem onClick={item.fn} className="cursor-pointer">
                  {item.icon && <Icon className="mr-2" icon={item.icon} />}
                  <p className="text-xs">{item.name}</p>
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
