'use client'

import TableWithPagination, { TableWithPaginationRef } from "@/components/table/Table";
import { use, useEffect, useRef, useState } from "react";
import { getProductColumns } from "./columns";
import { Paginator, Product, ProductFilter, SortingState } from "@/types/common";
import toast from "react-hot-toast";
import { getFilterData, getProducts } from "./action";
import DeleteProductModal from "./DeleteProductModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const initialFilter:ProductFilter = {
  name: '',
  slug: '',
  category: '',
  design: '',
  material: '',
}

const initialSorter: SortingState = {
  column: undefined,
  order: undefined
}

export default function ProductManagement() {
  const tableRef = useRef<TableWithPaginationRef>(null);
  const [paginator, setPaginator] = useState<Paginator>({
    pageSize: 10,
    pageIndex: 0,
    totalRecords: 0
  })
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [filter, setFilter] = useState<ProductFilter>(initialFilter)
  const [sort, setSort] = useState<SortingState>(initialSorter)
  const [categoryNames, setCategoryNames] = useState<{name:string, slug:string}[]>([])
  const [designNames, setDesignNames] = useState<{name:string, slug:string}[]>([])

  const handlePaginationChange = (paginator: Paginator) => {
    setPaginator(paginator);
  };

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts(paginator)

      if(response.error) {
        toast.error(response.error);
      }
      
      if(response.success) {
        setProducts(response.data?.products)
        setTotalRecords(response.data?.totalRecords)
      }
    } catch(error:any) {
      toast.error(error.message)
    }finally{
      setIsLoading(false);
    }
  }

  const fetchFilterData = async() => {
    try{      
      const response = await getFilterData()

      if(response.error) {
        toast.error(response.error);
      }

      if(response.success) {
        setCategoryNames(response.data?.categoryNames)
        setDesignNames(response.data?.designNames)
      }
    } catch(error:any) {
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    fetchProductData()
    fetchFilterData()
  }, [])

  useEffect(()=> {
    fetchProductData()
  }, [paginator])

  const deleteDesign = (product:Product) => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true);
  }

  useEffect(()=>{
    console.log("filter data: ", filter)
  })

  const handleReset = () => {
    setFilter(initialFilter)
    setSort(initialSorter)
  }

  const handleSearch = () => {
    fetchProductData();
  }

  const filterSection = () => {
    return (
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2 items-center">
            <Label htmlFor="namefilter" className="w-11">Name</Label>
            <Input
              id="namefilter"
              placeholder="Denim Jacket Premium"
              name="name"
              value={filter.name}
              onChange={(e) => setFilter((prev) => ({...prev, [e.target.name]: e.target.value}))}
              className="w-85"
            />
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Label htmlFor="slugFilter" className="w-7">Slug</Label>
            <Input
              id="slugFilter"
              placeholder="denim-jacket-premium"
              name="slug"
              value={filter.slug}
              onChange={(e) => setFilter((prev) => ({...prev, [e.target.name]: e.target.value}))}
              className="w-85"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row">
            <Label htmlFor="categoryFilter" className="w-17">Category</Label>
            <Select
              name="categoryFilter" 
              onValueChange={(value) => setFilter((prev) => ({...prev, category:value}))} 
              value={filter.category ?? ""}
            >
              <SelectTrigger id="categoryFilter" className="w-40">
                <SelectValue placeholder="Category Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categoryNames.map((category, index) => {
                    return <SelectItem key={index} value={category.slug}>{category.name}</SelectItem>
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row">
            <Label htmlFor="designFilter" className="w-14">Design</Label>
            <Select
              name="designFilter" 
              onValueChange={(value) => setFilter((prev) => ({...prev, design:value}))} 
              value={filter.design ?? ""}
            >
              <SelectTrigger id="designFilter" className="w-45">
                <SelectValue placeholder="Design Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {designNames.map((design, index) => {
                    return <SelectItem key={index} value={design.slug}>{design.name}</SelectItem>
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Label htmlFor="materialfilter" className="w-14">Material</Label>
            <Input
              id="materialfilter"
              placeholder="Denim"
              name="material"
              value={filter.material}
              onChange={(e) => setFilter((prev) => ({...prev, [e.target.name]: e.target.value}))}
              className="w-55"
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-2">
          <Button 
            variant={'outline'} 
            className="w-25 bg-green-400 hover:bg-green-500"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button 
            variant={'outline'} 
            className="w-25 bg-red-400 hover:bg-red-500"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
          <Button 
            variant={'outline'} 
            className="w-35 bg-neutral-400 hover:bg-neutral-500"
            onClick={() => console.log('Create')}
          >
            Create Product
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-5 flex flex-col gap-2">
      {filterSection()}
      <TableWithPagination 
        ref={tableRef}
        columns={getProductColumns({
          // onEdit: updateDesign,
          onDelete: deleteDesign,
          paginator:paginator
        })}
        data={products} 
        isLoading={isLoading}
        totalRecords={totalRecords} 
        initialPageSize={10}
        onPaginationChange={handlePaginationChange}
      />

      <DeleteProductModal 
        isModalOpen={isDeleteModalOpen} 
        onOpenChange={() => setIsDeleteModalOpen(false)} 
        refreshFunction={fetchProductData}
        selectedProduct={selectedProduct}
      />
    </div>
  )
}