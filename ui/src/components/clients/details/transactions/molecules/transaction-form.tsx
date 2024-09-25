import InputWithLabel from "@/components/common/forms/input-with-label";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageContext } from "@/i18n/language-context";
import { Form, Formiz } from "@formiz/core";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  fileAtom,
  transactionTypeSelectAtom,
} from "@/components/clients/details/transactions/utils/transactions.recoil";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  isMinNumber,
  isNotEmptyString,
  isNumber,
  isRequired,
} from "@formiz/validations";
import {
  selectTransactionsTypeOptions,
  valueToLabelTransactionType,
} from "../utils/consts";
import { TransactionObject, TransactionType } from "../utils/types";
import { UploadFiles } from "@/components/common/settings/molecules/upload-image";

interface TransactionFormProps {
  form: Form;
  data?: TransactionObject;
}

export const TransactionForm = ({ form, data }: TransactionFormProps) => {
  const [files, setFiles] = useRecoilState(fileAtom);
  const [, setTransactionType] = useRecoilState(transactionTypeSelectAtom);

  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    if (data) {
      setTransactionType(data.transactionType);
    } else {
      setTransactionType(TransactionType.INCOME);
    }
  }, [data]);

  useEffect(() => {
    setFiles(null);
  }, []);

  useEffect(() => {
    form.setValues({
      ...data,
      transactionType: data?.transactionType,
    });
  }, [data]);

  return (
    <Formiz connect={form}>
      <div className="col-span-4 w-full">
        <InputWithLabel
          label={dictionary.Name}
          type={"text"}
          name={"name"}
          required={dictionary.FieldCannotBeEmpty}
          validations={[
            {
              handler: isRequired() && isNotEmptyString(),
              message: `${dictionary.InvalidName}`,
            },
          ]}
        />
      </div>
      <div className="col-span-4 w-full">
        <InputWithLabel
          label={dictionary.Amount}
          type={"number"}
          name={"amount"}
          required={dictionary.FieldCannotBeEmpty}
          validations={[
            {
              handler: isRequired() && isNumber() && isMinNumber(0),
              message: `${dictionary.InvalidAmount}`,
            },
          ]}
        />
      </div>
      <div className="col-span-4 w-full pb-4">
        <Select
          onValueChange={(e: any) => setTransactionType(e)}
          defaultValue={data?.transactionType}
        >
          <Label>{dictionary.TransactionType}</Label>
          <SelectTrigger>
            <SelectValue placeholder={dictionary.Income} />
          </SelectTrigger>
          <SelectContent>
            {selectTransactionsTypeOptions.map((option: string) => (
              <SelectItem key={option} value={option}>
                {valueToLabelTransactionType(option, dictionary)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* TODO Add validation to this filed */}
      {!data && (
        <UploadFiles
          setFiles={setFiles}
          files={files ?? []}
          isReadonly={false}
          accept={{}}
        />
      )}
    </Formiz>
  );
};
