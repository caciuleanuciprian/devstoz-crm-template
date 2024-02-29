import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { LanguageContext } from "@/i18n/language-context";
import { useContext, useState } from "react";
import { MemberProps } from "../../initial-settings/utils/types";
import {
  selectRoleOptions,
  valueToLabelRole,
} from "../../initial-settings/utils/consts";
import { Modal } from "@/components/common/modal";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAxios from "@/lib/axios/useAxios";
import { AddMember } from "../core/settings.service";
import { UserRoles } from "../utils/types";
import {
  selectedOrganizationAtom,
  userDetailsAtom,
} from "@/components/authentication/utils/authentication.recoil";
import { useRecoilState } from "recoil";
import Dropdown from "@/components/common/dropdown";

export const Member = ({ isReadonly, name, email, role }: MemberProps) => {
  const [memberRole, setMemberRole] = useState<string>(
    role || UserRoles.MEMBER
  );
  const { dictionary } = useContext(LanguageContext);
  const [userDetails] = useRecoilState(userDetailsAtom);
  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);
  const { data, loadData, error, dataCode, isLoading } = useAxios({
    fetchFn: AddMember,
    paramsOfFetch: {
      adminId: userDetails?.id,
      body: {
        userEmail: email,
        organizationId: selectedOrganization?.id,
        role: memberRole,
      },
    },
  });

  const handleAddMember = async () => {
    await loadData();
  };
  const handleDelete = async () => {
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
      <div className="flex w-full gap-4 items-center justify-end">
        <Modal
          trigger={
            <Button variant="ghost" size="xs">
              <Pencil className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          }
          title={dictionary.ArchiveClient}
          description={dictionary.ArchiveClientConfirmation}
          confirmTxt={dictionary.Archive}
          cancelTxt={dictionary.Cancel}
          onConfirm={async () => console.log("archive")}
        />
        <Modal
          trigger={
            <Button variant="ghost" size="xs">
              <Trash className="h-[1.2rem] w-[1.2rem] text-destructive" />
            </Button>
          }
          title={dictionary.DeleteClient}
          description={dictionary.DeleteClientConfirmation}
          confirmTxt={dictionary.Delete}
          cancelTxt={dictionary.Cancel}
          onConfirm={handleDelete}
          isDelete
        />

        {/* <Select
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
        </Select> */}
      </div>
    </div>
  );
};
