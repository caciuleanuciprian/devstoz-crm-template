import { TransactionProps } from "../../../utils/types";
import { TableRow, TableCell } from "@/components/ui/table";
import { TransactionsActions } from "./transactions-actions";
import { Icons } from "@/components/ui/icons";
import { valueToLabelTabelTransactionType } from "@/components/clients/utils/consts";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";

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

export const Transaction = ({ transaction }: TransactionProps) => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <TableRow key={transaction.id}>
      <TableCell>{getIcon(transaction.fileName)}</TableCell>
      <TableCell>{transaction.name}</TableCell>
      <TableCell>{transaction.amount}</TableCell>
      <TableCell>
        {valueToLabelTabelTransactionType(
          transaction.transactionType,
          dictionary
        )}
      </TableCell>
      <TableCell className="text-xs italic">{transaction.fileName}</TableCell>
      <TableCell>
        <TransactionsActions transaction={transaction} />
      </TableCell>
    </TableRow>
  );
};
