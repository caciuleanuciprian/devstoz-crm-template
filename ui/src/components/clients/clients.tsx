import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Header } from "../common/header";
import { LanguageContext } from "@/i18n/language-context";
import { TablePagination } from "../common/table/pagination";
import useAxios from "@/lib/axios/useAxios";
import { ClientSearch } from "./list/molecules/client-list-header";
import { shouldRefetchAtom } from "./utils/clients.recoil";
import { DeleteClient } from "./core/clients.service";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import { toast } from "../ui/use-toast";
import { ClientTable } from "./list/molecules/client-table";

const Clients = () => {
  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { dictionary } = useContext(LanguageContext);

  const {
    data: deleteClientData,
    error: deleteClientError,
    dataCode: deleteClientDataCode,
    loadData: deleteClient,
  } = useAxios({
    fetchFn: DeleteClient,
    paramsOfFetch: {},
  });

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

  const pagesArray = () => {
    const pagesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    pagesArr.shift();
    pagesArr.pop();
    return pagesArr;
  };

  return (
    <div className="px-8">
      <Header title={dictionary.Clients} />
      <div className="flex h-[95vh] py-4 flex-col gap-4 justify-between">
        <div className="flex flex-col gap-4">
          <ClientSearch />
          <ClientTable />
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
