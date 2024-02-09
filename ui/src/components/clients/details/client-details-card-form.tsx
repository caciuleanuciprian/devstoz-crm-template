import { InteractionMode } from "@/components/common/forms/utils";
import { Button } from "@/components/ui/button";
import { Formiz, useForm, useFormFields } from "@formiz/core";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader } from "@/components/common/loader";
import { Label } from "@/components/ui/label";
import InputWithLabel from "../../common/forms/input-with-label";
import {
  ClientType,
  formatData,
  selectClientTypeOptions,
  valueToLabelClientType,
} from "../utils/consts";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { UpdateClient } from "../core/clients.service";
import { toast } from "@/components/ui/use-toast";
import { AxiosStatusCode } from "@/lib/axios/helpers";

interface ClientDetailsCardFormProps {
  data: any;
  clientId: string | undefined;
  dataCode: number | null;
  error: any;
  isLoading: boolean;
}

export const ClientDetailsCardForm = ({
  data,
  clientId,
  dataCode,
  error,
  isLoading,
}: ClientDetailsCardFormProps) => {
  const { dictionary } = useContext(LanguageContext);

  const [clientType, setClientType] = useState<string>(data?.clientType);
  const clientForm = useForm();
  const values = useFormFields({
    connect: clientForm,
    selector: (field) => field.value,
  });

  const [interactionMode, setInteractionMode] = useState<InteractionMode>(
    InteractionMode.View
  );

  const {
    error: updateClientError,
    loadData: updateClientLoadData,
    dataCode: updateClientDataCode,
  } = useAxios({
    fetchFn: UpdateClient,
    paramsOfFetch: {
      clientId: clientId,
      body: {
        ...values,
        clientType: clientType ? clientType : data?.clientType,
      },
    },
  });

  const handleClientUpdate = () => {
    setInteractionMode(InteractionMode.View);
    updateClientLoadData();
  };

  useEffect(() => {
    if (error) {
      toast({ title: dictionary.GetClientError, variant: "destructive" });
    }
  }, [dataCode, error]);

  useEffect(() => {
    if (updateClientDataCode === AxiosStatusCode.CODE_200_OK) {
      toast({ title: dictionary.ClientUpdatedSuccesfully, variant: "success" });
    } else if (updateClientError) {
      toast({ title: dictionary.ClientUpdatedError, variant: "destructive" });
    }
  }, [updateClientDataCode, updateClientError]);

  useEffect(() => {
    if (data) {
      clientForm.setValues({
        name: data.name,
        email: data.email,
        telephone: data.telephone,
        address: data.address,
        creationDate: formatData(data.creationDate),
      });
    }
  }, [data]);

  return (
    <div className="w-full bg-background min-h-[25vh] flex flex-col justify-center items-center  rounded-md">
      <Formiz connect={clientForm}>
        {!isLoading && data && (
          <div className="p-4 w-full">
            <div className="flex gap-4 justify-center w-full h-full">
              <div className="col-span-4 w-full">
                <InputWithLabel
                  label={dictionary.Name}
                  isDisabled={InteractionMode.View === interactionMode}
                  type={"text"}
                  name={"name"}
                />
              </div>
              <div className="col-span-4 w-full">
                <InputWithLabel
                  label={dictionary.Email}
                  isDisabled={InteractionMode.View === interactionMode}
                  type={"email"}
                  name={"email"}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-center w-full">
              <div className="col-span-4 w-full">
                <InputWithLabel
                  label={dictionary.Phone}
                  isDisabled={InteractionMode.View === interactionMode}
                  type={"phone"}
                  name={"telephone"}
                />
              </div>
              <div className="col-span-4 w-full">
                <InputWithLabel
                  label={dictionary.Address}
                  isDisabled={InteractionMode.View === interactionMode}
                  type={"text"}
                  name={"address"}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-center w-full">
              <div className="col-span-4 w-full">
                <Select
                  onValueChange={(e: ClientType) => setClientType(e)}
                  disabled={InteractionMode.View === interactionMode}
                  defaultValue={data?.clientType}
                >
                  <Label>{dictionary.Type}</Label>
                  <SelectTrigger>
                    <SelectValue placeholder={dictionary.Type} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectClientTypeOptions.map((option: string) => (
                      <SelectItem key={option} value={option}>
                        {valueToLabelClientType(option, dictionary)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-4 w-full">
                <InputWithLabel
                  label={dictionary.CreationDate}
                  isDisabled={true}
                  type={"text"}
                  name={"creationDate"}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              {interactionMode === "view" ? (
                <Button
                  variant={"default"}
                  onClick={() => setInteractionMode(InteractionMode.Edit)}
                  className="text-xs flex items-center px-8"
                  size={"sm"}
                >
                  {dictionary.Edit}
                </Button>
              ) : (
                <>
                  <Button
                    variant={"destructive"}
                    onClick={() => setInteractionMode(InteractionMode.View)}
                    className="text-xs flex items-center px-8"
                    size={"sm"}
                  >
                    {dictionary.Cancel}
                  </Button>
                  <Button
                    onClick={() => handleClientUpdate()}
                    variant={"default"}
                    className="text-xs flex items-center px-8"
                    size={"sm"}
                  >
                    {dictionary.Save}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-start items-center h-full">
            <div className="text-center">{dictionary.GenericError}</div>
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        )}
      </Formiz>
    </div>
  );
};
