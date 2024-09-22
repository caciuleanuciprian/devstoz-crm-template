import { CellWithHelper } from "@/components/clients/list/atoms/cell-with-helper";
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
import { useContext, useEffect, useState } from "react";
import { GetOrganizationsDocuments } from "../core/documents.service";
import { useRecoilState } from "recoil";
import { selectedOrganizationAtom } from "@/components/authentication/utils/authentication.recoil";
import {
  documentsHeader,
  getIcon,
} from "@/components/clients/details/transactions/utils/consts";
import { DocumentsListHeader } from "./documents-list-header";
import { TablePagination } from "@/components/common/table/pagination";
import { DocumentsActions } from "./documents-actions";
import { shouldRefetchAtom } from "@/components/clients/list/utils/clients.recoil";
import { Loader } from "@/components/common/loader";

const DocumentsList = () => {
  const { dictionary } = useContext(LanguageContext);

  const [organizationId] = useRecoilState(selectedOrganizationAtom);
  const [shouldRefetch, setShouldRefetch] = useRecoilState(shouldRefetchAtom);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, error, isLoading, loadData } = useAxios({
    fetchFn: GetOrganizationsDocuments,
    paramsOfFetch: {
      organizationId: organizationId?.id,
      page: currentPage,
      size: 10,
    },
    loadOnMount: true,
  });

  useEffect(() => {
    if (shouldRefetch) {
      loadData();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  const DocumentsTableHeaders = documentsHeader(dictionary);
  return (
    <>
      <DocumentsListHeader />
      <div className="flex bg-background rounded-md p-4 flex-col gap-4 ">
        <Table>
          <TableHeader>
            <TableRow>
              {DocumentsTableHeaders.map((header) => (
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
                  colSpan={DocumentsTableHeaders.length}
                >
                  <Loader />
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow className=" hover:!bg-transparent">
                <TableCell
                  className="align-top text-center"
                  colSpan={DocumentsTableHeaders.length}
                >
                  <div className="text-center">{dictionary.GenericError}</div>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && data?.entries.length === 0 && (
              <TableRow className=" hover:!bg-transparent">
                <TableCell
                  className="align-top text-center"
                  colSpan={DocumentsTableHeaders.length}
                >
                  <div className="text-center">{dictionary.NoResultsFound}</div>
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              data?.entries.length > 0 &&
              data.entries.map((document: any) => (
                <TableRow key={document.id}>
                  <TableCell>{getIcon(document.fileName)}</TableCell>
                  <TableCell>{document.name}</TableCell>
                  <TableCell>
                    <CellWithHelper
                      label={document.createdBy}
                      value={document.creationDate}
                    />
                  </TableCell>
                  <TableCell>
                    <CellWithHelper
                      label={document.lastUpdatedBy}
                      value={document.lastUpdatedDate}
                    />
                  </TableCell>
                  <TableCell>
                    <DocumentsActions
                      document_id={document.id}
                      document_name={document.fileName}
                    />
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
