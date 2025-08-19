"use client"

import { Button } from "@/components/ui/button"
import { Customer, Paginator, UserBasicInfo } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
import { Trash, Pencil } from "lucide-react"

type ColumnProps = {
  onEdit?: (customer: UserBasicInfo) => void
  onDelete?: (customer: UserBasicInfo) => void
  paginator?: Paginator
}

export const getCustomerColumns = ({
  onEdit,
  onDelete,
  paginator
}: ColumnProps): ColumnDef<Customer>[] => [
  {
    id: "index",
    header: "No.",
    cell: ({ row }) => {return (paginator?.pageSize! * (paginator?.pageIndex!) + (row.index + 1))},
  },
  {
    accessorKey: "email",
    id: "email",
    header: "Email",
  },
  {
    accessorKey: "firstName",
    id: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    id: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const { houseNumber, addressLine1, addressLine2 } = row.original.addresses[0]
      return `${houseNumber}, ${addressLine1}, ${addressLine2}`
    },
  },
  {
    accessorKey: "addresses.0.province",
    id: "province",
    header: "Province",
    cell: ({ row }) => row.original.addresses[0].province,
  },
  {
    accessorKey: "addresses.0.city",
    id: "city",
    header: "City",
    cell: ({ row }) => row.original.addresses[0].city,
  },
  {
    accessorKey: "addresses.0.zipcode",
    id: "zipcode",
    header: "Zip Code",
    cell: ({ row }) => row.original.addresses[0].zipcode,
  },
  {
    accessorKey: "phoneNumbers.0.phoneNumber_mobile",
    id: "phoneNumber_mobile",
    header: "Contact(Mobile)",
    cell: ({ row }) => row.original.phoneNumbers[0].phoneNumber,
  },
  {
    accessorKey: "phoneNumbers.1.phoneNumber_home",
    id: "phoneNumber_home",
    header: "Contact(Home)",
    cell: ({ row }) =>
      row.original.phoneNumbers[1]
        ? row.original.phoneNumbers[1].phoneNumber
        : "-",
  },
  {
    accessorKey: "id",
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const customer:UserBasicInfo = {
        id: row.original.id,
        firstName: row.original.firstName,
        lastName: row.original.lastName,
        email: row.original.email
      }
      return (
        <div className="flex flex-row gap-2 justify-center items-center">
          <Button
            variant="ghost"
            className="border bg-neutral-300 hover:bg-blue-400 border-neutral-300 hover:border-blue-400 rounded-full"
            onClick={() => onEdit && onEdit(customer)}
            size={'sm'}
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            className="border bg-neutral-300 hover:bg-red-400 border-neutral-300 hover:border-red-400 rounded-full"
            onClick={() => onDelete && onDelete(customer)}
            size={'sm'}
          >
            <Trash />
          </Button>
        </div>
      )
    },
  },
]
