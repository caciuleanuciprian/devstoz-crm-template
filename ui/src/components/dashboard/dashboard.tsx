import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { TablePagination } from "@/components/common/table/pagination";
import { DataTable } from "@/components/dashboard/molecules/data-table";
import useAxios from "@/lib/axios/useAxios";
import { GetClients } from "./core/dashboard.service";
import { Header } from "../common/header";
import { TopBanner } from "./molecules/top-banner";
import { renderColumnsWithTranslations } from "./utils/consts";

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
