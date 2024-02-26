import InfoCard from "@/components/common/info-card";
import { GetClientReport } from "../../core/clients.service";
import useAxios from "@/lib/axios/useAxios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LanguageContext } from "@/i18n/language-context";
import { Receipt, Coins, CreditCard } from "lucide-react";
import { Loader } from "@/components/common/loader";
import { shouldRefetchAtom } from "../../utils/clients.recoil";

export const ClientCards = () => {
  const { clientId } = useParams();

  const [currMonth, setCurrMonth] = useState(new Date().getMonth() + 1);
  const [currYear, setCurrYear] = useState(new Date().getFullYear());

  const { dictionary } = useContext(LanguageContext);

  const [shouldRefetch] = useRecoilState(shouldRefetchAtom);

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
    if (shouldRefetch) {
      loadData();
    }
  }, [shouldRefetch]);

  console.log(data);
  return (
    <div className="flex h-[250px] w-full gap-4">
      {!isLoading && !error && data && (
        <>
          <InfoCard
            label={dictionary.NumberOfTransactions}
            amount={data?.numberOfTransactions}
            icon={<CreditCard />}
            isCurrency={false}
          />
          <InfoCard
            label={dictionary.TotalExpenses}
            amount={data?.totalExpenses}
            icon={<Receipt className="text-destructive" />}
          />
          <InfoCard
            label={dictionary.TotalIncome}
            amount={data?.totalIncome}
            icon={<Coins className="text-green-500" />}
          />
        </>
      )}
      {isLoading && !error && (
        <div className="flex gap-4 justify-center items-center w-full h-[250px]">
          <div className="flex bg-secondary flex-col justify-center items-center h-[250px] rounded-md w-full">
            <Loader />
          </div>
          <div className="flex bg-secondary flex-col justify-center items-center h-[250px] rounded-md w-full">
            <Loader />
          </div>
          <div className="flex bg-secondary flex-col justify-center items-center h-[250px] rounded-md w-full">
            <Loader />
          </div>
        </div>
      )}
      {error && (
        <div className="flex flex-col justify-center items-center w-full h-[250px]">
          <p>{dictionary.GenericError}</p>
        </div>
      )}
    </div>
  );
};
