"use client"

import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Switch } from "@/components/ui/switch"
import { Category, Paginator, SelectedCategoryInfo } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
import { Trash, Pencil } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type ColumnProps = {
  onEdit?: (category: SelectedCategoryInfo) => void
  onDelete?: (category: SelectedCategoryInfo) => void
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
    accessorKey: "isActive",
    id: "active",
    header: "Active",
    cell: ({row}) => {
      return <div className="flex justify-center items-center">
        <Switch checked={row.original.isActive} />
      </div>
    }
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
        <HoverCard>
          <HoverCardTrigger><Button variant="link">Link</Button></HoverCardTrigger>
          <HoverCardContent className="flex flex-col">
            <div>{row.original.imageUrl}</div>
            <Image src={row.original.imageUrl ? row.original.imageUrl.toString() : ""} alt={""} width={200} height={200} />
          </HoverCardContent>
        </HoverCard>
      </div>
    }
  },
  {
    accessorKey: "id",
    id: "actions",
    header: () => {
      return <div className="flex flex-row justify-center items-center">Actions</div>
    },
    cell: ({ row }) => {
      const category:SelectedCategoryInfo = {
        id: row.original.id,
        name: row.original.name,
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
