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
} from "@tanstack/react-table";
// import PaginationBtn from "./Pagination";

import { Tabs, TabsContent } from "./ui/tabs";

type TableDataProps = {
  data: any;
  columns: any;
  onError?: boolean;
  errorMessage?: string;
  UserDropdown?: boolean;
  CompaniesDropdown?: boolean;
};

const TableData: React.FC<TableDataProps> = ({
  data,
  columns,
}) => {
  const {
    getRowModel,
    getHeaderGroups,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
    getState,
    getPageCount,
    setPageIndex,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { pageIndex } = getState().pagination;

  return (
    <Fragment>
      <Tabs
        defaultValue="outline"
        className="w-full flex-col justify-start gap-6"
      >
        <TabsContent
          value="outline"
          className="relative flex flex-col gap-4 overflow-auto"
        >
          <div className="overflow-hidden rounded-lg border">

            <Table className="min-w-full ">
              <TableHeader className="bg-muted sticky top-0 z-10">
                {getHeaderGroups().map((headerGroup: any, index: any) => (
                  <TableRow key={index}>
                    {headerGroup.headers.map((header: any, index: any) => (
                      <TableHead
                        key={index}
                        className="text-gray-500 font-semibold"
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
                      <TableCell key={index} className="text-gray-700">
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
    </Fragment >
  );
};

export default TableData;