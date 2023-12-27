import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  pages: any[]; // not sure if needed
  activePage: any;
  nextPage: () => void;
  prevPage: () => void;
}

export function TablePagination({
  pages,
  activePage = 0,
  nextPage,
  prevPage,
}: TablePaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious onClick={prevPage} className="cursor-pointer" />
        <PaginationLink href="#">1</PaginationLink>
        <PaginationLink href="#" isActive>
          2
        </PaginationLink>
        <PaginationLink href="#">3</PaginationLink>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationNext onClick={nextPage} className="cursor-pointer" />
      </PaginationContent>
    </Pagination>
  );
}
