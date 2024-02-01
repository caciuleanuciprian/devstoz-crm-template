import { useContext, useEffect, useState } from "react";
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
import { DeleteClient } from "./core/clients.service";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { CLIENTS_PREFIX } from "@/lib/axios/consts";

const Clients = () => {
  const [shouldRefetch, setShouldRefetch] = useRecoilState(shouldRefetchAtom);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { dictionary } = useContext(LanguageContext);

  const navigate = useNavigate();

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetClients,
    paramsOfFetch: {
      userId: import.meta.env.VITE_USER_ID,
      page: currentPage,
      size: 10,
    },
    loadOnMount: true,
  });

  const {
    data: deleteClientData,
    error: deleteClientError,
    dataCode: deleteClientDataCode,
    isLoading: deleteClientIsLoading,
    loadData: deleteClient,
  } = useAxios({
    fetchFn: DeleteClient,
    paramsOfFetch: {},
  });

  const handleDelete = (params: any) => {
    deleteClient({ clientId: params.id });
  };

  const navigateToClientDetails = (params: any) => {
    navigate(`${CLIENTS_PREFIX}/${params.id}`);
  };

  useEffect(() => {
    if (shouldRefetch) {
      loadData();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  useEffect(() => {
    loadData();
  }, [currentPage]);

  useEffect(() => {
    if (
      deleteClientData &&
      deleteClientDataCode === AxiosStatusCode.CODE_200_OK
    ) {
      toast({ title: dictionary.ClientRemovedSuccesfully, variant: "success" });
      setShouldRefetch(true);
    } else if (deleteClientError) {
      toast({ title: dictionary.GenericError, variant: "destructive" });
    }
  }, [deleteClientData]);

  console.log(currentPage);

  const pagesArray = () => {
    const pagesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    pagesArr.shift();
    pagesArr.pop();
    return pagesArr;
  };

  return (
    <div className="px-8">
      <Header title={dictionary.Clients} />
      <div className="flex h-[95vh] py-4 overflow-auto flex-col gap-4">
        <ClientSearch />
        <div className="min-h-[40h]">
          <DataTable
            columns={renderColumnsWithTranslations(
              dictionary,
              handleDelete,
              navigateToClientDetails,
              isLoading
            )}
            data={data}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <TablePagination
          pages={pagesArray()}
          totalPages={9}
          activePage={currentPage}
          setPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Clients;
