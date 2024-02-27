import { useRecoilState } from "recoil";
import { selectedOrganizationAtom } from "../authentication/utils/authentication.recoil";
import { Loader } from "./loader";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  icon: any;
  currency?: string;
  label?: string;
  amount?: number;
  difference?: number;
  isCurrency?: boolean;
  isLoading?: boolean;
}

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const eurFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

const formatCurrency = (amount: number, currency: string) => {
  switch (currency) {
    case "USD":
      return usdFormatter.format(amount);
    case "EUR":
      return eurFormatter.format(amount);
    default:
      return amount;
  }
};

const formatNumber = (amount: number) => {
  return amount.toFixed(2);
};

const formatDifference = (difference: number) => {
  if (difference > 0) {
    return `+${formatNumber(difference)}%`;
  } else {
    return `${formatNumber(difference)}%`;
  }
};

const InfoCard = ({
  icon,
  label,
  amount,
  isCurrency = true,
  difference,
  isLoading,
}: InfoCardProps) => {
  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="flex flex-col justify-center items-center h-[150px] p-8 bg-secondary rounded-md w-full">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-2xl text-center">{label}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="text-xl text-muted-foreground flex w-full justify-center">
          {!isLoading ? (
            isCurrency ? (
              formatCurrency(
                amount as number,
                selectedOrganization?.currency as string
              )
            ) : (
              amount
            )
          ) : (
            <Loader />
          )}
        </div>
        {!isLoading && difference && (
          <div className="text-xs">
            <Badge variant={difference < 0 ? "destructive" : "nondestructive"}>
              {formatDifference(difference)}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
