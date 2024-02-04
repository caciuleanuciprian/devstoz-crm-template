import { DeleteTransaction } from "@/components/clients/core/clients.service";
import { shouldRefetchAtom } from "@/components/clients/utils/clients.recoil";
import { Transaction } from "@/components/clients/utils/types";
import { Modal } from "@/components/common/modal";
import { toast } from "@/components/ui/use-toast";
import { LanguageContext } from "@/i18n/language-context";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import useAxios from "@/lib/axios/useAxios";
import { Pencil, Trash, Download } from "lucide-react";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { ClientTransactionForm } from "../molecules/client-transaction-form";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";

interface ClientTransactionsActionsProps {
  transaction: Transaction;
}

export const ClientTransactionsActions = ({
  transaction,
}: ClientTransactionsActionsProps) => {
  const { dictionary } = useContext(LanguageContext);

  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const { error, dataCode, loadData } = useAxios({
    fetchFn: DeleteTransaction,
    paramsOfFetch: {
      transactionId: transaction.id,
    },
  });

  const handleDelete = () => {
    loadData();
  };

  const handleDownload = () => {
    console.log("download");
  };

  const handleEdit = () => {
    console.log("edit");
  };

  useEffect(() => {
    if (dataCode === AxiosStatusCode.CODE_200_OK) {
      toast({ variant: "success", title: "Transaction deleted successfully" });
      setShouldRefetch(true);
    } else if (error) {
      toast({ variant: "destructive", title: "Transaction not deleted" });
    }
  }, [dataCode, error]);

  return (
    <div className="flex justify-end items-center gap-2">
      <Modal
        trigger={
          <Button
            className="text-center"
            size={"xs"}
            variant="ghost"
            onClick={handleDownload}
          >
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
          <Button size={"xs"} variant="ghost" onClick={handleEdit}>
            <Pencil className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        }
        title={dictionary.EditTransaction}
        description={dictionary.EditTransactionDescription}
        component={<ClientTransactionForm isLoading={false} />}
        confirmTxt={dictionary.Save}
        cancelTxt={dictionary.Cancel}
        onConfirm={() => console.log("edit")}
      />
      <Button size={"xs"} variant="ghost" onClick={handleDownload}>
        <Download className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
};
