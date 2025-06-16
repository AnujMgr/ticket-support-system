import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type PaginationState,
  type OnChangeFn,
} from "@tanstack/react-table";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import TablePagination from "./table-pagination";
import { tableParser } from "@/lib/utils";

type TableDataProps = {
  data: any;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPageChange?: OnChangeFn<PaginationState> | undefined;
  columns: any;
  onError?: boolean;
  errorMessage?: string;
  UserDropdown?: boolean;
  CompaniesDropdown?: boolean;
};

const TableData: React.FC<TableDataProps> = ({
  data,
  columns,
  pagination,
  onPageChange,
}) => {
  const { rows, ...meta } = tableParser({ data });

  const {
    getRowModel,
    getHeaderGroups,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
    getPageCount,
    setPageIndex,
  } = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    state: {
      pagination,
      columnPinning: {
        right: ['action']
      }
    },
    onPaginationChange: onPageChange,
  });
  const table = {
    setPageIndex,
    nextPage,
    previousPage,
    getCanNextPage,
    getCanPreviousPage,
    getPageCount,
  }


  return (
    <Fragment>
      <Tabs
        defaultValue="outline"
        className="flex-col justify-start w-full gap-6"
      >
        <TabsContent
          value="outline"
          className="relative flex flex-col gap-4 overflow-auto"
        >
          <div className="overflow-hidden border rounded-lg">

            <Table className="min-w-full ">
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {getHeaderGroups().map((headerGroup: any, index: any) => (
                  <TableRow key={index}>
                    {headerGroup.headers.map((header: any, index: any) => (
                      <TableHead
                        key={index}
                        className="font-semibold text-gray-500 dark:text-gray-200"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="h-[20px]">
                {getRowModel().rows.map((row, index) => (
                  <TableRow key={index}>
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={index} className="text-gray-700 dark:text-gray-300">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      {/* <PaginationBtn
        getCanNextPage={getCanNextPage}
        getCanPreviousPage={getCanPreviousPage}
        nextPage={nextPage}
        pageIndex={pageIndex}
        previousPage={previousPage}
        getPageCount={getPageCount}
        getState={getState}
        setPageIndex={setPageIndex}
      /> */}
      <TablePagination paginationMeta={meta} pagination={pagination} table={table} />

    </Fragment >
  );
};

export default TableData;