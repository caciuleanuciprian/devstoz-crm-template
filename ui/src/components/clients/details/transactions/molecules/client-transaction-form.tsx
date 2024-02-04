import ClientInput from "@/components/clients/common/atoms/client-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageContext } from "@/i18n/language-context";
import { Formiz, useForm } from "@formiz/core";
import { useContext } from "react";

interface ClientTransactionFormProps {
  isLoading: boolean;
}

export const ClientTransactionForm = ({
  isLoading,
}: ClientTransactionFormProps) => {
  const clientTransactionForm = useForm();

  const { dictionary } = useContext(LanguageContext);

  return (
    <Formiz connect={clientTransactionForm}>
      <ClientInput
        label={dictionary.Name}
        isLoading={isLoading}
        type={"text"}
        name={"name"}
      />
      <ClientInput
        label={dictionary.Amount}
        isLoading={isLoading}
        type={"number"}
        name={"amount"}
      />
      <Label>{dictionary.UploadFile}</Label>
      <Input id="file" type="file" />
    </Formiz>
  );
};
