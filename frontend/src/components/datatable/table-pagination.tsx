import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn, tableParser } from '@/lib/utils';
import type { PaginationState } from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type TablePaginationProps = {
  // exclude rows
  // paginationMeta: ReturnType<typeof tableParser> 
  paginationMeta:  Omit<NonNullable<ReturnType<typeof tableParser>>, 'rows'> | undefined
  pagination: PaginationState;
  table: any;
};

const TablePagination = ({ paginationMeta, pagination, table }: TablePaginationProps) => {
  const currentPage = pagination.pageIndex; // 1-based index for display
  const lastPage = paginationMeta?.last_page ?? 1;

  const canGoBack = pagination.pageIndex > 1;
  const canGoForward = currentPage < lastPage;

  return (
    <Pagination className="items-end justify-end py-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (canGoBack) {
                table.setPageIndex(pagination.pageIndex - 1);
              }
            }}
            className={cn('p-0', { 'cursor-not-allowed opacity-50': !canGoBack, 'cursor-pointer': canGoBack })}
          >
            <ChevronLeftIcon className="size-4" />
          </PaginationPrevious>
        </PaginationItem>

        {paginationMeta?.elements.map((element, index) => {
          if (element === '...') {
            return (
              <PaginationEllipsis key={index}>
                <span>…</span>
              </PaginationEllipsis>
            );
          }

          const pageNumber = element as number;
          return (
            <PaginationItem key={index}>
              <PaginationLink
                className="p-0 cursor-pointer"
                isActive={pageNumber === currentPage}
                onClick={() => table.setPageIndex(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (canGoForward) {
                table.setPageIndex(pagination.pageIndex + 1);
              }
            }}
            className={cn('p-0', { 'cursor-not-allowed opacity-50': !canGoForward, 'cursor-pointer': canGoForward })}
          >
            <ChevronRightIcon className="size-4" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;