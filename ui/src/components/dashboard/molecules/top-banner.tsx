import {
  InfoCardDataMocked1,
  InfoCardDataMocked2,
} from "@/components/clients/utils/mockedData";
import ResponsiveBarChart from "@/components/common/charts/responsive-bar-chart";
import InfoCard from "@/components/common/info-card";
import { User2 } from "lucide-react";

export const TopBanner = () => {
  return (
    <div className="flex h-[35%]">
      <div className=" flex flex-col h-full p-4 pt-8 gap-4 rounded-md w-full bg-secondary">
        <p className="text-2xl font-semibold text-muted-foreground ml-4">
          Clients Statistics
        </p>
        <ResponsiveBarChart />
      </div>
    </div>
  );
};
