import { useRecoilState } from "recoil";
import {
  SelectCurrencyOptions,
  valueToLabelCurrencySymbol,
} from "../initial-settings/utils/consts";
import { selectedOrganizationAtom } from "../authentication/utils/authentication.recoil";
import { Loader } from "./loader";

interface InfoCardProps {
  icon: any;
  currency?: string;
  label?: string;
  amount?: number;
  pastAmount?: number;
  isCurrency?: boolean;
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

const InfoCard = ({
  icon,
  label,
  amount,
  isCurrency = true,
  pastAmount,
}: InfoCardProps) => {
  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-[250px] p-8 bg-secondary rounded-md w-full">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-2xl">{label}</p>
      </div>
      <div>
        <p className="text-xl text-muted-foreground">
          {selectedOrganization ? (
            isCurrency ? (
              formatCurrency(amount as number, selectedOrganization?.currency)
            ) : (
              amount
            )
          ) : (
            <Loader />
          )}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
