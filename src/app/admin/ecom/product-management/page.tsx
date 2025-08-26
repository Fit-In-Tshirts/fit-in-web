'use client'

import TableWithPagination, { TableWithPaginationRef } from "@/components/table/Table";
import { useEffect, useRef, useState } from "react";
import { getProductColumns } from "./columns";
import { Paginator, Product } from "@/types/common";
import toast from "react-hot-toast";
import { getProducts } from "./action";
import DeleteProductModal from "./DeleteProductModal";

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

  const handlePaginationChange = (paginator: Paginator) => {
    setPaginator(paginator);
  };

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts() //chnage to design

      if(response.error) {
        toast.error(response.error);
      }
      
      if(response.success) {
        setProducts(response.data?.categories)
        setTotalRecords(response.data?.totalRecords)
      }
    } catch(error:any) {
      toast.error(error.message)
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(()=> {
    fetchProductData()
  }, [])

  const deleteDesign = (product:Product) => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true);
  }

  return (
    <div className="w-full p-5 flex flex-col gap-2">
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