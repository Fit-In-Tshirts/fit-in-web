"use client"

import { Button } from "@/components/ui/button"
import { Customer, Paginator, SelectedCategoryInfo } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
import { Trash, Pencil } from "lucide-react"

type ColumnProps = {
  onEdit?: (category: SelectedCategoryInfo) => void
  onDelete?: (category: SelectedCategoryInfo) => void
  paginator?: Paginator
}

export const getCategoryColumns = ({
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
    accessorKey: "name",
    id: "name",
    header: "Category Name",
  },
  {
    accessorKey: "slug",
    id: "slug",
    header: "Slug",
  },
  {
    accessorKey: "description",
    id: "description",
    header: "Description",
  },
  {
    accessorKey: "isActive",
    id: "active",
    header: "Active",
  },
  {
    accessorKey: "sortOrder",
    id: "sortOrder",
    header: "Sort Order",
  },
  {
    accessorKey: "imageUrl",
    id: "imageUrl",
    header: "Image Url",
    cell: ({row}) => {
      return <div className="flex justify-center items-center">
        <Button variant={'link'}> Link </Button>
      </div>
    }
  },
  {
    accessorKey: "id",
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category:SelectedCategoryInfo = {
        id: row.original.id,
        name: row.original.firstName,
      }
      return (
        <div className="flex flex-row gap-2 justify-center items-center">
          <Button
            variant="ghost"
            className="border bg-neutral-300 hover:bg-blue-400 border-neutral-300 hover:border-blue-400 rounded-full"
            onClick={() => onEdit && onEdit(category)}
            size={'sm'}
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            className="border bg-neutral-300 hover:bg-red-400 border-neutral-300 hover:border-red-400 rounded-full"
            onClick={() => onDelete && onDelete(category)}
            size={'sm'}
          >
            <Trash />
          </Button>
        </div>
      )
    },
  },
]
