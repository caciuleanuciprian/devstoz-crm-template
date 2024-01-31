import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Header } from "../common/header";
import { LanguageContext } from "@/i18n/language-context";
import { TablePagination } from "../common/table/pagination";
import { DataTable } from "../dashboard/molecules/data-table";
import { renderColumnsWithTranslations } from "../dashboard/molecules/data-table-columns";
import useAxios from "@/lib/axios/useAxios";
import { GetClients } from "../dashboard/core/dashboard.service";
import SearchBar from "../common/search-bar";
import { UserRoundPlus } from "lucide-react";
import { Button } from "../ui/button";
import { ClientForm } from "./molecules/client-form";
import { ClientSearch } from "./molecules/client-search";

const Clients = () => {
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
    setIsActive(LinkIDS.CLIENTS);
  }, []);

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
