import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetTicketsQuery } from "@/redux/features/tickets/ticketsApiSlice";
import { IconDotsVertical } from "@tabler/icons-react";

function TicketsPage() {
  const { data, isLoading } = useGetTicketsQuery({});

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Missing post!</div>

  const columns = [
    {
      header: "SN",
      accessorKey: "sn",
      cell: (info: any) => info.row.index + 1
    },
    {
      header: "Name",
      accessorKey: "subject",
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: (info: any) => info.getValue().substring(0, 100)
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )
}

export default TicketsPage