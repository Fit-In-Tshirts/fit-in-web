'use client'

import { useEffect, useState, useRef } from "react"
import { getCustomers } from "./action"
import { getCustomerColumns } from "./columns"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Customer, CustomerFilter, Paginator, SortOrder, SortingState, UserBasicInfo } from "@/types/common"
import TableWithPagination, { TableWithPaginationRef } from "../../../../components/table/Table"
import toast from "react-hot-toast"
import DeleteCustomerModal from "./DeleteCustomerModal"

const initialFilter: CustomerFilter = {
  email: '',
  firstName: '',
  lastName: '',
  houseNumber: '',
  addressLine1: '',
  addressLine2: '',
  province: '',
  city: '',
  zipcode: ''
}

const initialSorting: SortingState = {
  column: null,
  order: null,
}

export default function CustomerManagement() {
  const tableRef = useRef<TableWithPaginationRef>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<UserBasicInfo>()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState(initialFilter)
  const [sort, setSort] = useState<SortingState>(initialSorting)
  const [currentPaginator, setCurrentPaginator] = useState<Paginator>({
    pageSize: 10,
    pageIndex: 0,
    totalRecords: 0
  })
  const [isDelteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isModalDataLoading, setIsModalDataLoading] = useState<boolean>(false);

  const fetchCustomersData = async () => {
    try {
      setIsLoading(true);
      const response = await getCustomers({}, filter, sort, currentPaginator);
            
      if(response.error) {
        toast.error("Failed to load customer")
      }

      if(response.success) {
        setCustomers(response.data.customers);
        setTotalRecords(response.data.totalRecords);
      }
      
    } catch (error:any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaginationChange = (paginator: Paginator) => {
    setCurrentPaginator(paginator);
  };

  useEffect(() => {
    fetchCustomersData();
  }, [currentPaginator.pageIndex, currentPaginator.pageSize]);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.resetPagination();
    }
    if (filter === initialFilter && sort === initialSorting) {
      fetchCustomersData();
    }
  }, [filter, sort]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFilter(initialFilter);
    setSort(initialSorting);
    fetchCustomersData()
  };

  const handleFilterSearch = () => {
    fetchCustomersData();
  };

  const deleteCustomer = (customer: UserBasicInfo) => {
    setIsDeleteModalOpen(true);
    setSelectedCustomer(customer);
  }

  const Filters = () => {
    return (
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex flex-row gap-2 items-center">
          <Label htmlFor="emailFilter" className="w-18">Email</Label>
          <Input
            id="emailFilter"
            placeholder="johndoe@gmail.com"
            name="email"
            value={filter.email}
            onChange={handleChange}
            className="w-100"
          />
        </div>
        
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row items-center">
            <Label htmlFor="firstNameFilter" className="w-20">First Name</Label>
            <Input
              id="firstNameFilter"
              placeholder="John"
              name="firstName"
              value={filter.firstName}
              onChange={handleChange}
              className="w-50"
            />
          </div>
          <div className="flex flex-row items-center">
            <Label htmlFor="lastNameFilter" className="w-20">Last Name</Label>
            <Input
              id="lastNameFilter"
              placeholder="Doe"
              name='lastName'
              value={filter.lastName}
              onChange={handleChange}
              className="w-50"
            />
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <Label htmlFor="houseNumberFilter" className="w-18">Address</Label>
          <Input
            id="houseNumberFilter"
            placeholder="No.256"
            name="houseNumber"
            value={filter.houseNumber}
            onChange={handleChange}
            className="w-20"
          />
          <Input
            id="addressLine1Filter"
            placeholder="York Street"
            name="addressLine1"
            value={filter.addressLine1}
            onChange={handleChange}
            className="w-70"
          />
          <Input
            id="addressLine2Filter"
            placeholder="Colombo 5"
            name="addressLine2"
            value={filter.addressLine2}
            onChange={handleChange}
            className="w-70"
          />
        </div>
        
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row items-center">
            <Label htmlFor="provinceFilter" className="w-20">Province</Label>
            <Input
              id="provinceFilter"
              placeholder="Western"
              name="province"
              value={filter.province}
              onChange={handleChange}
              className="w-50"
            />
          </div>
          <div className="flex flex-row items-center">
            <Label htmlFor="cityFilter" className="w-10">City</Label>
            <Input
              id="cityFilter"
              placeholder="Maharagama"
              name="city"
              value={filter.city}
              onChange={handleChange}
              className="w-50"
            />
          </div>
          <div className="flex flex-row items-center">
            <Label htmlFor="zipcodeFilter" className="w-17">Zipcode</Label>
            <Input
              id="zipcodeFilter"
              placeholder="10200"
              name="zipcode"
              value={filter.zipcode}
              onChange={handleChange}
              className="w-27"
            />
          </div>
        </div>
        
        <div className="flex flex-row justify-start items-center gap-2">
          <div className="flex flex-row gap-5">
            <div className="flex flex-row">
              <Label htmlFor="sortColumn" className="w-20">Sort By</Label>
              <Select 
                name="sortColumn" 
                onValueChange={(value) => setSort((prev) => ({column: value, order: prev?.order ?? null}))} 
                value={sort?.column ?? ""}
              >
                <SelectTrigger id="sortColumn" className="w-40">
                  <SelectValue placeholder="Column Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="firstName">First Name</SelectItem>
                    <SelectItem value="lastName">Last Name</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-row">
              <Label 
                htmlFor="sortDirection" 
                className={sort.column == null ? "w-23 text-neutral-500 font-light" : "w-23"}
              >
                Sort Direction
              </Label>
              <Select 
                disabled={sort.column == null} 
                name="sortDirection" 
                onValueChange={(value) => setSort((prev) => ({column: prev?.column ?? "", order: value as SortOrder}))} 
                value={sort?.order ?? ""}
              >
                <SelectTrigger id="sortDirection" className="w-25">
                  <SelectValue placeholder="Dir" />
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
          
          <Button 
            variant={'outline'} 
            className="w-25 bg-green-400 hover:bg-green-500" 
            onClick={handleFilterSearch}
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
        </div>
      </div>
    )
  }

  return (
    <div className="container p-5 flex flex-col justify-center items-center">
      <div className="w-full flex flex-col">
        {Filters()}
        <TableWithPagination
          ref={tableRef}
          columns={getCustomerColumns({
            //onEdit: handleEdit,
            onDelete: deleteCustomer
          })}
          data={customers}
          isLoading={isLoading}
          totalRecords={totalRecords}
          initialPageSize={10}
          onPaginationChange={handlePaginationChange}
        />

        <DeleteCustomerModal 
          isModalOpen={isDelteModalOpen} 
          onOpenChange={() => setIsDeleteModalOpen(false)} 
          selectedCustomer={selectedCustomer}
          refreshFunction={fetchCustomersData} 
        />
      </div>
    </div>
  )
}