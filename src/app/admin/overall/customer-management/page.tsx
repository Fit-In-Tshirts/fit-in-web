'use client'

import { useEffect, useState } from "react"
import { getCustomers, RequestState } from "./action"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import toast from "react-hot-toast"

const customerData: RequestState = {}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCustomers = async() => {
      setIsLoading(true)
      const result = await getCustomers({})

      if (result.error) {
        toast.error(result.error)
      } else if (result.success && result.data) {
        toast.success(result.success)
        setCustomers(result.data)
      }

      setIsLoading(false);
    }

    loadCustomers()
  }, [])

  return (
    <div className="container p-5">
      {isLoading && <div>Loading customers...</div>}
      
      {!isLoading && customers.length > 0 && (
        <DataTable columns={columns} data={customers} />
      )}
      
      {!isLoading && customers.length === 0 && (
        <div>No customers found</div>
      )}
    </div>
  )
}