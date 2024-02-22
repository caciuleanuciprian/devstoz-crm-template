import { useContext, useState } from "react";
import { Header } from "../common/header/header";
import { LanguageContext } from "@/i18n/language-context";
import { TablePagination } from "../common/table/pagination";
import { ClientSearch } from "./list/molecules/client-list-header";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArchivedClientsTable } from "./list/molecules/archived-clients-table";
import { ActiveClientsTable } from "./list/molecules/active-clients-table";
import { useRecoilState } from "recoil";
import {
  currentPageAtom,
  filterTableByAtom,
  searchValueAtom,
} from "./utils/clients.recoil";

const Clients = () => {
  const [, setFilterBy] = useRecoilState(filterTableByAtom);
  const [, setSearchValue] = useRecoilState(searchValueAtom);
  const [, setCurrentPage] = useRecoilState(currentPageAtom);
  const { dictionary } = useContext(LanguageContext);

  const handleResetFilters = () => {
    setFilterBy(null);
  };

  const handleResetSearch = () => {
    setSearchValue("");
  };

  const handleResetPage = () => {
    setCurrentPage(0);
  };

  const handleResetsOnTabChange = () => {
    handleResetFilters();
    handleResetSearch();
    handleResetPage();
  };

  return (
    <div className="px-8">
      <Header title={dictionary.Clients} />
      <div className="flex h-[90vh] pt-4 my-4 flex-col bg-secondary  rounded-md">
        <ClientSearch />
        <div className="flex flex-col gap-4 h-full overflow-auto justify-between bg-background rounded-md m-4">
          <Tabs
            onValueChange={handleResetsOnTabChange}
            defaultValue="active"
            className="w-full flex flex-col"
          >
            <div>
              <TabsList className="m-4 justify-start">
                <TabsTrigger value="active">
                  {dictionary.ActiveClients}
                </TabsTrigger>
                <TabsTrigger value="archived">
                  {dictionary.ArchivedClients}
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="active" className="mx-4">
              <ActiveClientsTable />
            </TabsContent>
            <TabsContent value="archived" className="mx-4">
              <ArchivedClientsTable />
            </TabsContent>
          </Tabs>
          <TablePagination />
        </div>
      </div>
    </div>
  );
};

export default Clients;
