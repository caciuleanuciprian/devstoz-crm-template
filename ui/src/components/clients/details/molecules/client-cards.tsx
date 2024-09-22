import InfoCard from "@/components/common/info-card";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Receipt, Coins, ArrowRightLeft } from "lucide-react";
import { Loader } from "@/components/common/loader";

interface ClientCardsProps {
  data: any;
  isLoading: boolean;
  error: any;
}

export const ClientCards = ({ data, isLoading, error }: ClientCardsProps) => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="flex w-full gap-4 flex-col md:flex-row h-full md:h-[250px]">
      {!isLoading && !error && data && (
        <>
          <InfoCard
            label={dictionary.NumberOfTransactions}
            amount={data?.numberOfTransactions}
            icon={<ArrowRightLeft />}
            isCurrency={false}
            isLoading={isLoading}
          />
          <InfoCard
            label={dictionary.TotalExpenses}
            amount={data?.totalExpenses}
            icon={<Receipt />}
            isLoading={isLoading}
          />
          <InfoCard
            label={dictionary.TotalIncome}
            amount={data?.totalIncome}
            icon={<Coins />}
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
