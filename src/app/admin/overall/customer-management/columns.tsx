"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Customer } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value:any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value:any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { 
    accessorKey: "email", 
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  { 
    accessorKey: "firstName", 
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  { 
    accessorKey: "lastName", 
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'address',
    header: "Address",
    cell: ({ row }) => {
      const { houseNumber, addressLine1, addressLine2 } = row.original.addresses[0];
      return `${houseNumber}, ${addressLine1}, ${addressLine2}`;
    },
  },
  {
    accessorKey: "addresses.0.province", 
    id: "province",
    header: "Province", 
    cell: ({ row }) => {
      return row.original.addresses[0].province;
    }
  },
  { 
    accessorKey: "addresses.0.city", 
    id: 'city',
    header: "City",
    cell: ({ row }) => {
      return row.original.addresses[0].city;
    }
  },
  { 
    accessorKey: "addresses.0.zipcode", 
    id: 'zipcode',
    header: "Zip Code",
    cell: ({ row }) => {
      return row.original.addresses[0].zipcode;
    }
  },
  {
    accessorKey: "phoneNumbers.0.phoneNumber_mobile",
    id: 'phoneNumber_mobile',
    header: "Contact(Mobile)",
    cell: ({ row }) => {
      return row.original.phoneNumbers[0] ? row.original.phoneNumbers[0].phoneNumber : '-';
    }
  },
  {
    accessorKey: "phoneNumbers.1.phoneNumber_home",
    id: 'phoneNumber_home',
    header: "Contact(Home)",
    cell: ({ row }) => {
      return row.original.phoneNumbers[1] ? row.original.phoneNumbers[1].phoneNumber : '-';
    }
  },
]