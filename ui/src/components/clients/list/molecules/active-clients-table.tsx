import { GetClients } from "@/components/dashboard/core/dashboard.service";
import useAxios from "@/lib/axios/useAxios";
import { ClientTable } from "./client-table";

export const ActiveClientsTable = () => {
  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetClients,
    paramsOfFetch: {
      userId: import.meta.env.VITE_USER_ID,
      page: 0,
      size: 15,
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
