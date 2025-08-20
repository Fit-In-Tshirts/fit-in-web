import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api"
import { CategoryFilter, Paginator, SortingState } from "@/types/common"
import { authenticatedFetch } from "@/utils/auth"

export interface RequestState {
  error?: string
  success?: string
  data?: any
}

export async function getCategories(filter:CategoryFilter, sort:SortingState, paginator: Paginator){
  try {
    const queryParams = new URLSearchParams();
    
    if (filter.name && filter.name.trim() !== '') {
      queryParams.append('name', filter.name.trim());
    }
    if (filter.slug && filter.slug.trim() !== '') {
      queryParams.append('slug', filter.slug.trim());
    }
    if (filter.activeFilterEnabled) {
      queryParams.append('isActive', filter.isActive.toString());
    }
    if (sort.column) {
      queryParams.append('sortColumn', sort.column.toString());
    }
    if (sort.order) {
      queryParams.append('sortOrder', sort.order.toString());
    }
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