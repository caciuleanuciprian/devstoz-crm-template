import { InfoCardType } from "@/constants/clients/types";
import Icon from "./icon";

interface InfoCardProps {
  data: InfoCardType;
  icon: any;
  currencySymbol?: string;
}

const InfoCard = ({ data, icon, currencySymbol }: InfoCardProps) => {
  console.log(data);
  return (
    <div className="bg-secondary rounded-lg flex flex-col justify-between w-full h-[50%] min-h-[150px] max-h-[150px] p-4 ">
      <p className="text-4xl font-medium truncate">{data.label}</p>
      <div>
        <p className="flex gap-2 items-center text-4xl font-medium ">
          <Icon className="h-[2rem] w-[2rem]" icon={icon} />
          {`${currencySymbol ? currencySymbol : ""}${data.amount}`}
        </p>
        <p className="font-thin text-xs opacity-50">{`*${Math.floor(
          (data.amount / data.pastAmount) * 100
        )}% more than last month`}</p>
      </div>
    </div>
  );
};

export default InfoCard;
