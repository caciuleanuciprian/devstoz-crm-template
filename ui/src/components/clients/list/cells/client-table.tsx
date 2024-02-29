import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LanguageContext } from "@/i18n/language-context";
import { useContext, useEffect } from "react";
import { ClientTableActions } from "../atoms/client-table-actions";
import { Loader } from "@/components/common/loader";
import { iconToLabelClientType, valueToLabelClientType } from "../utils/consts";

import { FilterableTableHeader } from "../atoms/client-table-filterable-header";
import { useRecoilState } from "recoil";
import { totalClientsAtom } from "../utils/clients.recoil";
import { toast } from "@/components/ui/use-toast";
import { filterTransactionTableByAtom } from "../../details/transactions/utils/transactions.recoil";
import { CellWithHelper } from "../atoms/cell-with-helper";

interface ClientTableProps {
  data: any;
  error: any;
  isLoading: boolean;
}

export const ClientTable = ({ data, error, isLoading }: ClientTableProps) => {
  const [, setTotalClients] = useRecoilState(totalClientsAtom);
  const [, setTransactionFilterBy] = useRecoilState(
    filterTransactionTableByAtom
  );

  const { dictionary } = useContext(LanguageContext);

  const ClientTableHeaders = [
    { id: "name", label: dictionary.Name, size: 15 },
    { id: "address", label: dictionary.Address, size: 15 },
    { id: "phone", label: dictionary.Phone, size: 15 },
    { id: "email", label: dictionary.Email, size: 15 },
    {
      id: "type",
      label: dictionary.Type,
      component: <FilterableTableHeader />,
      size: 15,
    },
    {
      id: "createdBy",
      component: (
        <CellWithHelper
          label={dictionary.CreatedBy}
          helper={dictionary.CreatedOn}
        />
      ),
      size: 10,
    },
    {
      id: "editedBy",
      component: (
        <CellWithHelper
          label={dictionary.EditedBy}
          helper={dictionary.EditedOn}
        />
      ),
      size: 10,
    },
    { id: "actions", label: dictionary.Actions, alignRight: true, size: 5 },
  ];

  useEffect(() => {
    if (error) {
      toast({ title: dictionary.GenericError, variant: "destructive" });
    }
  }, [error]);

  useEffect(() => {
    setTransactionFilterBy(null);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTotalClients(0);
    }
    if (data) {
      setTotalClients(data.numberOfEntries);
    }
  }, [data, isLoading]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {ClientTableHeaders.map((header) => (
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
          <TableRow className=" hover:!bg-transparent">
            <TableCell
              className="align-top text-center"
              colSpan={ClientTableHeaders.length}
            >
              <Loader />
            </TableCell>
          </TableRow>
        )}
        {error && (
          <TableRow className=" hover:!bg-transparent">
            <TableCell
              className="align-top text-center"
              colSpan={ClientTableHeaders.length}
            >
              <div className="text-center">{dictionary.GenericError}</div>
            </TableCell>
          </TableRow>
        )}
        {!isLoading && data?.entries.length === 0 && (
          <TableRow className=" hover:!bg-transparent">
            <TableCell
              className="align-top text-center"
              colSpan={ClientTableHeaders.length}
            >
              <div className="text-center">{dictionary.NoResultsFound}</div>
            </TableCell>
          </TableRow>
        )}
        {!isLoading &&
          data?.entries.length > 0 &&
          data.entries.map((client: any) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.address}</TableCell>
              <TableCell>{client.telephone}</TableCell>
              <TableCell>{client.email}</TableCell>

              <TableCell>
                <div className="flex items-center">
                  {iconToLabelClientType(client.clientType)}{" "}
                  {valueToLabelClientType(client.clientType, dictionary)}
                </div>
              </TableCell>
              <TableCell>
                <CellWithHelper
                  label={client.createdBy}
                  helper={client.creationDate}
                />
              </TableCell>
              <TableCell>
                {client.lastUpdatedBy} - {client.lastUpdatedDate}
              </TableCell>
              <TableCell>
                <ClientTableActions id={client.id} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
