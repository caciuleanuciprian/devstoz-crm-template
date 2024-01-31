import { InfoCardType } from "@/components/clients/utils/types";
import Icon from "@/components/common/icons/icon";

interface InfoCardProps {
  data: InfoCardType;
  icon: any;
  currencySymbol?: string;
}

const InfoCard = ({ data, icon, currencySymbol }: InfoCardProps) => {
  return (
    <div className="bg-background mr-2 rounded-lg flex flex-col justify-between w-full h-[45%] min-h-[150px] max-h-[150px] p-4">
      <p className="text-2xl font-medium truncate">{data.label}</p>
      <div>
        <div className="flex gap-2 items-center text-2xl font-medium ">
          <Icon className="h-[2rem] w-[2rem] !cursor-default" icon={icon} />
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
