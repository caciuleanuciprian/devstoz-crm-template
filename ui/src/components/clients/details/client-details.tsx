import { Header } from "../../common/header/header";
import { ClientDetailsCardForm } from "./molecules/client-details-card-form";
import { LanguageContext } from "@/i18n/language-context";
import { useContext, useEffect, useMemo, useState } from "react";
import { ClientReport } from "./molecules/client-report";
import { ClientCards } from "./molecules/client-cards";
import useAxios from "@/lib/axios/useAxios";
import {
  GetClient,
  GetClientReport,
  GetEmailEvents,
} from "../core/clients.service";
import { useParams } from "react-router-dom";
import { toast } from "../../ui/use-toast";
import { useRecoilState } from "recoil";
import { transactionChangedAtom } from "./transactions/utils/transactions.recoil";
import { Transactions } from "./transactions/transactions";
import clsx from "clsx";
import { DatePicker } from "@/components/common/date-picker";
import { EmailEvents } from "./email-events/email-events";

export const ClientDetails = () => {
  const { dictionary } = useContext(LanguageContext);

  const { clientId } = useParams();

  const [transactionChanged, setTransactionChanged] = useRecoilState(
    transactionChangedAtom
  );

  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const currDay = useMemo(
    () => (date ? date.getDate() : new Date(Date.now()).getDate()),
    [date]
  );
  const currMonth = useMemo(
    () => (date ? date?.getMonth() + 1 : new Date(Date.now()).getMonth() + 1),
    [date]
  );
  const currYear = useMemo(
    () => (date ? date?.getFullYear() : new Date(Date.now()).getFullYear()),
    [date]
  );

  const {
    data: clientData,
    error: clientError,
    isLoading: clientIsLoading,
    dataCode: clientDataCode,
    loadData: clientLoadData,
  } = useAxios({
    fetchFn: GetClient,
    paramsOfFetch: {
      clientId: clientId,
    },
    loadOnMount: true,
  });

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetClientReport,
    paramsOfFetch: {
      clientId: clientId,
      month: currMonth,
      year: currYear,
    },
    loadOnMount: true,
  });

  useEffect(() => {
    loadData();
  }, [currMonth, currYear]);

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

  return (
    <div className="px-4 md:px-8 pb-4">
      <Header title={dictionary.ClientDetails} />
      <div className="flex flex-col gap-4 py-4 min-h-[90vh]">
        <div className="flex w-full gap-4 flex-col lg:flex-row">
          <div
            className={clsx(
              `bg-secondary p-4 ${
                isDataEmpty ? "w-full" : "w-full lg:w-[67%]"
              } rounded-md h-full md:max-h-[400px]`
            )}
          >
            <p className="font-medium text-md">{dictionary.ClientDetails}</p>
            <ClientDetailsCardForm
              data={clientData}
              error={clientError}
              loadData={clientLoadData}
              dataCode={clientDataCode}
              isLoading={clientIsLoading}
            />
          </div>
          {!isDataEmpty && (
            <div className="bg-secondary p-4 w-full lg:w-[33%] rounded-md flex flex-col min-h-[250px]">
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
        <div className="bg-background w-full h-full rounded-md gap-2 flex flex-col justify-center items-end">
          <DatePicker
            date={date}
            setDate={
              setDate as React.Dispatch<React.SetStateAction<Date | undefined>>
            }
            dateFormat="dd MMM yyyy"
          />
          <ClientCards data={data} isLoading={isLoading} error={error} />
        </div>
        <Transactions day={currDay} month={currMonth} year={currYear} />
        <EmailEvents clientData={clientData} isLoading={clientIsLoading} />
      </div>
    </div>
  );
};
