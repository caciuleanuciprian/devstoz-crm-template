import { Header } from "../common/header";
import { Button } from "../ui/button";
import { ClientDetailsCardForm } from "./details/client-details-card-form";
import { ClientTransactions } from "./details/transactions/molecules/client-transactions";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GetClient } from "./core/clients.service";

export const ClientDetails = () => {
  const { dictionary } = useContext(LanguageContext);

  const { clientId } = useParams();

  const { data, error, isLoading, dataCode } = useAxios({
    fetchFn: GetClient,
    paramsOfFetch: {
      clientId: clientId,
    },
    loadOnMount: true,
  });

  console.log(data);

  return (
    <div className="px-8">
      <Header title={dictionary.ClientDetails} />
      <div className="flex flex-col gap-4 py-4 h-[95vh]">
        <div className="flex w-full gap-4">
          <div className="bg-secondary p-4 w-[50%]">
            <p className="font-medium text-md">{"Client Details"}</p>
            <ClientDetailsCardForm
              data={data}
              clientId={clientId}
              dataCode={dataCode}
              error={error}
              isLoading={isLoading}
            />
          </div>
          <div className="bg-secondary p-4 w-[50%]">
            <p className="font-medium text-md">{"Client Details"}</p>
            <ClientDetailsCardForm
              data={data}
              clientId={clientId}
              dataCode={dataCode}
              error={error}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="bg-secondary p-4 h-full">
          <p className="font-medium text-md">{"Transactions"}</p>
          <ClientTransactions />
        </div>
      </div>
    </div>
  );
};