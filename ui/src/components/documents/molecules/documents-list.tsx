import { CellWithHelper } from "@/components/clients/list/atoms/cell-with-helper";
import { ClientTableActions } from "@/components/clients/list/atoms/client-table-actions";
import { FilterableTableHeader } from "@/components/clients/list/atoms/client-table-filterable-header";
import {
  iconToLabelClientType,
  valueToLabelClientType,
} from "@/components/clients/list/utils/consts";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { LanguageContext } from "@/i18n/language-context";
import useAxios from "@/lib/axios/useAxios";
import { Loader } from "lucide-react";
import { useContext, useEffect } from "react";
import { GetOrganizationsDocuments } from "../core/documents.service";
import { useRecoilState } from "recoil";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";
import { transactionHeaders } from "@/components/clients/details/transactions/utils/consts";

const DocumentsList = () => {
  const { dictionary } = useContext(LanguageContext);

  const [organizationId] = useRecoilState(selectedOrganizationAtom);

  const { data, error, isLoading } = useAxios({
    fetchFn: GetOrganizationsDocuments,
    paramsOfFetch: {
      organizationId: organizationId?.id,
    },
    loadOnMount: true,
  });

  const ClientTableHeaders = transactionHeaders(
    dictionary,
    <FilterableTableHeader />,
    false
  );
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {ClientTableHeaders.map((header) => (
              <TableHead
                key={header.id}
                className={`${header.alignRight ? "text-right" : "text-left"}`}
                style={{
                  width: `${header.size}%`,
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
                    value={client.creationDate}
                  />
                </TableCell>
                <TableCell>
                  <CellWithHelper
                    label={client.lastUpdatedBy}
                    value={client.lastUpdatedDate}
                  />
                </TableCell>
                <TableCell>
                  <ClientTableActions id={client.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DocumentsList;
