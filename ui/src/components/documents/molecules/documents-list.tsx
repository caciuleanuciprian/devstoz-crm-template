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
import { useContext, useEffect, useState } from "react";
import { GetOrganizationsDocuments } from "../core/documents.service";
import { useRecoilState } from "recoil";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";
import { transactionHeaders } from "@/components/clients/details/transactions/utils/consts";
import { DocumentsListHeader } from "./documents-list-header";
import { TablePagination } from "@/components/common/table/pagination";

const DocumentsList = () => {
  const { dictionary } = useContext(LanguageContext);

  const [organizationId] = useRecoilState(selectedOrganizationAtom);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, error, isLoading } = useAxios({
    fetchFn: GetOrganizationsDocuments,
    paramsOfFetch: {
      organizationId: organizationId?.id,
      page: currentPage,
      size: 10,
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
      <DocumentsListHeader />
      <div className="flex bg-background rounded-md p-4 flex-col gap-4 ">
        <Table>
          <TableHeader>
            <TableRow>
              {ClientTableHeaders.map((header) => (
                <TableHead
                  key={header.id}
                  className={`${
                    header.alignRight ? "text-right" : "text-left"
                  }`}
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
        {!isLoading && data && (
          <TablePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data.numberOfPages}
          />
        )}
      </div>
    </>
  );
};

export default DocumentsList;
