import SearchBar from "@/components/search-bar";
import { LinkIDS } from "@/constants/navigation/consts";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import Page from "@/components/page";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import Pagination from "@/components/pagination";

const Dashboard = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.DASHBOARD);
  }, []);

  return (
    <Page>
      <div className="h-full bg-secondary pr-4">
        <DashboardHeader />
        <div className="flex h-[90vh] max-h-[90vh] overflow-auto w-full bg-background rounded-lg flex-col">
          <div>
            <DashboardTable />
          </div>
          <Pagination />
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
