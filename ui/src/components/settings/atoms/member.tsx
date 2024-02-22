import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LanguageContext } from "@/i18n/language-context";
import { useContext, useState } from "react";
import { MemberProps } from "../../initial-settings/utils/types";
import {
  selectRoleOptions,
  valueToLabelRole,
} from "../../initial-settings/utils/consts";
import { Modal } from "@/components/common/modal";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Member = ({ isReadonly, name, email, role }: MemberProps) => {
  const [memberRole, setMemberRole] = useState<string>(role);
  const { dictionary } = useContext(LanguageContext);
  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <div className="flex gap-4 justify-between w-full items-center">
      <div className="flex w-full gap-4 items-center">
        <Avatar>
          <AvatarFallback className="text-lg !bg-secondary">
            <p className="text-md">
              {name.slice(0, 1)}
              {name.split(" ")[1].slice(0, 1)}
            </p>
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-md">{name}</p>
          <p className="text-xs">{email}</p>
        </div>
      </div>
      <div className="flex w-full gap-4 items-center">
        <Select
          onValueChange={(e: any) => setMemberRole(e)}
          value={memberRole}
          disabled={isReadonly}
        >
          <SelectTrigger className="h-9">
            <SelectValue placeholder={dictionary.Role} />
          </SelectTrigger>
          <SelectContent>
            {selectRoleOptions.map((option: string) => (
              <SelectItem key={option} value={option}>
                {valueToLabelRole(option, dictionary)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Modal
          trigger={
            <Button variant={"ghost"} size={"xs"}>
              <Trash className="h-[1.2rem] w-[1.2rem] text-destructive" />
            </Button>
          }
          title={dictionary.DeleteMember}
          description={dictionary.DeleteMemberConfirmation}
          confirmTxt={dictionary.Delete}
          cancelTxt={dictionary.Cancel}
          onConfirm={handleDelete}
          isDelete
        />
      </div>
    </div>
  );
};
