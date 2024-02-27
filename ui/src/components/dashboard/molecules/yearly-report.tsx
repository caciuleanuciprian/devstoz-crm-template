import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";
import useAxios from "@/lib/axios/useAxios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { GetOrganizationReportYearly } from "../core/dashboard.service";
import MixedReport from "@/components/common/charts/mixed-report";
import { LanguageContext } from "@/i18n/language-context";
import { Loader } from "@/components/common/loader";
import { numberToMonth } from "../utils/consts";
import { toast } from "@/components/ui/use-toast";

interface YearlyReportProps {
  currYear: number;
}

export const YearlyReport = ({ currYear }: YearlyReportProps) => {
  const { dictionary } = useContext(LanguageContext);
  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);

  const { data, loadData, error, isLoading } = useAxios({
    fetchFn: GetOrganizationReportYearly,
    paramsOfFetch: {
      organizationId: selectedOrganization?.id,
      year: currYear,
    },
    loadOnMount: true,
  });

  const formatData = () => {
    return data?.monthlyReports?.map((item: any, index: number) => {
      return {
        name: numberToMonth(index, dictionary),
        noOfClients: item.numberOfClients,
        noOfTransactions: item.numberOfTransactions,
        totalIncome: item.totalIncome,
        totalExpenses: item.totalExpenses,
      };
    });
  };

  const memoizedChartValues = useMemo(() => {
    return formatData();
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
      <div className="flex py-8  h-full bg-background min-h-[350px] rounded-md flex-col justify-center items-center">
        {isLoading ? <Loader /> : <MixedReport data={memoizedChartValues} />}
      </div>
    </>
  );
};
