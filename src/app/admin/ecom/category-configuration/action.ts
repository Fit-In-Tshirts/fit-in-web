import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api"
import { Paginator } from "@/types/common"
import { authenticatedFetch } from "@/utils/auth"

export interface RequestState {
  error?: string
  success?: string
  data?: any
}

export async function getCategories(paginator: Paginator){
  try {
    const queryParams = new URLSearchParams();

    if (paginator.pageSize !== undefined) {
      queryParams.append('pageSize', paginator.pageSize.toString());
    }
    if (paginator.pageIndex !== undefined) {
      queryParams.append('pageIndex', paginator.pageIndex.toString());
    }

    const endpoint = `${API_BASE_URL}${API_ENDPOINTS.CATEGORY.GET_ALL}`
    const url = queryParams.toString() ? `${endpoint}?${queryParams.toString()}` : endpoint;

    const response = await authenticatedFetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    if (!response.data.categories) {
      return { 
        error: 'Invalid response format' 
      };
    }

    const serializedCategories = JSON.parse(JSON.stringify(response.data.categories));

    return {
      success: response.data.message || 'Categories loaded successfully',
      data: {
        categories : serializedCategories,
        totalRecords : response.data.totalRecords
      }
    };

  } catch(error:any){
    return { 
      error: error.message || 'Failed to load categories' 
    };
  }
}