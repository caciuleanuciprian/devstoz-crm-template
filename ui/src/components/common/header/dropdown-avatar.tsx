import { userDetailsAtom } from "@/components/authentication/utils/authentication.recoil";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRecoilState } from "recoil";

enum UserRoles {
  ADMIN = "Administrator",
  USER = "User",
}

export const HeaderAvatar = () => {
  const [userDetails] = useRecoilState(userDetailsAtom);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer bg-background" asChild>
        <div className="flex items-center gap-2 p-2 rounded-md">
          <Avatar>
            <AvatarFallback className="text-lg !bg-secondary">
              <p className="text-md">
                {userDetails?.name.slice(0, 1)}
                {userDetails?.name.split(" ")[1].slice(0, 1)}
              </p>
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center">
            <div>
              <p>{userDetails?.name}</p>
              <p className="text-xs text-muted-foreground">
                {userDetails?.email}
              </p>
            </div>
            <ChevronDown />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-muted-foreground">
          {UserRoles.ADMIN}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
