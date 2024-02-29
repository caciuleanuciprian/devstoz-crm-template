export interface ChartSlotProps {
  data: any;
  isLoading: boolean;
  label: string;
  dataKey: string;
}

export enum ReportType {
  LINE = "line",
  BAR = "bar",
  PIE = "pie",
  AREA = "area",
}
