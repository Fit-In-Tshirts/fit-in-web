import ColorCard from "@/components/colorCard/ColorCard"
import { Button } from "@/components/ui/button"
import { Paginator, Product } from "@/types/common"
import { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash } from "lucide-react"

type ColumnProps = {
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
  paginator?: Paginator
}

export const getProductColumns = ({
  onEdit,
  onDelete,
  paginator
}: ColumnProps): ColumnDef<Product>[] => [
  {
    id: "index",
    header: "No.",
    cell: ({ row }) => {return (paginator?.pageSize! * (paginator?.pageIndex!) + (row.index + 1))},
  },
  {
    accessorKey: "name",
    id: "name",
    header: "Product Name",
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
    accessorKey: "brand",
    id: "brand",
    header: "Brand",
  },
  {
    id: "category",
    header: "Category",
    cell: ({row}) => {
      const category = row.original.category;
      return category ? (<div className="p-2 m-1 rounded bg-gray-100">
        {category.name}
      </div>) : (<div> - </div>)
    }
  },
  {
    id: "designs",
    header: "Designs",
    cell: ({row}) => {
      return row.original.productDesigns && row.original.productDesigns.length > 0 ? (<div className="flex flex-row">
        {row.original.productDesigns.map((row) => (
          <div
            key={row.id}
            className="p-2 m-1 rounded bg-gray-100"
          >
            {row.design.name}
          </div>
        ))}
      </div>) : (<div> - </div>)
    }
  },
  {
    accessorKey: "material",
    id: "material",
    header: "Material",
  },
  {
    accessorKey: "basePrice",
    id: "basePrice",
    header: "Base Price",
  },
  {
    accessorKey: "discountPercentage",
    id: "discountPercentage",
    header: "Discount Percentage",
  },
  {
    id: "mainColor",
    header: "Main Color",
    cell: ({ row }) => {
      const color = row.original.mainColor;

      return color ? (
        <ColorCard rgbCode={color.rgbCode} hexCode={color.hexCode} name={color.name}/>
      ) : (
        <div> - </div>
      );
    }
  },
  {
    id: "otherColors",
    header: "Other Colors",
    cell: ({row}) => {
      const colors = row.original.productColors;

      return colors && colors.length > 0 ? (<div className="flex flex-row justify-start items-center">
        {row.original.productColors.map((row) => (
          <ColorCard rgbCode={row.color.rgbCode} hexCode={row.color.hexCode} name={row.color.name} key={row.id} />
        ))}
      </div>) : (<div> - </div>)
    }
  },
  {
    id: "sizes",
    header: "Sizes",
    cell: ({row}) => {
      return row.original.productSizes && row.original.productSizes.length > 0 ? (<div className="flex flex-row">
        {row.original.productSizes.map((row) => (
          <div
            key={row.id}
            className="p-2 m-1 rounded bg-gray-100"
          >
            {row.size.name}
          </div>
        ))}
      </div>) : (<div> - </div>)
    }
  },
  {
    accessorKey: "colors.name",
    id: "images",
    header: "Images",
    cell: ({row}) => {
      return row.original.productImages && row.original.productImages.length > 0 ? (<div>
        {row.original.productImages.map((row) => (
          <div
            key={row.id}
          >
            {row.imageUrl}
          </div>
        ))}
      </div>) : (<div> - </div>)
    }
  },
  {
    accessorKey: "careInstructions",
    id: "careInstructions",
    header: "Care Instructions",
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
