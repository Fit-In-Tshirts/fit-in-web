import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { Customer, CustomerFilter, Paginator } from "@/types/common";
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

    // Add pagination parameters
    if (paginator.pageSize !== undefined) {
      queryParams.append('pageSize', paginator.pageSize.toString());
    }
    if (paginator.pageIndex !== undefined) {
      queryParams.append('pageIndex', paginator.pageIndex.toString());
    }

    // Add sorting parameters
    if (sortingState.column) {
      queryParams.append('sortColumn', sortingState.column.toString());
    }
    if (sortingState.order) {
      queryParams.append('sortOrder', sortingState.order.toString());
    }

    // Add filter parameters (only if they have values)
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

    // Build the complete URL
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

    // Validate response structure
    if (!response.data.customers) {
      return { 
        error: 'Invalid response format: missing user data' 
      };
    }

    // Extract and serialize user data
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