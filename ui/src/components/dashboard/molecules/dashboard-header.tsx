import { Bell, UserRoundPlus } from "lucide-react";
import Icon from "@/components/common/icons/icon";
import { ClientForm } from "../../clients/molecules/client-form";
import { Button } from "../../ui/button";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";

const DashboardHeader = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="flex justify-between h-[5vh] mb-4 pt-4 items-center ">
      <p>{dictionary.Dashboard}</p>
      <div className="flex justify-center items-center gap-2">
        <Icon icon={<Bell className="h-[1.2rem] w-[1.2rem] " />} />
        <ClientForm
          fields={[]}
          initialValues={{}}
          sheetProps={{
            trigger: (
              <Button variant={"default"} className="flex text-xs">
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

export default DashboardHeader;
