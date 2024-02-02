import SearchBar from "@/components/common/search-bar";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { ClientForm } from "./client-form";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";

export const ClientSearch = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="flex gap-4 justify-between">
      <div className="w-[90%]">
        <SearchBar />
      </div>
      <div className="w-[10%]"></div>
    </div>
  );
};
