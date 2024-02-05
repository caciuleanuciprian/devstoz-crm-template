import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";
import { LanguageContext } from "@/i18n/language-context";
import { useContext, useEffect } from "react";
import { Modal } from "@/components/common/modal";
import { TransactionForm } from "../molecules/transaction-form";
import { AddTransaction } from "@/components/clients/core/clients.service";
import useAxios from "@/lib/axios/useAxios";
import { useParams } from "react-router-dom";
import { useForm, useFormFields } from "@formiz/core";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import { toast } from "@/components/ui/use-toast";
import { useRecoilState } from "recoil";
import { fileAtom } from "@/components/clients/utils/transactions.recoil";
import { shouldRefetchAtom } from "@/components/clients/utils/clients.recoil";

export const TransactionsHeader = () => {
  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);
  const [file, setFile] = useRecoilState(fileAtom);

  const { dictionary } = useContext(LanguageContext);

  const { clientId } = useParams();

  const addTransactionForm = useForm();

  const values = useFormFields({
    connect: addTransactionForm,
    selector: (field) => field.value,
  });

  const { data, error, loadData, dataCode } = useAxios({
    fetchFn: AddTransaction,
    paramsOfFetch: {
      clientId: clientId,
      body: {
        ...values,
        file: file,
      },
    },
  });

  const handleSubmit = async () => {
    await loadData();
  };

  useEffect(() => {
    if (data && dataCode === AxiosStatusCode.CODE_200_OK) {
      toast({
        title: dictionary.TransactionAddedSuccesfully,
        variant: "success",
      });
      setShouldRefetch(true);
      setFile(null);
    } else if (error) {
      toast({ title: dictionary.GenericError, variant: "destructive" });
    }
  }, [dataCode, error]);

  return (
    <div className="flex gap-4 justify-between items-center">
      <div className="w-[100%]">
        <p className="font-medium text-md">{"Transactions"}</p>
      </div>
      <div>
        <Modal
          trigger={
            <Button
              size={"sm"}
              className="text-xs flex items-center"
              variant={"default"}
            >
              <FilePlus2 className="h-[1.2rem] w-[1.2rem] mr-2" />
              {dictionary.AddTransaction}
            </Button>
          }
          title={dictionary.AddTransaction}
          description={dictionary.AddTransactionDescription}
          component={<TransactionForm form={addTransactionForm} />}
          confirmTxt={dictionary.Submit}
          cancelTxt={dictionary.Cancel}
          onConfirm={handleSubmit}
        />
      </div>
    </div>
  );
};
