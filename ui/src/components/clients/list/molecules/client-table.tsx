import { GetClients } from "@/components/dashboard/core/dashboard.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { useContext, useEffect } from "react";
import { ClientTableActions } from "./client-table-actions";
import { Loader } from "@/components/common/loader";
import {
  iconToLabelClientType,
  valueToLabelClientType,
} from "../../utils/consts";

import { FilterableTableHeader } from "../atoms/client-table-filterable-header";
import { useRecoilState } from "recoil";
import { shouldRefetchAtom } from "../../utils/clients.recoil";

export const ClientTable = () => {
  const [shouldRefetch, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const { dictionary } = useContext(LanguageContext);

  const ClientTableHeaders = [
    { id: "name", label: dictionary.Name, size: 15 },
    { id: "address", label: dictionary.Address, size: 25 },
    { id: "phone", label: dictionary.Phone, size: 15 },
    { id: "email", label: dictionary.Email, size: 15 },
    {
      id: "type",
      label: dictionary.Type,
      component: <FilterableTableHeader />,
      size: 25,
    },
    { id: "actions", label: dictionary.Actions, alignRight: true, size: 5 },
  ];

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetClients,
    paramsOfFetch: {
      userId: import.meta.env.VITE_USER_ID,
      page: 0,
      size: 15,
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
          <TableRow className="h-[72.5vh] hover:!bg-transparent">
            <TableCell
              className="align-top text-center"
              colSpan={ClientTableHeaders.length}
            >
              <Loader />
            </TableCell>
          </TableRow>
        )}
        {error && (
          <TableRow className="h-[72.5vh] hover:!bg-transparent">
            <TableCell
              className="align-top text-center"
              colSpan={ClientTableHeaders.length}
            >
              <div className="text-center">{dictionary.GenericError}</div>
            </TableCell>
          </TableRow>
        )}
        {!isLoading && data && data.length === 0 && (
          <TableRow className="h-[72.5vh] hover:!bg-transparent">
            <TableCell
              className="align-top text-center"
              colSpan={ClientTableHeaders.length}
            >
              <div className="text-center">{dictionary.NoResultsFound}</div>
            </TableCell>
          </TableRow>
        )}
        {!isLoading &&
          data &&
          data.length > 0 &&
          data.map((client: any) => (
            <TableRow className="h-[57px]" key={client.id}>
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
                <ClientTableActions id={client.id} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
