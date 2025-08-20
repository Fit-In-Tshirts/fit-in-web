import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { CustomerAddress, CustomerFilter, CustomerPersonalInfo, CustomerPhoneNumber, Paginator } from "@/types/common";
import { authenticatedFetch } from "@/utils/auth";
import { SortingState } from "@/types/common";

export interface RequestState {
  error?: string
  success?: string
  data?: any
}

export async function getCustomers(prev: RequestState, customerFilter: CustomerFilter, sortingState: SortingState, paginator: Paginator): Promise<RequestState> {
  try {
    const queryParams = new URLSearchParams();

    if (paginator.pageSize !== undefined) {
      queryParams.append('pageSize', paginator.pageSize.toString());
    }
    if (paginator.pageIndex !== undefined) {
      queryParams.append('pageIndex', paginator.pageIndex.toString());
    }

    if (sortingState.column) {
      queryParams.append('sortColumn', sortingState.column.toString());
    }
    if (sortingState.order) {
      queryParams.append('sortOrder', sortingState.order.toString());
    }

    if (customerFilter.email && customerFilter.email.trim() !== '') {
      queryParams.append('email', customerFilter.email.trim());
    }
    if (customerFilter.firstName && customerFilter.firstName.trim() !== '') {
      queryParams.append('firstName', customerFilter.firstName.trim());
    }
    if (customerFilter.lastName && customerFilter.lastName.trim() !== '') {
      queryParams.append('lastName', customerFilter.lastName.trim());
    }
    if (customerFilter.houseNumber && customerFilter.houseNumber.trim() !== '') {
      queryParams.append('houseNumber', customerFilter.houseNumber.trim());
    }
    if (customerFilter.addressLine1 && customerFilter.addressLine1.trim() !== '') {
      queryParams.append('addressLine1', customerFilter.addressLine1.trim());
    }
    if (customerFilter.addressLine2 && customerFilter.addressLine2.trim() !== '') {
      queryParams.append('addressLine2', customerFilter.addressLine2.trim());
    }
    if (customerFilter.province && customerFilter.province.trim() !== '') {
      queryParams.append('province', customerFilter.province.trim());
    }
    if (customerFilter.city && customerFilter.city.trim() !== '') {
      queryParams.append('city', customerFilter.city.trim());
    }
    if (customerFilter.zipcode && customerFilter.zipcode.trim() !== '') {
      queryParams.append('zipcode', customerFilter.zipcode.trim());
    }

    const endpoint = `${API_BASE_URL}${API_ENDPOINTS.CUSTOMER.GET_ALL}`
    const url = queryParams.toString() ? `${endpoint}?${queryParams.toString()}` : endpoint;

    const response = await authenticatedFetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    if (!response.data.customers) {
      return { 
        error: 'Invalid response format: missing user data' 
      };
    }

    const customers = response.data.customers;
    const serializedCustomers = JSON.parse(JSON.stringify(customers));

    return {
      success: response.data.message || 'Customers loaded successfully',
      data: {
        customers : serializedCustomers,
        totalRecords : response.data.totalRecords
      }
    };

  } catch (error: any) {
    return { 
      error: error.message || 'Failed to load customers' 
    };
  }
}

export async function getCustomerById(id: string): Promise<RequestState> {
  try {
    const queryParams = new URLSearchParams();

    if (id !== undefined) {
      queryParams.append('id', id.toString());
    }

    const endpoint = `${API_BASE_URL}${API_ENDPOINTS.CUSTOMER.GET_BY_ID}`
    const url = `${endpoint}?${queryParams.toString()}`;

    const response = await authenticatedFetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    if (!response.data) {
      return { 
        error: response.message || 'Invalid response format: missing user data' 
      };
    }

    return {
      success: response.data.message || 'Customers loaded successfully',
      data: response.data
    };

  } catch(error:any) {
    return {
      error: error.message || 'Failed to get customer information' 
    };
  }
}

export async function deleteCustomerById(id: string):Promise<RequestState> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.CUSTOMER.DELETE_BY_ID}`

    const response = await authenticatedFetch(url, {
      method: 'DELETE',
      body: JSON.stringify({id:id})
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    return {
      success: response.message || 'Customers deleted successfully',
    };
  } catch(error: any) {
    return {
      error: error.message || 'Failed to delete customer' 
    };
  }
}

export async function updateCustomerInfo(
  personalInfo: CustomerPersonalInfo, 
  addressInfo: CustomerAddress,
  contactInfo: CustomerPhoneNumber[]
) : Promise<RequestState> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.CUSTOMER.UPDATE}`

    const body = {
      personalInfo: personalInfo,
      addressInfo: addressInfo,
      contactInfo: contactInfo
    }

    const response = await authenticatedFetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    return {
      success: response.message || 'Customer updated successfully',
    };
  } catch(error:any) {
    return {
      error: error.message || 'Failed to update customer' 
    };
  }
}