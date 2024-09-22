import BarReport from "@/components/common/charts/bar-report";
import LineReport from "@/components/common/charts/line-report";
import { Loader } from "@/components/common/loader";
import { ReportType } from "../utils/types";
import AreaReport from "@/components/common/charts/area-report";

interface YearlyChartProps {
  data: any;
  isLoading: boolean;
  dataKey: string;
  reportType: string;
  name: string;
}

export const YearlyChart = ({
  data,
  isLoading,
  dataKey,
  reportType,
  name,
}: YearlyChartProps) => {
  return (
    <div className="h-full bg-background rounded-md">
      <div className="flex pb-4 pt-8 h-full bg-background rounded-md flex-col justify-center items-center">
        {isLoading ? (
          <div className="flex h-full justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {reportType === ReportType.LINE && (
              <LineReport datakey={dataKey} data={data} name={name} />
            )}
            {reportType === ReportType.BAR && (
              <BarReport datakey={dataKey} data={data} name={name} />
            )}
            {reportType === ReportType.AREA && (
              <AreaReport datakey={dataKey} data={data} name={name} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
