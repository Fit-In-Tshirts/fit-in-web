import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api"
import { Category, CategoryFilter, Paginator, SortingState } from "@/types/common"
import { authenticatedFetch } from "@/utils/auth"

export interface RequestState {
  error?: string
  success?: string
  data?: any
}

export async function getCategories(filter:CategoryFilter, sort:SortingState, paginator: Paginator): Promise<RequestState>{
  try {
    const queryParams = new URLSearchParams();
    
    if (filter.name && filter.name.trim() !== '') {
      queryParams.append('name', filter.name.trim());
    }
    if (filter.slug && filter.slug.trim() !== '') {
      queryParams.append('slug', filter.slug.trim());
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

export async function deleteCategory(id:string): Promise<RequestState> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.CATEGORY.DELETE_BY_ID}`

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
      success: response.message || 'Category deleted successfully',
    };
  } catch(error:any) {
    return { 
      error: error.message || 'Failed to delete category' 
    };
  }
}

export async function updateCategory(category:Category):Promise<RequestState> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.CATEGORY.UPDATE}`
    
    const response = await authenticatedFetch(url, {
      method: 'PATCH',
      body: JSON.stringify({category})
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    return {
      success: response.message || 'Category updated successfully',
    };
  } catch(error:any) {
    return { 
      error: error.message || 'Failed to update category' 
    };
  }
}

export async function createCategory(category:Category):Promise<RequestState> {
  try{
    const url = `${API_BASE_URL}${API_ENDPOINTS.CATEGORY.CREATE}`
    
    const response = await authenticatedFetch(url, {
      method: 'POST',
      body: JSON.stringify({category})
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    return {
      success: response.message || 'Category created successfully',
    };
  } catch(error:any){
    return { 
      error: error.message || 'Failed to create category' 
    };
  }
}