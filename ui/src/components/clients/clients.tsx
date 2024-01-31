import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Header } from "../common/header";
import { LanguageContext } from "@/i18n/language-context";
import { TablePagination } from "../common/table/pagination";
import { DataTable } from "../dashboard/molecules/data-table";
import useAxios from "@/lib/axios/useAxios";
import { GetClients } from "../dashboard/core/dashboard.service";
import { ClientSearch } from "./molecules/client-search";
import { shouldRefetchAtom } from "./utils/clients.recoil";
import { renderColumnsWithTranslations } from "../dashboard/utils/consts";

const Clients = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);
  const [shouldRefetch, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const { dictionary } = useContext(LanguageContext);

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetClients,
    paramsOfFetch: {
      userId: import.meta.env.VITE_USER_ID,
    },
    loadOnMount: true,
  });

  useEffect(() => {
    setIsActive(LinkIDS.CLIENTS);
  }, []);

  useEffect(() => {
    if (shouldRefetch) {
      loadData();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  return (
    <div className="px-8">
      <Header title={dictionary.Clients} />
      <div className="flex h-[95vh] py-4 overflow-auto flex-col gap-4">
        <ClientSearch />
        <div className="h-full">
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
  );
};

export default Clients;
