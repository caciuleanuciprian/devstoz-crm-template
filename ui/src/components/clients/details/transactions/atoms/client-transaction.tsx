import { ClientTransactionProps } from "../../../utils/types";
import file_excell from "@/assets/icons/file-excel.svg";
import file_word from "@/assets/icons/file-word.svg";
import file_image from "@/assets/icons/file-image.svg";
import file_pdf from "@/assets/icons/file-pdf.svg";
import file_default from "@/assets/icons/file.svg";
import { useContext, useEffect } from "react";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { DeleteTransaction } from "@/components/clients/core/clients.service";
import { AxiosStatusCode } from "@/lib/axios/helpers";
import { toast } from "@/components/ui/use-toast";
import { shouldRefetchAtom } from "@/components/clients/utils/clients.recoil";
import { useRecoilState } from "recoil";
import { TableRow, TableCell } from "@/components/ui/table";
import { ClientTransactionsActions } from "./client-transactions-actions";
import { Icons } from "@/components/ui/icons";

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
      return <Icons.filePDF />;
    case FileExtensions.DOC:
      return <Icons.fileWord />;
    case FileExtensions.DOCX:
      return <Icons.fileWord />;
    case FileExtensions.XLS:
      return <Icons.fileExcel />;
    case FileExtensions.XLSX:
      return <Icons.fileExcel />;
    case FileExtensions.JPG:
      return <Icons.fileImage />;
    case FileExtensions.JPEG:
      return <Icons.fileImage />;
    case FileExtensions.PNG:
      return <Icons.fileImage />;
    default:
      return <Icons.file />;
  }
};

export const ClientTransaction = ({ transaction }: ClientTransactionProps) => {
  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  console.log(transaction);

  return (
    <TableRow key={transaction.id}>
      <TableCell>{getIcon(transaction.fileName)}</TableCell>
      <TableCell>{transaction.name}</TableCell>
      <TableCell>{transaction.amount}</TableCell>
      <TableCell className="text-xs italic">{transaction.fileName}</TableCell>
      <TableCell>
        <ClientTransactionsActions transaction={transaction} />
      </TableCell>
    </TableRow>
  );
};
