import useAxios from "@/lib/axios/useAxios";
import { GetOrganizationReportMonthly } from "../core/dashboard.service";
import { useRecoilState } from "recoil";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";
import { useContext, useEffect } from "react";
import InfoCard from "@/components/common/info-card";
import { LanguageContext } from "@/i18n/language-context";
import { toast } from "@/components/ui/use-toast";

interface MonthlyCardsProps {
  currMonth: number;
  currYear: number;
}

export const MonthlyCards = ({ currMonth, currYear }: MonthlyCardsProps) => {
  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);
  const { dictionary } = useContext(LanguageContext);

  const { data, loadData, error, isLoading } = useAxios({
    fetchFn: GetOrganizationReportMonthly,
    paramsOfFetch: {
      organizationId: selectedOrganization?.id,
      month: currMonth,
      year: currYear,
    },
  });

  useEffect(() => {
    loadData();
  }, [currMonth, currYear]);

  useEffect(() => {
    if (error) {
      toast({ title: dictionary.GenericError, variant: "destructive" });
    }
  }, [error]);

  return (
    <div className="flex w-full flex-col p-4 rounded-md gap-2">
      <div className="flex gap-4 flex-col md:flex-row">
        <InfoCard
          label={dictionary.NumberOfClients}
          icon={undefined}
          amount={data?.numberOfClients}
          difference={data?.clientsDifference}
          isCurrency={false}
          isLoading={isLoading}
        />
        <InfoCard
          label={dictionary.NumberOfTransactions}
          icon={undefined}
          amount={data?.numberOfTransactions}
          difference={data?.transactionsDifference}
          isCurrency={false}
          isLoading={isLoading}
        />
        <InfoCard
          label={dictionary.TotalIncome}
          icon={undefined}
          amount={data?.totalIncome}
          difference={data?.incomeDifference}
          isLoading={isLoading}
        />
        <InfoCard
          label={dictionary.TotalExpenses}
          icon={undefined}
          amount={data?.totalExpenses}
          difference={data?.expensesDifference}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
