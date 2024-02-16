import { InfoCardType } from "@/components/clients/utils/types";
import Icon from "@/components/common/icon";

interface InfoCardProps {
  data: InfoCardType;
  icon: any;
  currencySymbol?: string;
}

const InfoCard = ({ data, icon, currencySymbol }: InfoCardProps) => {
  return (
    <div className="bg-secondary rounded-md flex flex-col w-full min-h-[150px] justify-center p-4">
      <div className="flex gap-2 items-center">
        <div>{icon}</div>
        <p className="text-2xl font-medium truncate">{data.label}</p>
      </div>
      <div>
        <div className="flex gap-2 items-center text-3xl font-medium ">
          {`${currencySymbol ? currencySymbol : ""}${data.amount}`}
        </div>
        <p className="font-thin text-xs opacity-50">{`*${Math.floor(
          (data.amount / data.pastAmount) * 100
        )}% more than last month`}</p>
      </div>
    </div>
  );
};

export default InfoCard;
