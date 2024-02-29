import InfoCard from "@/components/common/info-card";
import { GetClientReport } from "../../core/clients.service";
import useAxios from "@/lib/axios/useAxios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { LanguageContext } from "@/i18n/language-context";
import { Receipt, Coins, CreditCard } from "lucide-react";
import { Loader } from "@/components/common/loader";
import { shouldRefetchAtom } from "../../list/utils/clients.recoil";
import { transactionChangedAtom } from "../transactions/utils/transactions.recoil";

interface ClientCardsProps {
  data: any;
  isLoading: boolean;
  error: any;
}

export const ClientCards = ({ data, isLoading, error }: ClientCardsProps) => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="flex h-[250px] w-full gap-4">
      {!isLoading && !error && data && (
        <>
          <InfoCard
            label={dictionary.NumberOfTransactions}
            amount={data?.numberOfTransactions}
            icon={<CreditCard />}
            isCurrency={false}
            isLoading={isLoading}
          />
          <InfoCard
            label={dictionary.TotalExpenses}
            amount={data?.totalExpenses}
            icon={<Receipt className="text-destructive" />}
            isLoading={isLoading}
          />
          <InfoCard
            label={dictionary.TotalIncome}
            amount={data?.totalIncome}
            icon={<Coins className="text-green-500" />}
            isLoading={isLoading}
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
