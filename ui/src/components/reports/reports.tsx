import { LinkIDS } from "@/components/common/navigation/utils/consts";
import { activeNavTabAtom } from "@/components/common/navigation/utils/navigation.recoil";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { Header } from "../common/header/header";
import { LanguageContext } from "@/i18n/language-context";
import { DatePicker } from "../common/date-picker";
import { GetOrganizationReportYearly } from "../dashboard/core/dashboard.service";
import useAxios from "@/lib/axios/useAxios";
import { selectedOrganizationAtom } from "../authentication/utils/authentication.recoil";
import { numberToMonth } from "../dashboard/utils/consts";
import { toast } from "../ui/use-toast";
import { ChartSlot } from "./molecules/chart-slot";

const Reports = () => {
  const [, setIsActive] = useRecoilState(activeNavTabAtom);

  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    setIsActive(LinkIDS.REPORTS);
  }, []);

  const [date, setDate] = useState<Date>(new Date(Date.now()));

  const currYear = useMemo(
    () => (date ? date?.getFullYear() : new Date(Date.now()).getFullYear()),
    [date]
  );

  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);

  const { data, loadData, error, isLoading } = useAxios({
    fetchFn: GetOrganizationReportYearly,
    paramsOfFetch: {
      organizationId: selectedOrganization?.id,
      year: currYear,
    },
  });

  const formatNoOfClients = () => {
    return data?.monthlyReports?.map((item: any, index: number) => {
      return {
        name: numberToMonth(index, dictionary),
        noOfClients: item.numberOfClients,
      };
    });
  };

  const formatNoOfTransactions = () => {
    return data?.monthlyReports?.map((item: any, index: number) => {
      return {
        name: numberToMonth(index, dictionary),
        noOfTransactions: item.numberOfTransactions,
      };
    });
  };

  const formatTotalIncome = () => {
    return data?.monthlyReports?.map((item: any, index: number) => {
      return {
        name: numberToMonth(index, dictionary),
        totalIncome: item.totalIncome,
      };
    });
  };

  const formatTotalExpenses = () => {
    return data?.monthlyReports?.map((item: any, index: number) => {
      return {
        name: numberToMonth(index, dictionary),
        totalExpenses: item.totalExpenses,
      };
    });
  };

  const memoizedNoClients = useMemo(() => {
    return formatNoOfClients();
  }, [data]);

  const memoizedNoTransactions = useMemo(() => {
    return formatNoOfTransactions();
  }, [data]);

  const memoizedTotalIncome = useMemo(() => {
    return formatTotalIncome();
  }, [data]);

  const memoizedTotalExpenses = useMemo(() => {
    return formatTotalExpenses();
  }, [data]);

  useEffect(() => {
    loadData();
  }, [currYear]);

  useEffect(() => {
    if (error) {
      toast({ title: dictionary.GenericError, variant: "destructive" });
    }
  }, [error]);

  return (
    <>
      <div className="px-8 pb-4">
        <Header title={dictionary.Reports} />
        <div className="flex bg-secondary my-4 flex-col rounded-md">
          <div className="pt-4 px-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center flex-wrap sm:flex-nowrap">
                  <p className="font-semibold text-xl pointer-events-none">
                    {dictionary.YearlyReportSituation}
                  </p>
                  <DatePicker
                    date={date as Date}
                    setDate={
                      setDate as React.Dispatch<
                        React.SetStateAction<Date | undefined>
                      >
                    }
                    dateFormat={"yyyy"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <ChartSlot
              data={memoizedNoClients}
              isLoading={isLoading}
              label={dictionary.YearlyClientsChart}
              dataKey="noOfClients"
              name={dictionary.NoOfClients}
            />
            <ChartSlot
              data={memoizedNoTransactions}
              isLoading={isLoading}
              label={dictionary.YearlyTransactionsChart}
              dataKey="noOfTransactions"
              name={dictionary.NoOfTransactions}
            />
            <ChartSlot
              data={memoizedTotalIncome}
              isLoading={isLoading}
              label={dictionary.YearlyIncomeChart}
              dataKey="totalIncome"
              name={dictionary.TotalIncome}
            />
            <ChartSlot
              data={memoizedTotalExpenses}
              isLoading={isLoading}
              label={dictionary.YearlyExpensesChart}
              dataKey="totalExpenses"
              name={dictionary.TotalExpenses}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
