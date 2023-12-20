import SearchBar from "@/components/search-bar";
import { LinkIDS } from "@/constants/navigation/consts";
import { activeNavTabAtom } from "@/lib/recoil/navigation.recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import Page from "@/components/page";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import Pagination from "@/components/pagination";
import { columns } from "@/components/dashboard/columns";
import {
  ClientsMockedData,
  InfoCardDataMocked1,
  InfoCardDataMocked2,
} from "@/constants/clients/clients";
import ResponsiveBarChart from "@/components/responsive-bar-chart";
import { User2 } from "lucide-react";
import InfoCard from "@/components/info-card";

const Dashboard = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  useEffect(() => {
    setIsActive(LinkIDS.DASHBOARD);
  }, []);

  return (
    <Page>
      <div className="h-full bg-secondary pr-4">
        <DashboardHeader />
        <div className="flex h-[90vh] max-h-[90vh] overflow-auto w-full rounded-lg flex-col gap-4">
          <div className="flex h-[45vh] overflow-auto w-full bg-background rounded-lg flex-col">
            <div className=" flex h-full p-4 gap-4 w-full bg-background">
              <ResponsiveBarChart />
              <div className="flex h-full w-[50%] gap-4 flex-wrap overflow-auto">
                <InfoCard
                  icon={<User2 className="h-[2rem] w-[2rem] " />}
                  data={InfoCardDataMocked1}
                />
                <InfoCard
                  icon={<User2 className="h-[2rem] w-[2rem]" />}
                  data={InfoCardDataMocked2}
                  currencySymbol="$"
                />
                <InfoCard
                  icon={<User2 className="h-[2rem] w-[2rem]" />}
                  data={InfoCardDataMocked2}
                  currencySymbol="$"
                />
              </div>
            </div>
          </div>
          <div className="flex h-full overflow-auto w-full bg-background rounded-lg flex-col">
            <div>
              <DashboardTable columns={columns} data={ClientsMockedData} />
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
