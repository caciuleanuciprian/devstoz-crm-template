import ClientInput from "@/components/clients/atoms/client-input";
import { GetClient } from "@/components/clients/core/clients.service";
import { InteractionMode } from "@/components/common/forms/utils";
import { Header } from "@/components/common/header";
import { Loader } from "@/components/common/loader";
import Page from "@/components/common/page";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { Formiz, useForm } from "@formiz/core";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

export const ClientDetailsPage = () => {
  const { dictionary } = useContext(LanguageContext);

  const { clientId } = useParams();

  const { data, error, isLoading } = useAxios({
    fetchFn: GetClient,
    paramsOfFetch: {
      clientId: clientId,
    },
    loadOnMount: true,
  });

  const [clientType, setClientType] = useState<string>(data?.clientType);
  const clientForm = useForm();

  const [interactionMode, setInteractionMode] = useState<InteractionMode>(
    InteractionMode.View
  );

  const formatData = (data: any) => {
    return data.split("T")[0];
  };

  const handleClientUpdate = () => {
    setInteractionMode(InteractionMode.View);
  };

  console.log(data);

  return (
    <Page>
      <div className="px-8">
        <Header title={dictionary.ClientDetails} />
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="bg-secondary p-4">
            {!isLoading && data ? (
              <Formiz connect={clientForm}>
                <div className="bg-background p-4">
                  <div className="flex gap-4 justify-center w-full">
                    <div className="col-span-4 w-full">
                      <ClientInput
                        label={dictionary.Name}
                        isDisabled={true}
                        type={"text"}
                        name={"name"}
                        defaultValue={data.name}
                      />
                    </div>
                    <div className="col-span-4 w-full">
                      <ClientInput
                        label={dictionary.Email}
                        isDisabled={true}
                        type={"email"}
                        name={"email"}
                        defaultValue={data.email}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center w-full">
                    <div className="col-span-4 w-full">
                      <ClientInput
                        label={dictionary.Phone}
                        isDisabled={true}
                        type={"phone"}
                        name={"telephone"}
                        defaultValue={data.telephone}
                      />
                    </div>
                    <div className="col-span-4 w-full">
                      <ClientInput
                        label={dictionary.Address}
                        isDisabled={true}
                        type={"text"}
                        name={"address"}
                        defaultValue={data.address}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center w-full">
                    <div className="col-span-4 w-full">
                      <ClientInput
                        label={dictionary.Type}
                        isDisabled={true}
                        type={"select"}
                        name={"clientType"}
                        defaultValue={data.clientType}
                      />
                    </div>
                    <div className="col-span-4 w-full">
                      <ClientInput
                        label={dictionary.CreationDate}
                        isDisabled={true}
                        type={"text"}
                        name={"creationDate"}
                        defaultValue={formatData(data.creationDate)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    {interactionMode === "view" ? (
                      <Button
                        variant={"default"}
                        onClick={() => setInteractionMode(InteractionMode.Edit)}
                      >
                        {dictionary.Edit}
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant={"destructive"}
                          onClick={() =>
                            setInteractionMode(InteractionMode.View)
                          }
                        >
                          {dictionary.Cancel}
                        </Button>
                        <Button
                          onClick={() => handleClientUpdate()}
                          variant={"default"}
                        >
                          {dictionary.Save}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Formiz>
            ) : (
              <Loader />
            )}
          </div>
          <div className="bg-secondary p-4 drop-shadow-lg">
            {!isLoading && data ? (
              <Formiz connect={clientForm}>
                <div className="bg-background p-4">
                  <div className="flex gap-4">
                    <div className="col-span-4">
                      <ClientInput
                        label={dictionary.Name}
                        isDisabled={true}
                        type={"text"}
                        name={"name"}
                        defaultValue={data.name}
                      />
                    </div>
                    <div className="col-span-4">
                      <ClientInput
                        label={dictionary.Email}
                        isDisabled={true}
                        type={"email"}
                        name={"email"}
                        defaultValue={data.email}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="col-span-4">
                      <ClientInput
                        label={dictionary.Phone}
                        isDisabled={true}
                        type={"phone"}
                        name={"telephone"}
                        defaultValue={data.telephone}
                      />
                    </div>
                    <div className="col-span-4">
                      <ClientInput
                        label={dictionary.Address}
                        isDisabled={true}
                        type={"text"}
                        name={"address"}
                        defaultValue={data.address}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="col-span-4">
                      <ClientInput
                        label={dictionary.Type}
                        isDisabled={true}
                        type={"select"}
                        name={"clientType"}
                        defaultValue={data.clientType}
                      />
                    </div>
                    <div className="col-span-4">
                      <ClientInput
                        label={dictionary.CreationDate}
                        isDisabled={true}
                        type={"text"}
                        name={"creationDate"}
                        defaultValue={formatData(data.creationDate)}
                      />
                    </div>
                  </div>
                </div>
              </Formiz>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};
