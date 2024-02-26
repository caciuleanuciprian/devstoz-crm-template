import { Header } from "../common/header/header";
import { ClientDetailsCardForm } from "./details/client-details-card-form";
import { Transactions } from "./details/transactions/molecules/transactions";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GetClient } from "./core/clients.service";
import { TablePagination } from "../common/table/pagination";
import { TransactionsHeader } from "./details/transactions/atoms/transactions-header";
import { ClientReport } from "./details/molecules/client-report";
import InfoCard from "../common/info-card";
import { ClientCards } from "./details/molecules/client-cards";

export const ClientDetails = () => {
  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="px-8">
      <Header title={dictionary.ClientDetails} />
      <div className="flex flex-col gap-4 py-4 h-[90vh]">
        <div className="flex w-full gap-4">
          <div className="bg-secondary p-4 w-[50%] rounded-md">
            <p className="font-medium text-md">{"Client Details"}</p>
            <ClientDetailsCardForm />
          </div>
          <div className="bg-secondary p-4 w-[50%] rounded-md">
            <ClientReport />
          </div>
        </div>
        <div className="bg-background w-full h-[250px] rounded-md">
          <ClientCards />
        </div>

        <div className="bg-secondary p-4 h-full flex flex-col gap-4 rounded-md">
          <TransactionsHeader />
          <div className="flex flex-col w-full h-full p-4 pb-0 rounded-md justify-between bg-background">
            <div className="flex flex-col gap-4">
              <Transactions />
            </div>
            <TablePagination />
          </div>
        </div>
      </div>
    </div>
  );
};
