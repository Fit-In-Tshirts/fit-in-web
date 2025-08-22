"use client"

import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Category, Paginator } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
import { Trash, Pencil, CircleArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
    accessorKey: "sizeGuide",
    id: "sizeGuide",
    header: () => {return <div className="text-center">Size Guide</div>},
    cell: ({row}) => {
      return row.original.sizeGuide ? <HoverCard>
        <HoverCardTrigger asChild className="flex flex-row justify-center items-center">
          <Button variant="link" className="text-center">Image</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-30 flex flex-row justify-center items-center">
          <Link target="_blank" href={row.original.sizeGuide} className="flex flex-row justify-center items-center gap-1 font-medium"> <CircleArrowRight width={18} height={18} /> Link</Link>
        </HoverCardContent>
      </HoverCard> : (<p className="text-center"> - </p>)
    }
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
