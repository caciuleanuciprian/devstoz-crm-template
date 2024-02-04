"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContext, useState } from "react";
import { LanguageContext } from "@/i18n/language-context";
import { Loader } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientForm } from "./client-form";
import { UserRoundPlus } from "lucide-react";
import { DataTablePagination } from "./client-data-table-pagination";

// TODO: Delete this
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any[];
  isLoading?: boolean;
  error?: any;
}

export function ClientDataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  error,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const { dictionary } = useContext(LanguageContext);
  console.log(table.getHeaderGroups());
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by email"
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <ClientForm
          initialValues={{}}
          sheetProps={{
            trigger: (
              <Button variant={"default"} className="flex text-xs">
                <UserRoundPlus className="h-[1.2rem] w-[1.2rem] mr-2" />
                {dictionary.AddClient}
              </Button>
            ),
            title: `${dictionary.AddNewClientTitle}`,
            description: `${dictionary.AddNewClientDescription}`,
            submitTxt: `${dictionary.Submit}`,
          }}
        />
      </div>
      <div className="rounded-md border bg-background h-full overflow-auto">
        <Table className="w-full overflow-auto">
          <TableHeader className="w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`width-[${header.column.columnDef.size}%]`}
                    >
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
            {error && (
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
            {!isLoading &&
              data &&
              data.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {/* Display No Results */}
            {!isLoading && !error && data && data.length === 0 && (
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
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
}
