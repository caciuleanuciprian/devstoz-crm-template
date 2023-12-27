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
import { useContext, useState } from "react";
import ClientInput from "../atoms/client-input";
import {
  ClientFormProps,
  ClientInputProps,
} from "@/components/clients/utils/types";
import { Formiz, useForm, useFormFields } from "@formiz/core";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { toast } from "../../ui/use-toast";

export function ClientForm({
  fields,
  initialValues,
  sheetProps,
}: ClientFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dictionary } = useContext(LanguageContext);
  const clientForm = useForm({
    initialValues: initialValues,
  });

  const values = useFormFields({
    connect: clientForm,
    selector: (field) => field.value,
  });

  const clientFormFields: ClientInputProps[] = [
    {
      label: dictionary.Name,
      isLoading: isLoading,
      type: "text",
      name: "name",
    },
    {
      label: dictionary.Address,
      isLoading: isLoading,
      type: "text",
      name: "address",
    },
    {
      label: dictionary.Phone,
      isLoading: isLoading,
      type: "phone",
      name: "phone",
      validations: [
        {
          handler: (value: string) =>
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
              value
            ),
          message: `${dictionary.InvalidPhoneNumber}`,
        },
      ],
    },
    {
      label: dictionary.Email,
      isLoading: isLoading,
      type: "email",
      name: "email",
      validations: [
        {
          handler: (value: string) => value.includes("@"),
          message: `${dictionary.InvalidEmail}`,
        },
      ],
    },
  ];

  const handleAddClient = async () => {
    setIsLoading(true);
    // Should be changed with axios request
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: dictionary.ClientAddedSuccess, variant: "success" });
      toast({ title: dictionary.GenericError, variant: "destructive" });
      console.log(values);
      clientForm.reset();
    }, 3000);
  };
  return (
    <Sheet>
      <SheetTrigger asChild className="w-full">
        {sheetProps.trigger}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{sheetProps.title}</SheetTitle>
          <SheetDescription>{sheetProps.description}</SheetDescription>
        </SheetHeader>
        <Formiz connect={clientForm}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4">
              {clientFormFields.map((field) => (
                <div
                  className="col-span-4"
                  key={`${field.label}-${field.type}`}
                >
                  <ClientInput
                    label={field.label}
                    isLoading={field.isLoading}
                    type={field.type}
                    name={field.name}
                    validations={field.validations}
                  />
                </div>
              ))}
            </div>
          </div>
        </Formiz>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="button"
              variant={"default"}
              className="text-sm"
              onClick={(e) => {
                e.preventDefault();
                handleAddClient();
              }}
            >
              {isLoading ? (
                <Icons.spinner className="h-4 w-4 animate-spin" />
              ) : (
                sheetProps.submitTxt
              )}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
