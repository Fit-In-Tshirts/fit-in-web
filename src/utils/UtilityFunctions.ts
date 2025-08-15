import { Paginator } from "@/types/common";

export function getTotalPages(paginator: Paginator): number {
  if (paginator.pageSize <= 0) return 0; // prevent division by zero
  if(paginator.totalRecords) {
    return Math.ceil(paginator.totalRecords / paginator.pageSize);
  }
  return 0;
  }
  