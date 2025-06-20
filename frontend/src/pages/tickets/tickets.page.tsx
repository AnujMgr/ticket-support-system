import { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { IconDotsVertical } from "@tabler/icons-react";
import type { OnChangeFn, PaginationState, Updater } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/datatable/data-table";
import { useGetTicketsQuery } from "@/redux/features/tickets/ticketsApiSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

function TicketsPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10
  })

  const onPageChange: OnChangeFn<PaginationState> | undefined = (updater: Updater<PaginationState>) => {
    if (typeof updater === 'function') {
      setPagination(updater(pagination));
    } else {
      setPagination(updater);
    }
  }

  const { data, isLoading } = useGetTicketsQuery(
    {
      page: pagination.pageIndex,
      limit: pagination.pageSize
    }
  );

  if (isLoading) return <div>Loading...</div>
  if (!data?.data) return <div>Missing post!</div>

  const columns = [
    {
      header: "SN",
      accessorKey: "sn",
      cell: (info: any) => info.row.index + 1
    },
    {
      header: "Name",
      accessorKey: "subject",
      cell: (info: any) => <Link to={`/tickets/${info.row.original.id}`}>{info.getValue()}</Link>
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: (info: any) => info.getValue().substring(0, 100)
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <Link className="cursor-pointer" to="/tickets/create">
              <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
            </Link>
            <Link className="cursor-pointer" to={`/tickets/${info.row.original.id}`}>
              <DropdownMenuItem className="cursor-pointer">View</DropdownMenuItem>
            </Link>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
  return (
    <Fragment>
      <div className="px-4 sm:px-0">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tickets</h3>
        <p className="max-w-2xl mt-1 text-gray-500 dark:text-gray-400 text-sm/6">
          A list of all the tickets.
        </p>
      </div>
      <div className="mt-4">
        <DataTable data={data} columns={columns} pagination={pagination} onPageChange={onPageChange} />
      </div>
    </Fragment>
  )
}

export default TicketsPage