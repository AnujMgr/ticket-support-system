import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const tableParser = ({ data }: { data: PaginatedT<unknown> }) => {
  const { data: rows, ...meta } = data;
  const { current_page, last_page, total } = meta;

  const getPaginationElements = () => {
    const delta = 1;
    const left = current_page - delta;
    const right = current_page + delta + 1;

    const pages: (number | string)[] = [];
    const range: number[] = [];

    for (let i = 1; i <= last_page; i++) {
      if (i === 1 || i === last_page || (i >= left && i < right)) {
        range.push(i);
      }
    }

    let lastAdded: number | undefined;
    for (const page of range) {
      if (lastAdded !== undefined) {
        if (page - lastAdded === 2) {
          pages.push(lastAdded + 1);
        } else if (page - lastAdded > 1) {
          pages.push('...');
        }
      }

      pages.push(page);
      lastAdded = page;
    }

    return pages;
  };

  return {
    rows,
    elements: getPaginationElements(),
    pageCount: last_page,
    rowCount: total,
    ...meta,
  };
};