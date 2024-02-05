import SearchBar from "@/components/common/search-bar";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { ClientForm } from "./client-form";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";

export const ClientSearch = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="flex gap-4 justify-between items-end">
      <div className="w-[100%]">
        <SearchBar />
      </div>
      <div>
        <ClientForm
          initialValues={{}}
          sheetProps={{
            trigger: (
              <Button size={"sm"} variant={"default"} className="flex text-xs">
                <UserRoundPlus className="h-[1.2rem] w-[1.2rem] mr-2" />
                {dictionary.AddClient}
              </Button>
            ),
            title: `${dictionary.AddNewClientTitle}`,
            description: `${dictionary.AddNewClientDescription}`,
            submitTxt: `${dictionary.Submit}`,
          }}
        />
      </div>
    </div>
  );
};
