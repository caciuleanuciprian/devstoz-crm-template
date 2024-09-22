import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { MemberProps } from "../../initial-settings/utils/types";

import { Separator } from "@/components/ui/separator";

export const Member = ({ name, email, role }: MemberProps) => {
  return (
    <div className="flex flex-col gap-4 justify-between w-[48%] items-center pointer-events-none">
      <div className="flex w-full gap-4 items-center">
        <Avatar>
          <AvatarFallback className="text-lg !bg-secondary">
            <p className="text-md">
              {name.slice(0, 1)}
              {name.split(" ")[1].slice(0, 1)}
            </p>
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full items-center justify-between">
          <div>
            <p className="text-md">{name}</p>
            <p className="text-xs">{email}</p>
          </div>
          <div className="items-center">
            <p className="text-md text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};
