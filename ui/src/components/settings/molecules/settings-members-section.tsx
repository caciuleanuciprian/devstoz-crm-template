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
import { useContext } from "react";
import { Member } from "../atoms/member";

export const SettingsMembersSection = () => {
  const { dictionary } = useContext(LanguageContext);
  const MEMBERS = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
      role: SelectRoleOptions.Administrator,
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      role: SelectRoleOptions.Member,
    },
  ];

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{dictionary.AddMembers}</CardTitle>
        <CardDescription>{dictionary.AddMembersDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4 pt-0">
        {MEMBERS.map((member) => (
          <Member
            key={member.id}
            isReadonly={true}
            name={member.name}
            email={member.email}
            role={member.role}
          />
        ))}
      </CardContent>
      <CardFooter className="justify-end p-4 pt-0">
        {!true ? (
          <Button variant="outline">{dictionary.Edit}</Button>
        ) : (
          <div className="flex gap-4">
            <Button variant={"outline"}>{dictionary.Cancel}</Button>
            <Button variant={"default"}>{dictionary.Save}</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
