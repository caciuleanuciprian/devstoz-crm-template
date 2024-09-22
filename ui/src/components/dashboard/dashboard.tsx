import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Header } from "../common/header/header";
import { TopBanner } from "./molecules/top-banner";
import { LastNTransactions } from "./molecules/last-n-transactions";

const Dashboard = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="px-8 pb-4">
      <Header title={dictionary.Dashboard} />
      <div className="flex min-h-[90vh] py-4 flex-col gap-4">
        <div className="flex bg-secondary rounded-md p-4 flex-col gap-4">
          <TopBanner />
        </div>
        <LastNTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
