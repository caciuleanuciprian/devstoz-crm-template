import useAxios from "@/lib/axios/useAxios";
import { GetClientReport } from "../../core/clients.service";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import PieReport from "@/components/common/charts/pie-report";
import { LanguageContext } from "@/i18n/language-context";
import { toast } from "@/components/ui/use-toast";
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
