import {
  currentPageAtom,
  shouldRefetchAtom,
  totalPagesAtom,
} from "@/components/clients/utils/clients.recoil";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { LanguageContext } from "@/i18n/language-context";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useContext, useEffect } from "react";
import { useRecoilState } from "recoil";

export const TablePagination = () => {
  const [totalPages] = useRecoilState(totalPagesAtom);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
  const { dictionary } = useContext(LanguageContext);
  const [, setShouldRefetch] = useRecoilState(shouldRefetchAtom);

  const handleGoToFirstPage = () => {
    if (currentPage > 0) {
      setCurrentPage(0);
      setShouldRefetch(true);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setShouldRefetch(true);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setShouldRefetch(true);
    }
  };

  const handleGoToLastPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(totalPages - 1);
      setShouldRefetch(true);
    }
  };

  return (
    <Pagination>
      <div className="flex w-full justify-between text-xs text-muted-foreground mx-4 mb-4">{`${
        dictionary.Page
      } ${currentPage + 1} ${dictionary.OutOf} ${
        totalPages > 0 ? totalPages : 1
      }`}</div>
      <PaginationContent className="mx-4 mb-4">
        <PaginationItem>
          <Button
            onClick={handleGoToFirstPage}
            variant="ghost"
            size={"sm"}
            disabled={currentPage <= 0}
          >
            <ChevronsLeft className="w-[1.2rem] h-[1.2rem]" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={handlePreviousPage}
            variant="ghost"
            size={"sm"}
            disabled={currentPage <= 0}
          >
            <ChevronLeft className="w-[1.2rem] h-[1.2rem]" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={handleNextPage}
            variant="ghost"
            size={"sm"}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronRight className="w-[1.2rem] h-[1.2rem]" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            onClick={handleGoToLastPage}
            variant="ghost"
            size={"sm"}
            disabled={currentPage >= totalPages - 1}
          >
            <ChevronsRight className="w-[1.2rem] h-[1.2rem]" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
