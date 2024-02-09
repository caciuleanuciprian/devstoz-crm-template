import {
  InfoCardDataMocked1,
  InfoCardDataMocked2,
} from "@/components/clients/utils/mockedData";
import ResponsiveBarChart from "@/components/common/charts/responsive-bar-chart";
import InfoCard from "@/components/common/info-card";
import { User2 } from "lucide-react";

export const TopBanner = () => {
  return (
    <div className="flex h-[35%] overflow-auto w-full bg-secondary rounded-md flex-col">
      <div className=" flex h-full p-4 gap-4 w-full bg-secondary">
        <ResponsiveBarChart />
        <div className="flex h-full w-[50%] flex-wrap overflow-auto items-center gap-2">
          <InfoCard
            icon={<User2 className="h-[2rem] w-[2rem] " />}
            data={InfoCardDataMocked1}
          />
          <InfoCard
            icon={<User2 className="h-[2rem] w-[2rem]" />}
            data={InfoCardDataMocked2}
            currencySymbol="$"
          />
        </div>
      </div>
    </div>
  );
};
