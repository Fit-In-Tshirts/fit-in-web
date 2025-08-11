import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { authenticatedFetch } from "@/utils/auth";

export interface RequestState {
  error?: string
  success?: string
  data?: any[]
}

export async function getCustomers(prev: RequestState): Promise<RequestState> {
  try {
    const response = await authenticatedFetch(`${API_BASE_URL}${API_ENDPOINTS.CUSTOMER.GET_ALL}`, {
      method: 'GET'
    });

    if (!response.ok) {
      return { 
        error: response.data?.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    // Validate response structure
    if (!response.data?.data?.customers) {
      return { 
        error: 'Invalid response format: missing user data' 
      };
    }

    // Extract and serialize user data
    const customers = response.data.data.customers;
    const serializedCustomers = JSON.parse(JSON.stringify(customers));

    return {
      success: response.data.message || 'Customers loaded successfully',
      data: serializedCustomers
    };

  } catch (error: any) {
    console.error('Error fetching customers:', error);
    return { 
      error: error.message || 'Failed to load customers' 
    };
  }
}