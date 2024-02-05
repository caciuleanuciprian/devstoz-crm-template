import InputWithLabel from "@/components/common/forms/input-with-label";
import { TransactionObject } from "@/components/clients/utils/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageContext } from "@/i18n/language-context";
import { Form, Formiz, useForm, useFormFields } from "@formiz/core";
import { useContext, useEffect } from "react";
import {
  AddTransaction,
  UpdateTransaction,
} from "@/components/clients/core/clients.service";
import useAxios from "@/lib/axios/useAxios";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fileAtom } from "@/components/clients/utils/transactions.recoil";

interface TransactionFormProps {
  form: Form;
  data?: TransactionObject;
}

export const TransactionForm = ({ form, data }: TransactionFormProps) => {
  const [, setFile] = useRecoilState(fileAtom);

  const { dictionary } = useContext(LanguageContext);

  return (
    <Formiz connect={form}>
      <InputWithLabel
        label={dictionary.Name}
        type={"text"}
        name={"name"}
        defaultValue={data?.name}
      />
      <InputWithLabel
        label={dictionary.Amount}
        type={"number"}
        name={"amount"}
        defaultValue={data?.amount}
      />
      {!data && (
        <>
          <Label>{dictionary.UploadFile}</Label>
          <Input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </>
      )}
    </Formiz>
  );
};
