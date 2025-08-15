'use client'

import { useEffect, useState } from "react"
import { getCustomers, RequestState } from "./action"
import { columns } from "./columns"
import { Loader2Icon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Customer, CustomerFilter, Paginator, SortOrder, SortingState } from "@/types/common"
import Table from "@/components/table/Table"

const customerData: RequestState = {}

const initialFilter:CustomerFilter = {
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

const initialPaginator:Paginator = {
  pageSize: 10,         // number of records per page
  pageIndex: 0,         // current page number (0-based)
  totalRecords: 0,      // total items from server
}

const initialSorting: SortingState = {
  column: null,
  order: 'asc',
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState(initialFilter)
  const [sort, setSort] = useState<SortingState>(initialSorting)
  const [paginator, setPaginator] = useState(initialPaginator)

  const fetchCustomersData = async () => {
    try {
      setIsLoading(true);
      const response = await getCustomers({}, filter, sort, paginator);
      
      console.log("response: ", response)

      setCustomers(response.data.customers) 
      setPaginator(prev => {
        if (prev.totalRecords !== response.data.totalRecords) {
          return { ...prev, totalRecords: response.data.totalRecords };
        }
        return prev // no change -> no re-render
      });

    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setIsLoading(false);
    }
};

  useEffect(() => {
    fetchCustomersData()
  }, [paginator.pageIndex, paginator.pageSize])

  useEffect(() => {
    setPaginator(prev => ({...prev, pageIndex: 0}));
  }, [filter, sort]);

  const handleReset = () => {
    setFilter(initialFilter);
    setSort(initialSorting);
    //setPaginator(prev => ({...prev, pageIndex: 0}));
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const Filters = () => {
    return <div className="flex flex-col gap-1 mb-3">
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
            <Select name="sortColumn" onValueChange={(value) => setSort((prev) => ({column: value, order: prev?.order ?? null}))} value={sort?.column ?? ""}>
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
            <Label htmlFor="sortDirection" className={(sort.column) == null ? "w-23 text-neutral-500 font-light":"w-23"}>Sort Direction</Label>
            <Select disabled={ sort.column == null} name="sortDirection" onValueChange={(value) => setSort((prev) => ({column: prev?.column ?? "", order: value as SortOrder}))} value={sort?.order ?? ""}>
              <SelectTrigger id="sortDirection" className="w-25">
                <SelectValue />
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
        <Button variant={'outline'} className="w-25 bg-green-400 hover:bg-green-500" onClick={fetchCustomersData}>Search</Button>
        <Button variant={'outline'} className="w-25 bg-red-400 hover:bg-red-500" onClick={handleReset}>Reset Filters</Button>
      </div>
    </div>
  }

  return (
    <div className="container p-5 flex flex-col justify-center items-center">

      {isLoading && <div className="flex flex-row justify-start items-start gap-2"><Loader2Icon className="animate-spin" />Loading customers...</div>}

      <div className="w-full flex flex-col">
        {Filters()}
        <Table data={customers} columns={columns} paginator={paginator} setPaginator={setPaginator}/>
      </div>
      
    </div>
  )
}