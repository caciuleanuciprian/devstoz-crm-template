import { GetClients } from "@/components/dashboard/core/dashboard.service";
import useAxios from "@/lib/axios/useAxios";
import { ClientTable } from "./client-table";
import { useRecoilState } from "recoil";
import {
  filterTableByAtom,
  searchValueAtom,
  shouldRefetchAtom,
} from "../../utils/clients.recoil";
import { useEffect } from "react";

export const ActiveClientsTable = () => {
  const [filterBy] = useRecoilState(filterTableByAtom);
  const [searchValue] = useRecoilState(searchValueAtom);
  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetClients,
    paramsOfFetch: {
      userId: import.meta.env.VITE_USER_ID,
      page: 0,
      size: 15,
      clientType: filterBy,
      nameSearchText: searchValue,
    },
    loadOnMount: true,
  });

  return (
    <ClientTable
      data={data}
      error={error}
      isLoading={isLoading}
      loadData={loadData}
    />
  );
};
