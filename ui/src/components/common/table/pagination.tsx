import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

interface TablePaginationProps {
  pages: any[]; // not sure if needed
  activePage: any;
  setPage: (page: number) => void;
  totalPages: number;
}

// TODO Should refactor / rethink this component
export function TablePagination({
  pages,
  activePage = 0,
  setPage,
  totalPages = 9,
}: TablePaginationProps) {
  const [elipsisLeft, setElipsisLeft] = useState<boolean>(false);
  const [elipsisRight, setElipsisRight] = useState<boolean>(false);
  const firstPage = 0;
  const secondPage = 1;
  const finalPage = totalPages - 1;

  useEffect(() => {
    if (activePage > 1) {
      setElipsisLeft(true);
    } else {
      setElipsisLeft(false);
    }

    if (activePage < finalPage) {
      setElipsisRight(true);
    } else {
      setElipsisRight(false);
    }
  }, [activePage]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          onClick={() => activePage > firstPage && setPage(activePage - 1)}
          className="cursor-pointer"
        />
        <PaginationLink
          className="cursor-pointer"
          isActive={activePage === firstPage}
          onClick={() => setPage(firstPage)}
        >
          {firstPage + 1}
        </PaginationLink>

        {elipsisLeft && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {activePage <= secondPage && (
          <PaginationLink
            className="cursor-pointer"
            isActive={activePage === secondPage}
            onClick={() => setPage(secondPage)}
          >
            {secondPage + 1}
          </PaginationLink>
        )}

        {/* TODO Breaks on final page. Fix!!! */}
        {activePage > secondPage && activePage < finalPage - 1 && (
          <PaginationLink className="cursor-pointer" isActive>
            {activePage + 1}
          </PaginationLink>
        )}

        {elipsisRight && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* 
        {activePage >= totalPages - 1 && (
          <PaginationLink
            className="cursor-pointer"
            isActive={activePage === totalPages - 1}
            onClick={() => setPage(totalPages - 1)}
          >
            {totalPages - 1}
          </PaginationLink>
        )} */}

        <PaginationLink
          className="cursor-pointer"
          isActive={activePage === finalPage}
          onClick={() => setPage(finalPage)}
        >
          {finalPage}
        </PaginationLink>

        <PaginationNext
          onClick={() => activePage < finalPage && setPage(activePage + 1)}
          className="cursor-pointer"
        />
      </PaginationContent>
    </Pagination>
  );
}
