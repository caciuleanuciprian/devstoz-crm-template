import { useContext, useState } from "react";
import { YearlyChart } from "./yearly-chart";
import { ChartSlotProps, ReportType } from "../utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LanguageContext } from "@/i18n/language-context";

const selectReportTypeOptions = [
  ReportType.LINE,
  ReportType.BAR,
  ReportType.AREA,
];

const valueToLabelReportType = (value: string, dictionary: any) => {
  switch (value) {
    case ReportType.LINE:
      return dictionary.Line;
    case ReportType.BAR:
      return dictionary.Bar;
    case ReportType.AREA:
      return dictionary.Area;
    default:
      return "";
  }
};

export const ChartSlot = ({
  data,
  isLoading,
  label,
  dataKey,
  name,
}: ChartSlotProps) => {
  const [reportType, setReportType] = useState<string>(ReportType.LINE);
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="p-4 h-[400px] flex flex-col gap-2">
      <div className="flex items-center gap-2 justify-start sm:justify-center ">
        <p className="font-semibold text-xs sm:text-base text-muted-foreground w-full pointer-events-none">
          {label}
        </p>
        <div className="min-w-[200px] flex flex-col gap-1">
          <Label className="text-xs sm:text-md">{dictionary.ChartType}</Label>
          <Select
            onValueChange={(e: string) => setReportType(e)}
            defaultValue={reportType}
          >
            <SelectTrigger>
              <SelectValue placeholder={dictionary.ChartType} />
            </SelectTrigger>
            <SelectContent>
              {selectReportTypeOptions.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {valueToLabelReportType(option, dictionary)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <YearlyChart
        reportType={reportType}
        dataKey={dataKey}
        data={data}
        isLoading={isLoading}
        name={name}
      />
    </div>
  );
};
