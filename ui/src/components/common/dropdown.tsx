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
import { randomUUID } from "crypto";
import { uuidv4 } from "@/lib/utils";

interface DropdownProps {
  icon: any;
  menus: DropdownMenuProps[];
}

const Dropdown = ({ icon, menus }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
        <Button variant="ghost" size="icon" className="p-0">
          <Icon icon={icon} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {menus.map((menu: DropdownMenuProps, index: number) => (
          <div key={uuidv4()}>
            {menu.label && <DropdownMenuLabel>{menu.label}</DropdownMenuLabel>}
            {menu.label && <DropdownMenuSeparator />}
            {menu.items.map((item: DropdownMenuItemProps) =>
              item ? (
                <div key={uuidv4()}>
                  <DropdownMenuItem
                    onClick={item.onClick}
                    className="cursor-pointer w-full"
                    key={`${Math.random()}-${index}`}
                    disabled={item.isDisabled}
                  >
                    <div className="flex w-full">
                      {item.icon && <Icon className="mr-2" icon={item.icon} />}
                      <div className="text-xs w-full">{item.name}</div>
                    </div>
                  </DropdownMenuItem>
                  {item.separator && <DropdownMenuSeparator />}
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
