import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Header } from "../common/header";
import { TopBanner } from "./molecules/top-banner";

const Dashboard = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="px-8">
      <Header title={dictionary.Dashboard} />
      <div className="flex h-[95vh] py-4  flex-col gap-4">
        <TopBanner />
        <div className="flex gap-4 w-full bg-background flex-col pb-2 justify-end">
          <div className="h-full overflow-auto">Slot</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
