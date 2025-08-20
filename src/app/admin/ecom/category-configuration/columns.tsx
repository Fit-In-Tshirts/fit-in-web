"use client"

import { Button } from "@/components/ui/button"
import { Category, Paginator } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
import { Trash, Pencil } from "lucide-react"

type ColumnProps = {
  onEdit?: (category: Category) => void
  onDelete?: (category: Category) => void
  paginator?: Paginator
}

export const getCategoryColumns = ({
  onEdit,
  onDelete,
  paginator
}: ColumnProps): ColumnDef<Category>[] => [
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
    accessorKey: "sortOrder",
    id: "sortOrder",
    header: "Sort Order",
  },
  {
    accessorKey: "id",
    id: "actions",
    header: () => {
      return <div className="flex flex-row justify-center items-center">Actions</div>
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-2 justify-center items-center">
          <Button
            variant="ghost"
            className="border bg-neutral-300 hover:bg-blue-400 border-neutral-300 hover:border-blue-400 rounded-full"
            onClick={() => onEdit && onEdit(row.original)}
            size={'sm'}
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            className="border bg-neutral-300 hover:bg-red-400 border-neutral-300 hover:border-red-400 rounded-full"
            onClick={() => onDelete && onDelete(row.original)}
            size={'sm'}
          >
            <Trash />
          </Button>
        </div>
      )
    },
  },
]
