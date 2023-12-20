import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardTable from "@/components/dashboard/dashboard-table";
import Navigation from "@/components/navigation/navigation";
import Page from "@/components/ui-custom/page";
import Pagination from "@/components/table/pagination";
import SearchBar from "@/components/ui-custom/search-bar";
import { Table } from "@/components/ui/table";
import { LinkIDS } from "@/constants/navigation/consts";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const Reports = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.REPORTS);
  }, []);
  return (
    <Page>
      <div className="h-full bg-secondary pr-4">
        <DashboardHeader />
        <div className="flex h-[90vh] max-h-[90vh] overflow-auto w-full bg-background rounded-lg flex-col">
          <div>Reports</div>
        </div>
      </div>
    </Page>
  );
};

export default Reports;
