import Icon from "@/components/common/icon";
import { ClientTransactionProps } from "../../../utils/types";
import file_excell from "@/assets/icons/file-excel.svg";
import file_word from "@/assets/icons/file-word.svg";
import file_image from "@/assets/icons/file-image.svg";
import file_pdf from "@/assets/icons/file-pdf.svg";
import file_default from "@/assets/icons/file.svg";
import { SVGProps, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";
import { Modal } from "@/components/common/modal";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { DeleteTransaction } from "@/components/clients/core/clients.service";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import { toast } from "@/components/ui/use-toast";
import { shouldRefetchAtom } from "@/components/clients/utils/clients.recoil";
import { useRecoilState } from "recoil";

enum FileExtensions {
  PDF = "pdf",
  DOC = "doc",
  DOCX = "docx",
  XLS = "xls",
  XLSX = "xlsx",
  JPG = "jpg",
  PNG = "png",
  JPEG = "jpeg",
}

const getFileExtension = (fileName: string) => {
  return fileName.split(".").pop();
};

const getIcon = (fileName: string) => {
  const extension = getFileExtension(fileName);
  switch (extension) {
    case FileExtensions.PDF:
      return file_pdf;
    case FileExtensions.DOC:
      return file_word;
    case FileExtensions.DOCX:
      return file_word;
    case FileExtensions.XLS:
      return file_excell;
    case FileExtensions.XLSX:
      return file_excell;
    case FileExtensions.JPG:
      return file_image;
    case FileExtensions.JPEG:
      return file_image;
    case FileExtensions.PNG:
      return file_image;
    default:
      return file_default;
  }
};

export const ClientTransaction = ({
  id,
  name,
  amount,
  fileName,
}: ClientTransactionProps) => {
  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const { error, dataCode, loadData } = useAxios({
    fetchFn: DeleteTransaction,
    paramsOfFetch: {
      transactionId: id,
    },
  });

  console.log(id, name, amount, fileName);

  useEffect(() => {
    if (dataCode === AxiosStatusCode.CODE_200_OK) {
      toast({ variant: "success", title: "Transaction deleted successfully" });
      setShouldRefetch(true);
    } else if (error) {
      toast({ variant: "destructive", title: "Transaction not deleted" });
    }
  }, [dataCode, error]);

  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="flex justify-between items-center bg-background p-4 border-b-2">
      <div className="flex gap-4 items-center">
        <img
          className="w-[32px] h-[32px]"
          src={getIcon(fileName)}
          alt={fileName}
        />
        <p>{name}</p>
      </div>
      <p>{amount}</p>
      <div className="flex gap-4">
        <Button size={"xs"} variant={"ghost"} onClick={() => loadData({ id })}>
          <Download className="h-[1.2rem] w-[1.2rem] cursor-pointer" />
        </Button>
        <Modal
          trigger={
            <div className="flex">
              <Button size={"xs"} variant={"ghost"}>
                <Trash className="h-[1.2rem] w-[1.2rem] cursor-pointer text-destructive" />
              </Button>
            </div>
          }
          title={dictionary.DeleteClient}
          description={dictionary.DeleteClientConfirmation}
          confirmTxt={dictionary.Delete}
          cancelTxt={dictionary.Cancel}
          onConfirm={loadData}
          onCancel={() => {}}
          isDelete
        />
      </div>
    </div>
  );
};
