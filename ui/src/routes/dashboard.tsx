import SearchBar from "@/components/search-bar";
import { LinkIDS } from "@/constants/navigation/consts";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import Page from "@/components/page";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardHeader from "@/components/dashboard/dashboard-header";

const Dashboard = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.DASHBOARD);
  }, []);

  return (
    <Page>
      <div className="h-full px-4">
        <DashboardHeader />
        <div className="flex h-[90vh] w-full bg-white rounded-lg flex-col py-4 px-4">
          <DashboardTable />
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
