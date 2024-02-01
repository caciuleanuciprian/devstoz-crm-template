import { Bell } from "lucide-react";
import Icon from "@/components/common/icon";

import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex justify-between h-[5vh] pt-4 items-center ">
      <p>{title}</p>
      <div className="flex justify-center items-center gap-4">
        <Icon icon={<Bell className="h-[1.2rem] w-[1.2rem] " />} />
      </div>
    </div>
  );
};
