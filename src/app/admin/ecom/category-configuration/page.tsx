'use client'

import TableWithPagination, { TableWithPaginationRef } from "@/components/table/Table";
import { Category, CategoryFilter, Paginator, SortingState, SortOrder } from "@/types/common";
import { useEffect, useRef, useState } from "react";
import { getCategoryColumns } from "./columns";
import toast from "react-hot-toast";
import { getCategories } from "./action";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isValidString } from "@/utils/UtilityFunctions";
import { Button } from "@/components/ui/button";
import DeleteCategoryModal from "./DeleteCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import CreateCategoryModal from "./CreateCategoryModal";

const initialFilter:CategoryFilter = {
  name: '',
  slug: '',
}

const initialSorter: SortingState = {
  column: undefined,
  order: undefined
}

export default function CategoryManagement() {
  const tableRef = useRef<TableWithPaginationRef>(null);
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0)
  const [paginator, setPaginator] = useState<Paginator>({
    pageSize: 10,
    pageIndex: 0,
    totalRecords: 0
  })
  const [filter, setFilter] = useState<CategoryFilter>(initialFilter)
  const [sort, setSort] = useState<SortingState>(initialSorter)
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [isDelteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

  const handlePaginationChange = (paginator: Paginator) => {
    setPaginator(paginator);
  };

  const updateCategory = (category:Category) => {
    setSelectedCategory(category)
    setIsUpdateModalOpen(true)
  }
  const deleteCategory = (category:Category) => {
    setSelectedCategory(category)
    setIsDeleteModalOpen(true)
  }

  const createCategory = () => {
    setIsCreateModalOpen(true)
  }

  const fetchCategoryData = async () => {
    try {
      setIsLoading(true);
      const response = await getCategories(filter, sort, paginator)

      if(response.error) {
        toast.error(response.error);
      }
      
      if(response.success) {
        setCategories(response.data?.categories)
        setTotalRecords(response.data?.totalRecords)
      }
    } catch(error:any) {
      toast.error(error.message)
    }finally{
      setIsLoading(false);
    }
  }

  const handleSearch = () => {
    fetchCategoryData();
  }

  const handleReset = () => {
    setFilter(initialFilter)
    setSort(initialSorter)
  }

  useEffect(() => {
    fetchCategoryData()
  }, [])

  useEffect(() => {
    fetchCategoryData();
  }, [paginator.pageIndex, paginator.pageSize]);

  const filterSection = () => {
    return (
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2 items-center">
            <Label htmlFor="namefilter" className="w-11">Name</Label>
            <Input
              id="namefilter"
              placeholder="Shirt"
              name="name"
              value={filter.name}
              onChange={(e) => setFilter((prev) => ({...prev, [e.target.name]: e.target.value}))}
              className="w-60"
            />
          </div>
          <div className="flex flex-row gap-1 items-center">
            <Label htmlFor="slugFilter" className="w-7">Slug</Label>
            <Input
              id="slugFilter"
              placeholder="shirt"
              name="slug"
              value={filter.slug}
              onChange={(e) => setFilter((prev) => ({...prev, [e.target.name]: e.target.value}))}
              className="w-55"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-row">
          <div className="flex flex-row items-start gap-2 justify-center">
            <div className="flex flex-row">
              <Label htmlFor="sortColumn" className="w-13">Sort By</Label>
              <Select 
                name="sortColumn" 
                onValueChange={(value) => setSort((prev) => ({column: value, order: prev?.order ?? undefined}))} 
                value={sort?.column ?? ""}
              >
                <SelectTrigger id="sortColumn" className="w-40">
                  <SelectValue placeholder="Column Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="name">Category Name</SelectItem>
                    <SelectItem value="slug">Slug</SelectItem>
                    <SelectItem value="sortOrder">Sort Order</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row">
              <Label 
                htmlFor="sortDirection" 
                className={!isValidString(sort.column) ? "w-24 text-neutral-500 font-light" : "w-24"}
              >
                Sort Direction
              </Label>
              <Select 
                disabled={!isValidString(sort.column)} 
                name="sortDirection" 
                onValueChange={(value) => setSort((prev) => ({column: prev?.column ?? "", order: value as SortOrder}))} 
                value={sort?.order ?? ""}
              >
                <SelectTrigger id="sortDirection" className="w-25">
                  <SelectValue placeholder={sort.order} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="asc">ASC</SelectItem>
                    <SelectItem value="desc">DESC</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-2">
          <Button 
            variant={'outline'} 
            className="w-25 bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button 
            variant={'outline'} 
            className="w-25 bg-amber-500 hover:bg-amber-600 text-white"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
          <Button 
            variant={'outline'} 
            className="w-35 bg-green-600 hover:bg-green-700 text-white"
            onClick={createCategory}
          >
            Create a category
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="p-5 flex flex-col gap-2 w-full">
      {filterSection()}
      <TableWithPagination 
        ref={tableRef}
        columns={getCategoryColumns({
          onEdit: updateCategory,
          onDelete: deleteCategory,
          paginator:paginator
        })}
        data={categories} 
        isLoading={isLoading}
        totalRecords={totalRecords} 
        initialPageSize={10}
        onPaginationChange={handlePaginationChange}
      />

      <DeleteCategoryModal 
        isModalOpen={isDelteModalOpen} 
        onOpenChange={() => setIsDeleteModalOpen(false)} 
        refreshFunction={fetchCategoryData}
        selectedCategory={selectedCategory}
      />

      <UpdateCategoryModal 
        isModalOpen={isUpdateModalOpen} 
        onOpenChange={() => setIsUpdateModalOpen(false)} 
        refreshFunction={fetchCategoryData}
        selectedCategory={selectedCategory}
      />

      <CreateCategoryModal 
        isModalOpen={isCreateModalOpen} 
        onOpenChange={() => setIsCreateModalOpen(false)} 
        refreshFunction={fetchCategoryData}
      />
    </div>
  )
}