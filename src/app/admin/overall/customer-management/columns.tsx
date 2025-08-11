"use client"

import { Customer } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Customer>[] = [
  { accessorKey: "email", header: "Email" },
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "lastName", header: "Last Name" },
  {
    header: "Address",
    cell: ({ row }) => {
      const { houseNumber, addressLine1, addressLine2 } = row.original.addresses[0];
      return `${houseNumber}, ${addressLine1}, ${addressLine2}`;
    },
  },
  { 
    header: "Province", 
    cell: ({ row }) => {
      return row.original.addresses[0].province;
    }
  },
  { accessorKey: "city", header: "City",
    cell: ({ row }) => {
      return row.original.addresses[0].city;
    }
  },
  { accessorKey: "zipcode", header: "Zip Code",
    cell: ({ row }) => {
      return row.original.addresses[0].zipcode;
    }
  },
  {
    accessorKey: "phoneNumber_mobile",
    header: "Contact - Mobile",
    cell: ({ row }) => {
      return row.original.phoneNumbers[0].phoneNumber;
    }
  },
  {
    accessorKey: "phoneNumber_home",
    header: "Contact - Home",
    cell: ({ row }) => {
      return row.original.phoneNumbers[0].phoneNumber || '-';
    }
  },
]