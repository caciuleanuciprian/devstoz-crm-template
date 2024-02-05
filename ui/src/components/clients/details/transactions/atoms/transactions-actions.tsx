import {
  DeleteTransaction,
  GetTransactionFile,
  UpdateTransaction,
} from "@/components/clients/core/clients.service";
import { shouldRefetchAtom } from "@/components/clients/utils/clients.recoil";
import { TransactionObject } from "@/components/clients/utils/types";
import { Modal } from "@/components/common/modal";
import { toast } from "@/components/ui/use-toast";
import { LanguageContext } from "@/i18n/language-context";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import useAxios from "@/lib/axios/useAxios";
import { Pencil, Trash, Download } from "lucide-react";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { TransactionForm } from "../molecules/transaction-form";
import { Button } from "@/components/ui/button";
import { useForm, useFormFields } from "@formiz/core";

interface TransactionsActionsProps {
  transaction: TransactionObject;
}

export const TransactionsActions = ({
  transaction,
}: TransactionsActionsProps) => {
  const { dictionary } = useContext(LanguageContext);

  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const updateTransactionForm = useForm();

  const values = useFormFields({
    connect: updateTransactionForm,
    selector: (field) => field.value,
  });

  const { error, dataCode, loadData } = useAxios({
    fetchFn: DeleteTransaction,
    paramsOfFetch: {
      transactionId: transaction.id,
    },
  });

  const {
    data: transactionFileData,
    error: transactionFileError,
    dataCode: transactionFileDataCode,
    loadData: loadTransactionFile,
  } = useAxios({
    fetchFn: GetTransactionFile,
    paramsOfFetch: {
      transactionId: transaction.id,
    },
  });

  const {
    error: updateError,
    loadData: updateTransaction,
    dataCode: updateDataCode,
  } = useAxios({
    fetchFn: UpdateTransaction,
    paramsOfFetch: {
      transactionId: transaction.id,
      body: {
        ...values,
      },
    },
  });

  const handleDelete = async () => {
    await loadData();
  };

  const handleDownload = async () => {
    await loadTransactionFile();
  };

  const handleEdit = async () => {
    await updateTransaction();
  };

  const handleDownloadFile = () => {
    const link = document.createElement("a");
    link.target = "_blank";
    link.download = transaction.fileName;
    const URL = window.URL || window.webkitURL;
    link.href = URL.createObjectURL(transactionFileData);
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  useEffect(() => {
    if (updateDataCode === AxiosStatusCode.CODE_200_OK) {
      toast({
        variant: "default",
        title: dictionary.TransactionUpdatedSuccesfully,
        duration: 500,
      });
      setShouldRefetch(true);
    } else if (updateError) {
      toast({ variant: "destructive", title: dictionary.GenericError });
    }
  }, [updateDataCode, updateError]);

  useEffect(() => {
    if (transactionFileDataCode === AxiosStatusCode.CODE_200_OK) {
      toast({
        variant: "default",
        title: dictionary.StartingFileDownload,
        duration: 500,
      });
      handleDownloadFile();
    } else if (transactionFileError) {
      toast({ variant: "destructive", title: dictionary.GenericError });
    }
  }, [transactionFileDataCode, transactionFileError]);

  useEffect(() => {
    if (dataCode === AxiosStatusCode.CODE_200_OK) {
      toast({
        variant: "success",
        title: dictionary.TransactionDeletedSuccesfully,
      });
      setShouldRefetch(true);
    } else if (error) {
      toast({ variant: "destructive", title: dictionary.GenericError });
    }
  }, [dataCode, error]);

  return (
    <div className="flex justify-end items-center gap-2">
      <Modal
        trigger={
          <Button className="text-center" size={"xs"} variant="ghost">
            <Trash className="h-[1.2rem] w-[1.2rem] text-destructive" />
          </Button>
        }
        title={dictionary.DeleteClient}
        description={dictionary.DeleteClientConfirmation}
        confirmTxt={dictionary.Delete}
        cancelTxt={dictionary.Cancel}
        onConfirm={handleDelete}
        isDelete
      />
      <Modal
        trigger={
          <Button size={"xs"} variant="ghost">
            <Pencil className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        }
        title={dictionary.EditTransaction}
        description={dictionary.EditTransactionDescription}
        component={
          <TransactionForm form={updateTransactionForm} data={transaction} />
        }
        confirmTxt={dictionary.Save}
        cancelTxt={dictionary.Cancel}
        onConfirm={handleEdit}
      />
      <Button size={"xs"} variant="ghost" onClick={handleDownload}>
        <Download className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
};
