import {
  GetArchivedClients,
  GetClients,
} from "@/components/dashboard/core/dashboard.service";
import useAxios from "@/lib/axios/useAxios";
import { ClientTable } from "./client-table";

export const ArchivedClientsTable = () => {
  const {
    data: archivedClients,
    error: archivedError,
    isLoading: archivedIsLoading,
    loadData: archivedLoadData,
  } = useAxios({
    fetchFn: GetArchivedClients,
    paramsOfFetch: {
      userId: import.meta.env.VITE_USER_ID,
      page: 0,
      size: 15,
    },
    loadOnMount: true,
  });

  return (
    <ClientTable
      data={archivedClients}
      error={archivedError}
      isLoading={archivedIsLoading}
      loadData={archivedLoadData}
    />
  );
};
