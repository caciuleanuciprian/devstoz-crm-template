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
import { FilterableTableHeader } from "../atoms/transaction-table-filterable-header";
import { filterTransactionTableByAtom } from "@/components/clients/utils/transactions.recoil";
import { transactionHeaders } from "../utils/consts";

export const Transactions = () => {
  const { dictionary } = useContext(LanguageContext);

  const [shouldRefetch, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const [filterBy] = useRecoilState(filterTransactionTableByAtom);

  const { clientId } = useParams();

  const TransactionsTableHeaders = transactionHeaders(
    dictionary,
    <FilterableTableHeader />
  );

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetTransactions,
    paramsOfFetch: {
      clientId: clientId,
      transactionType: filterBy,
    },
    loadOnMount: true,
  });

  useEffect(() => {
    if (shouldRefetch) {
      loadData();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

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
              {header.component ? header.component : header.label}
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
        {!isLoading && data && data.entries.length === 0 && (
          <TableRow className="hover:!bg-transparent">
            <TableCell colSpan={TransactionsTableHeaders.length}>
              <div className="text-center">{dictionary.NoResultsFound}</div>
            </TableCell>
          </TableRow>
        )}
        {!isLoading &&
          data &&
          data.entries.length > 0 &&
          data.entries.map((transaction: TransactionObject) => (
            <Transaction key={transaction.id} transaction={transaction} />
          ))}
      </TableBody>
    </Table>
  );
};
