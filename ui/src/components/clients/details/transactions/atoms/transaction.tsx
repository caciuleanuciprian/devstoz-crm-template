import { TableRow, TableCell } from "@/components/ui/table";
import { TransactionsActions } from "./transactions-actions";
import { LanguageContext } from "@/i18n/language-context";
import { useContext } from "react";
import { getIcon, valueToLabelTabelTransactionType } from "../utils/consts";
import { TransactionProps } from "../utils/types";

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
