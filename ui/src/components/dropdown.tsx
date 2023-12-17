import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Icon from "./icon";
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
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="p-0">
          <Icon icon={icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
        {menus.map((menu: DropdownMenuProps) => (
          <>
            {menu.label && <DropdownMenuLabel>{menu.label}</DropdownMenuLabel>}
            {menu.label && <DropdownMenuSeparator />}
            {menu.items.map((item: DropdownMenuItemProps) => (
              <>
                <DropdownMenuItem className="cursor-pointer">
                  {item.icon && <Icon className="mr-2" icon={item.icon} />}
                  <p className="text-xs">{item.name}</p>
                </DropdownMenuItem>
                {item.separator && <DropdownMenuSeparator />}
              </>
            ))}
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
