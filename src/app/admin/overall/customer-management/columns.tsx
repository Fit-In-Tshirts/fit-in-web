"use client"

import { Customer } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Customer>[] = [
  { 
    id: 'index',
    header: "No.",
    cell: ({ row }) => {
      return (row.index + 1)
    }
  },
  { 
    accessorKey: "email", 
    id:"email",
    header: "Email"
  },
  { 
    accessorKey: "firstName", 
    id:"firstName",
    header:"First Name"
  },
  { 
    accessorKey: "lastName", 
    id:"lastName",
    header:"Last Name"
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
      return row.original.phoneNumbers[0].phoneNumber;
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