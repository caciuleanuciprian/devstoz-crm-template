import { SelectRoleOptions } from "@/components/initial-settings/utils/consts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LanguageContext } from "@/i18n/language-context";
import { useContext, useMemo, useState } from "react";
import { Member } from "../atoms/member";
import useAxios from "@/lib/axios/useAxios";
import { AddMember, GetMembers } from "../core/settings.service";
import {
  selectedOrganizationAtom,
  userDetailsAtom,
} from "@/components/authentication/utils/authentication.recoil";
import { useRecoilState } from "recoil";
import { Modal } from "@/components/common/modal";
import { UserRoles } from "../utils/types";
import { Slot } from "../atoms/slot";
import { Loader } from "@/components/common/loader";
import { roleToLabel } from "../utils/consts";
import clsx from "clsx";

export const SettingsMembersSection = () => {
  const { dictionary } = useContext(LanguageContext);
  const [userDetails] = useRecoilState(userDetailsAtom);
  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);
  const [isReadonly, setIsReadonly] = useState<boolean>(true);

  const { data, loadData, error, dataCode, isLoading } = useAxios({
    fetchFn: GetMembers,
    paramsOfFetch: {
      adminId: userDetails?.id,
      organizationId: selectedOrganization?.id,
    },
    loadOnMount: true,
  });

  const formatMembers = useMemo(
    () =>
      data?.map((member: any) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        role: roleToLabel(
          member.roles.filter(
            (org: any) => org.organizationId === selectedOrganization?.id
          )[0].name,
          dictionary
        ),
      })) ?? [],
    [data]
  );

  const handleAddMember = async () => {
    await loadData();
  };

  return (
    <Slot className="w-full">
      <p className="font-semibold text-md sm:text-lg pointer-events-none">
        {dictionary.OrganizationMembers}
      </p>
      <div className="flex bg-background flex-col p-4 mt-4 rounded-md w-full">
        <Card
          className={clsx(
            `h-full flex justify-center ${
              !isLoading ? "items-start" : "items-center"
            }`
          )}
        >
          <CardContent className="flex flex-wrap w-full justify-between gap-4 p-4">
            {formatMembers.length < 1 && (
              <p className="text-muted-foreground">There is no member.</p>
            )}
            {!isLoading &&
              formatMembers.map((member: any) => (
                <Member
                  key={member.id}
                  isReadonly={true}
                  name={member.name}
                  email={member.email}
                  role={member.role}
                />
              ))}
            {error && <p className="text-red-500">Error retrieving members.</p>}
            {isLoading && <Loader />}
          </CardContent>
        </Card>
      </div>
    </Slot>
  );
};
