import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageContext } from "@/i18n/language-context";
import { useContext, useEffect, useState } from "react";
import InputWithLabel from "../../../common/forms/input-with-label";
import {
  ClientFormProps,
  InputWithLabelProps,
} from "@/components/clients/list/utils/types";
import { Formiz, useForm, useFormFields } from "@formiz/core";
import { Button } from "@/components/ui/button";
import { toast } from "../../../ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useAxios from "@/lib/axios/useAxios";
import { AddClient } from "../../core/clients.service";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import {
  ClientType,
  renderFormFields,
  valueToLabelClientType,
} from "../utils/consts";
import { useRecoilState } from "recoil";
import { shouldRefetchAtom } from "../utils/clients.recoil";
import { Loader } from "@/components/common/loader";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";

export function ClientForm({ initialValues, sheetProps }: ClientFormProps) {
  const { dictionary } = useContext(LanguageContext);

  const { trigger, title, description, submitTxt } = sheetProps;

  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const [selectedOrganization] = useRecoilState(selectedOrganizationAtom);

  const [clientType, setClientType] = useState<ClientType>(ClientType.SRL);
  const clientForm = useForm({
    initialValues: initialValues,
  });

  const values = useFormFields({
    connect: clientForm,
    selector: (field) => field.value,
  });

  const { data, error, isLoading, loadData, dataCode } = useAxios({
    fetchFn: AddClient,
    paramsOfFetch: {
      organizationId: selectedOrganization?.id,
      body: {
        ...values,
        clientType: clientType,
      },
    },
  });

  const handleAddClient = async () => {
    if (clientForm.isValid) {
      await loadData();
      setShouldRefetch(true);
    }
  };

  const handleInputType = (field: InputWithLabelProps) => {
    if (field.type === "select") {
      return (
        <div className="col-span-4" key={`${field.label}-${field.type}`}>
          <Select
            onValueChange={(e: ClientType) => setClientType(e)}
            disabled={field.isLoading}
            defaultValue={clientType}
          >
            <Label>{field.label}</Label>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field?.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {valueToLabelClientType(option, dictionary)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    } else {
      return (
        <div className="col-span-4" key={`${field.label}-${field.type}`}>
          <InputWithLabel
            label={field.label}
            isLoading={field.isLoading}
            type={field.type}
            name={field.name}
            validations={field.validations}
            required={field.required}
          />
        </div>
      );
    }
  };

  useEffect(() => {
    if (data && dataCode === AxiosStatusCode.CODE_201_CREATED) {
      toast({ title: dictionary.ClientAddedSuccess, variant: "success" });
      clientForm.reset();
    } else if (error) {
      toast({ title: dictionary.GenericError, variant: "destructive" });
    }
  }, [data]);

  return (
    <Sheet>
      <SheetTrigger asChild className="w-full">
        {trigger}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <Formiz connect={clientForm} autoForm>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4">
              {renderFormFields(dictionary, isLoading).map((field: any) =>
                handleInputType(field)
              )}
            </div>
          </div>
        </Formiz>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              variant={"default"}
              className="text-xs flex items-center px-8"
              onClick={() => {
                handleAddClient();
              }}
              disabled={isLoading || !clientForm.isValid}
            >
              {isLoading ? <Loader /> : submitTxt}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
