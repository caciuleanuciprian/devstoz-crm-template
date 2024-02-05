import { Loader } from "@/components/common/loader";
import { Transaction } from "../atoms/transaction";
import { Button } from "@/components/ui/button";
import { GetTransactions } from "@/components/clients/core/clients.service";
import useAxios from "@/lib/axios/useAxios";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { shouldRefetchAtom } from "@/components/clients/utils/clients.recoil";
import { useRecoilState } from "recoil";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { LanguageContext } from "@/i18n/language-context";
import { TransactionObject } from "@/components/clients/utils/types";

export const Transactions = () => {
  const { dictionary } = useContext(LanguageContext);

  const [shouldRefetch, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const { clientId } = useParams();

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetTransactions,
    paramsOfFetch: {
      clientId: clientId,
    },
    loadOnMount: true,
  });

  useEffect(() => {
    if (shouldRefetch) {
      loadData();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  const TransactionsTableHeaders = [
    { id: "icon", label: dictionary.FileType, size: 10 },
    { id: "name", label: dictionary.Name, size: 30 },
    { id: "amount", label: dictionary.Amount, size: 15 },
    { id: "fileName", label: dictionary.FileName, size: 15 },
    { id: "actions", label: dictionary.Actions, alignRight: true, size: 30 },
  ];

  return (
    <Table className="bg-background">
      <TableHeader>
        <TableRow>
          {TransactionsTableHeaders.map((header) => (
            <TableHead
              key={header.id}
              className={`${header.alignRight ? "text-right" : "text-left"}`}
              style={{
                width: header.size + "%",
              }}
            >
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {isLoading && (
          <TableRow className="hover:!bg-transparent">
            <TableCell colSpan={TransactionsTableHeaders.length}>
              <Loader />
            </TableCell>
          </TableRow>
        )}
        {error && (
          <TableRow className="hover:!bg-transparent">
            <TableCell colSpan={TransactionsTableHeaders.length}>
              <div className="text-center">{dictionary.GenericError}</div>
            </TableCell>
          </TableRow>
        )}
        {!isLoading && data && data.length === 0 && (
          <TableRow className="hover:!bg-transparent">
            <TableCell colSpan={TransactionsTableHeaders.length}>
              <div className="text-center">{dictionary.NoResultsFound}</div>
            </TableCell>
          </TableRow>
        )}
        {!isLoading &&
          data &&
          data.length > 0 &&
          data.map((transaction: TransactionObject) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
      </TableBody>
    </Table>
  );
};
