import useAxios from "@/lib/axios/useAxios";
import { GetClientReport } from "../../core/clients.service";
import { useParams } from "react-router-dom";
import { useState } from "react";

export const ClientReport = () => {
  const { clientId } = useParams();

  const [currMonth, setCurrMonth] = useState(new Date().getMonth() + 1);
  const [currYear, setCurrYear] = useState(new Date().getFullYear());

  console.log(currMonth, currYear);

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetClientReport,
    paramsOfFetch: {
      clientId: clientId,
      month: currMonth,
      year: currYear,
    },
    loadOnMount: true,
  });

  console.log(data);

  return <>asd</>;
};
