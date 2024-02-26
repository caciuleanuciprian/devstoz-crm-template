import { GetClients } from "@/components/dashboard/core/dashboard.service";
import useAxios from "@/lib/axios/useAxios";
import { ClientTable } from "./client-table";
import { useRecoilState } from "recoil";
import {
  currentPageAtom,
  filterTableByAtom,
  searchValueAtom,
  shouldRefetchAtom,
  totalPagesAtom,
} from "../../utils/clients.recoil";
import { useEffect } from "react";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";

export const ActiveClientsTable = () => {
  const [filterBy] = useRecoilState(filterTableByAtom);
  const [searchValue] = useRecoilState(searchValueAtom);
  const [, setTotalPages] = useRecoilState(totalPagesAtom);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const [shouldRefetch, setShouldRefetch] = useRecoilState(shouldRefetchAtom);
  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetClients,
    paramsOfFetch: {
      organizationId: selectedOrganization?.id,
      page: currentPage,
      size: 15,
      clientType: filterBy,
      nameSearchText: searchValue,
    },
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.numberOfPages);
    }
  }, [data]);

  useEffect(() => {
    setCurrentPage(0);
    setShouldRefetch(true);
  }, [filterBy]);

  useEffect(() => {
    if (searchValue !== "" || searchValue !== null) {
      setCurrentPage(0);
      setShouldRefetch(true);
    }
  }, [searchValue]);

  useEffect(() => {
    if (shouldRefetch) {
      loadData();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  return <ClientTable data={data} error={error} isLoading={isLoading} />;
};
