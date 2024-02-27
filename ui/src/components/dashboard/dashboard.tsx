import { useContext, useState } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Header } from "../common/header/header";
import { TopBanner } from "./molecules/top-banner";
import InfoCard from "../common/info-card";
import { User2 } from "lucide-react";
import ResponsiveBarChart from "../common/charts/responsive-bar-chart";
import useAxios from "@/lib/axios/useAxios";
import {
  GetOrganizationLastTransactions,
  GetOrganizationReportMonthly,
  GetOrganizationReportYearly,
} from "./core/dashboard.service";
import { useRecoilState } from "recoil";
import { selectedOrganizationAtom } from "../authentication/utils/authentication.recoil";
import { LastNTransactions } from "./molecules/last-n-transactions";
import { MonthlyCards } from "./molecules/monthly-cards";
import { YearlyReport } from "./molecules/yearly-report";

const Dashboard = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="px-8">
      <Header title={dictionary.Dashboard} />
      <div className="flex h-[90vh] py-4 flex-col gap-4">
        <div className="flex bg-secondary rounded-md p-4 flex-col gap-4 max-h-[750px]">
          <TopBanner />
        </div>
        <LastNTransactions />
        {/* <TopBanner /> */}
        <div className="flex gap-4 w-full justify-between bg-background">
          asd
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
