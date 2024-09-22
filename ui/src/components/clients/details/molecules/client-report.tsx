import PieReport from "@/components/common/charts/pie-report";
import { Loader } from "@/components/common/loader";

interface ClientReportProps {
  data: any;
  isLoading: boolean;
}

export const ClientReport = ({ data, isLoading }: ClientReportProps) => {
  return (
    <>
      <div className="w-full h-full bg-background rounded-md">
        {isLoading ? (
          <div className="h-full w-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <PieReport data={data} datakey={"value"} />
        )}
      </div>
    </>
  );
};
