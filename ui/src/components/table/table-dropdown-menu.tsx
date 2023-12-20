import { ArrowRight, Mail, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TableDropDownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-[1.2rem] w-[1.2rem] p-0">
          <MoreHorizontal className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ArrowRight className="mr-2 h-[1.2rem] w-[1.2rem]" />
            <span>View</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail className="mr-2 h-[1.2rem] w-[1.2rem]" />
            <span>Send email</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash className="mr-2 h-[1.2rem] w-[1.2rem]" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableDropDownMenu;
