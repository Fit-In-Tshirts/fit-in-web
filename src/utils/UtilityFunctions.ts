import { supabaseStroage } from "@/lib/supabaseStorage";
import { Paginator } from "@/types/common";

export function getTotalPages(paginator: Paginator): number {
  if (paginator.pageSize <= 0) return 0; // prevent division by zero
  if(paginator.totalRecords) {
    return Math.ceil(paginator.totalRecords / paginator.pageSize);
  }
  return 0;
}

export function isValidString(value: any): boolean {
  return value !== null 
      && value !== undefined 
      && typeof value === "string" 
      && value.trim() !== "";
}

export function capitalizeFirstLetter(str:string | undefined) {
  if (!str) return "";                 // handle empty/null string
  return str.charAt(0).toUpperCase() + str.slice(1);
}