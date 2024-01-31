"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Loader } from "@/components/common/loader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any[];
  isLoading?: boolean;
  error?: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  error,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { dictionary } = useContext(LanguageContext);

  return (
    <div className="rounded-md border bg-background h-full overflow-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {/* Display Loader */}
          {isLoading && (
            <TableRow>
              <TableCell
                className="hover:bg-background border-b-0"
                colSpan={columns.length}
              >
                <Loader />
              </TableCell>
            </TableRow>
          )}

          {/* Display Error */}
          {!isLoading && error && (
            <TableRow>
              <TableCell
                className="hover:bg-background border-b-0 "
                colSpan={columns.length}
              >
                <div className="text-center">{dictionary.GenericError}</div>
              </TableCell>
            </TableRow>
          )}

          {/* Display Data */}
          {/*@ts-ignore*/}
          {data &&
            table.getRowModel().rows?.length &&
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {/* Display No Results */}
          {data?.length === 0 && !isLoading && !error && (
            <TableRow>
              <TableCell
                className="hover:bg-background border-b-0 text-center"
                colSpan={columns.length}
              >
                {dictionary.NoResultsFound}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
