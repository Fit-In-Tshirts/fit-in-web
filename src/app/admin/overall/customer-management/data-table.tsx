"use client"

import * as React from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RotateCcw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { Customer } from "@/types/common"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [selectedCustomerIDs, setSelectedCustomerIDs] = useState<string[]>([])
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection
    },
  })

  const getSelectedRowIds = (data:TData[], rowSelection: Record<number, boolean>):string[] => {
    const SelectedKeys = Object.keys(rowSelection).map(Number);
    const selectedIDs = SelectedKeys
      .map((index:number) => data[index])
      .filter((obj): obj is TData => obj !== undefined)
      .map((obj) => obj.id)
    return selectedIDs;
  }

  const handleResetFilter = () => {
    setColumnFilters([]);
  }

  const handleResetSort = () => {
    setSorting([]);
  }

  useEffect(() => {
    const selectedIDs = getSelectedRowIds(data, rowSelection)
    setSelectedCustomerIDs(selectedIDs);
  }, [rowSelection])

  const deleteSelectedCustomers = () => {
    console.log(selectedCustomerIDs);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex flex-row gap-2 items-center">
          <Label htmlFor="emailFilter" className="w-18">Email</Label>
          <Input
            id="emailFilter"
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="w-125"
          />
        </div>
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row items-center">
            <Label htmlFor="firstNameFilter" className="w-20">First Name</Label>
            <Input
              id="firstNameFilter"
              placeholder="Filter first name..."
              value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("firstName")?.setFilterValue(event.target.value)
              }
              className="w-50"
            />
          </div>
          <div className="flex flex-row items-center">
            <Label htmlFor="lastNameFilter" className="w-20">Last Name</Label>
            <Input
              id="lastNameFilter"
              placeholder="Filter last name..."
              value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("lastName")?.setFilterValue(event.target.value)
              }
              className="w-50"
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row items-center">
            <Label htmlFor="provinceFilter" className="w-20">Province</Label>
            <Input
              id="provinceFilter"
              placeholder="Filter province..."
              value={(table.getColumn("province")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("province")?.setFilterValue(event.target.value)
              }
              className="w-50"
            />
          </div>
          <div className="flex flex-row items-center">
            <Label htmlFor="cityFilter" className="w-20">City</Label>
            <Input
              id="cityFilter"
              placeholder="Filter city..."
              value={(table.getColumn("city")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("city")?.setFilterValue(event.target.value)
              }
              className="w-50"
            />
          </div>
          <div className="flex flex-row items-center">
            <Label htmlFor="zipcodeFilter" className="w-20">Zipcode</Label>
            <Input
              id="zipcodeFilter"
              placeholder="Filter zipcode..."
              value={(table.getColumn("zipcode")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("zipcode")?.setFilterValue(event.target.value)
              }
              className="w-50"
            />
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-2">
          <Button variant={'outline'} className="w-25 bg-neutral-400" onClick={handleResetFilter}>Reset Filters</Button>
          <Button variant={'destructive'} className="w-35" disabled={Object.keys(rowSelection).length === 0} onClick={deleteSelectedCustomers} >Delete Customer</Button>
        </div>
        {sorting.length > 0 && (
          <div className="text-sm flex flex-row justify-start items-center text-blue-600">
            Sorted by: {sorting.map((sort, index) => (
              <span key={sort.id}>
                {sort.id} ({sort.desc ? 'desc' : 'asc'})
                {index < sorting.length - 1 ? ', ' : ''}
              </span>
            ))}
          <Button variant={'link'} onClick={handleResetSort}>reset</Button>
          </div>
        )}
        
      </div>
      <div className="overflow-hidden rounded-md border">
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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-2">
        <div className="flex justify-center items-center space-x-6 lg:space-x-8 border py-2 rounded-md">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>

        <div className="text-muted-foreground flex-1 text-sm text-center mt-2">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </div>
  )
}