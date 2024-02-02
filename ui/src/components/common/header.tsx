import { Bell } from "lucide-react";
import Icon from "@/components/common/icon";

import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Separator } from "@/components/ui/separator";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="flex justify-between pt-4 flex-col">
      <div className="flex justify-between items-center gap-4">
        <p>{title}</p>
      </div>
      <Separator />
    </div>
  );
};
