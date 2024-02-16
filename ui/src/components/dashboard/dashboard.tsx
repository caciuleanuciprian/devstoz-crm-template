import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Header } from "../common/header/header";
import { TopBanner } from "./molecules/top-banner";
import InfoCard from "../common/info-card";
import { User2 } from "lucide-react";
import ResponsiveBarChart from "../common/charts/responsive-bar-chart";

const Dashboard = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="px-8">
      <Header title={dictionary.Dashboard} />
      <div className="flex h-[95vh] py-4 flex-col gap-4">
        <div className="flex gap-4 w-full justify-between bg-background lg:flex-row md:flex-col">
          <InfoCard
            data={{
              id: 1,
              label: dictionary.Clients,
              amount: 500,
              pastAmount: 250,
            }}
            currencySymbol="$"
            icon={<User2 />}
          />
          <InfoCard
            data={{
              id: 1,
              label: dictionary.Clients,
              amount: 500,
              pastAmount: 250,
            }}
            currencySymbol="$"
            icon={<User2 />}
          />
          <InfoCard
            data={{
              id: 1,
              label: dictionary.Clients,
              amount: 500,
              pastAmount: 250,
            }}
            currencySymbol="$"
            icon={<User2 />}
          />
        </div>
        <TopBanner />
        <div className="flex gap-4 w-full justify-between bg-background">
          <InfoCard
            data={{
              id: 1,
              label: dictionary.Clients,
              amount: 500,
              pastAmount: 250,
            }}
            currencySymbol="$"
            icon={<User2 />}
          />
          <InfoCard
            data={{
              id: 1,
              label: dictionary.Clients,
              amount: 500,
              pastAmount: 250,
            }}
            currencySymbol="$"
            icon={<User2 />}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
