"use client"

import { Button } from "@/components/ui/button"
import { Customer } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
import { Trash, Pencil } from "lucide-react"

type ColumnProps = {
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export const getCustomerColumns = ({
  onEdit,
  onDelete,
}: ColumnProps): ColumnDef<Customer>[] => [
  {
    id: "index",
    header: "No.",
    cell: ({ row }) => row.index + 1,
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
      const customerId = row.original.id
      return (
        <div className="flex flex-row gap-2 justify-center items-center">
          {/* <Button
            variant="ghost"
            className="bg-neutral-300 hover:bg-neutral-400 rounded-full"
            onClick={() => console.log(customerId)}
            size={'sm'}
          >
            <Pencil />
          </Button> */}
          <Button
            variant="ghost"
            className="bg-red-400 hover:bg-red-500 rounded-full"
            onClick={() => onDelete ? onDelete(customerId):undefined}
            size={'sm'}
          >
            <Trash />
          </Button>
        </div>
      )
    },
  },
]
