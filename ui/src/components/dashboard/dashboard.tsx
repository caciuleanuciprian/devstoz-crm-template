import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { LanguageContext } from "@/i18n/language-context";
import { TablePagination } from "@/components/common/table/pagination";
import { DataTable } from "@/components/dashboard/molecules/data-table";
import useAxios from "@/lib/axios/useAxios";
import { GetClients } from "./core/dashboard.service";
import { Header } from "../common/header";
import { TopBanner } from "./molecules/top-banner";
import { ClientsMockedData } from "../clients/utils/mockedData";
import { renderColumnsWithTranslations } from "./utils/consts";

const Dashboard = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);
  const { dictionary } = useContext(LanguageContext);

  const { data, error, isLoading } = useAxios({
    fetchFn: GetClients,
    paramsOfFetch: {
      userId: import.meta.env.VITE_USER_ID,
    },
    loadOnMount: true,
  });

  useEffect(() => {
    setIsActive(LinkIDS.DASHBOARD);
  }, []);

  return (
    <div className="px-8">
      <Header title={dictionary.Dashboard} />
      <div className="flex h-[95vh] py-4  flex-col gap-4">
        <TopBanner />
        <div className="flex h-[65%] gap-4 w-full bg-background  flex-col pb-2 justify-end">
          <div className="h-full overflow-auto">
            <DataTable
              columns={renderColumnsWithTranslations(dictionary)}
              data={data}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <TablePagination
            pages={[]}
            activePage={1}
            nextPage={() => {}}
            prevPage={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
