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
import {
  GetArchivedClients,
  GetClients,
} from "../dashboard/core/dashboard.service";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArchivedClientsTable } from "./list/molecules/archived-clients-table";
import { ActiveClientsTable } from "./list/molecules/active-clients-table";

const Clients = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const { dictionary } = useContext(LanguageContext);

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
        <ClientSearch />
        <div className="flex flex-col justify-between h-full">
          <Tabs defaultValue="active" className="w-full h-full">
            <TabsList>
              <TabsTrigger
                onClick={() => setShowArchived(false)}
                value="active"
              >
                Active Clients
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setShowArchived(true)}
                value="archived"
              >
                Archived Clients
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <ActiveClientsTable />
            </TabsContent>
            <TabsContent value="archived">
              <ArchivedClientsTable />
            </TabsContent>
          </Tabs>
          <TablePagination
            pages={pagesArray()}
            totalPages={9}
            activePage={currentPage}
            setPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Clients;
