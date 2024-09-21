import { Header } from "../../common/header/header";
import { ClientDetailsCardForm } from "./molecules/client-details-card-form";
import { LanguageContext } from "@/i18n/language-context";
import { useContext, useEffect, useMemo, useState } from "react";
import { ClientReport } from "./molecules/client-report";
import { ClientCards } from "./molecules/client-cards";
import useAxios from "@/lib/axios/useAxios";
import { GetClientReport } from "../core/clients.service";
import { useParams } from "react-router-dom";
import { toast } from "../../ui/use-toast";
import { useRecoilState } from "recoil";
import { transactionChangedAtom } from "./transactions/utils/transactions.recoil";
import { Transactions } from "./transactions/transactions";
import clsx from "clsx";

export const ClientDetails = () => {
  const { dictionary } = useContext(LanguageContext);

  const { clientId } = useParams();

  const [transactionChanged, setTransactionChanged] = useRecoilState(
    transactionChangedAtom
  );

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetClientReport,
    paramsOfFetch: {
      clientId: clientId,
      month: 1,
      year: new Date().getFullYear(),
    },
    loadOnMount: true,
  });

  useEffect(() => {
    if (transactionChanged) {
      loadData();
      setTransactionChanged(false);
    }
  }, [transactionChanged]);

  useEffect(() => {
    if (error) {
      toast({ title: dictionary.GenericError, variant: "destructive" });
    }
  }, [error]);

  const formatData = () => {
    return [
      {
        name: dictionary.Income,
        value: data?.totalIncome,
      },
      {
        name: dictionary.Expenses,
        value: data?.totalExpenses,
      },
    ];
  };

  const memoizedChartValues = useMemo(() => {
    return formatData();
  }, [data]);

  const isDataEmpty = useMemo(
    () =>
      memoizedChartValues[0].value === 0 || memoizedChartValues[1].value === 0,
    [memoizedChartValues]
  );

  console.log("DATA", memoizedChartValues);

  return (
    <div className="px-8 pb-4">
      <Header title={dictionary.ClientDetails} />
      <div className="flex flex-col gap-4 py-4 h-[90vh]">
        <div className="flex w-full gap-4">
          {/* <div className="bg-secondary p-4 w-[67%] rounded-md max-h-[400px]"> */}
          <div
            className={clsx(
              `bg-secondary p-4 ${
                isDataEmpty ? "w-full" : "w-[67%]"
              } rounded-md max-h-[400px]`
            )}
          >
            <p className="font-medium text-md">{dictionary.ClientDetails}</p>
            <ClientDetailsCardForm />
          </div>
          {!isDataEmpty && (
            <div className="bg-secondary p-4 w-[33%] rounded-md flex flex-col">
              <p className="font-medium text-md">
                {dictionary.ClientMonthlyReport}
              </p>
              {
                <ClientReport
                  data={memoizedChartValues}
                  isLoading={isLoading}
                />
              }
            </div>
          )}
        </div>
        <div className="bg-background w-full h-[250px] rounded-md">
          <ClientCards data={data} isLoading={isLoading} error={error} />
        </div>
        <Transactions />
      </div>
    </div>
  );
};
