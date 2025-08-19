'use client'

import TableWithPagination, { TableWithPaginationRef } from "@/components/table/Table";
import { Category, Paginator, SelectedCategoryInfo } from "@/types/common";
import { useEffect, useRef, useState } from "react";
import { getCategoryColumns } from "./columns";
import toast from "react-hot-toast";
import { getCategories } from "./action";

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

  const handlePaginationChange = (paginator: Paginator) => {
    setPaginator(paginator);
  };

  const updateCategory = (category:SelectedCategoryInfo) => {
    console.log(category.id)
  }
  const deleteCategory = (category:SelectedCategoryInfo) => {
    console.log(category.id)
  }

  const fetchCategoryData = async () => {
    try {
      setIsLoading(true);
      const response = await getCategories(paginator)

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

  useEffect(() => {
    fetchCategoryData()
  }, [])

  useEffect(() => {
    fetchCategoryData();
  }, [paginator.pageIndex, paginator.pageSize]);
  
  return (
    <div className="p-5 border-red-500 flex flex-column w-full">
      <div className="w-full">
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
      </div>
    </div>
    
  )
}