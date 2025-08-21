import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api"
import { Category, CategoryFilter, Design, DesignFilter, Paginator, SortingState } from "@/types/common"
import { authenticatedFetch } from "@/utils/auth"

export interface RequestState {
  error?: string
  success?: string
  data?: any
}

export async function getDesigns(filter:DesignFilter, sort:SortingState, paginator: Paginator): Promise<RequestState>{
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

    const endpoint = `${API_BASE_URL}${API_ENDPOINTS.DESIGN.GET_ALL}`
    const url = queryParams.toString() ? `${endpoint}?${queryParams.toString()}` : endpoint;

    const response = await authenticatedFetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    if (!response.data.designs) {
      return { 
        error: 'Invalid response format' 
      };
    }

    const serializedDesigns = JSON.parse(JSON.stringify(response.data.designs));

    return {
      success: response.data.message || 'Designs loaded successfully',
      data: {
        categories : serializedDesigns,
        totalRecords : response.data.totalRecords
      }
    };

  } catch(error:any){
    return { 
      error: error.message || 'Failed to load designs' 
    };
  }
}

export async function deleteDesign(id:string): Promise<RequestState> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.DESIGN.DELETE_BY_ID}`

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
      success: response.message || 'Design deleted successfully',
    };
  } catch(error:any) {
    return { 
      error: error.message || 'Failed to delete design' 
    };
  }
}

export async function updateDesign(design:Design):Promise<RequestState> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.DESIGN.UPDATE}`
    
    const response = await authenticatedFetch(url, {
      method: 'PATCH',
      body: JSON.stringify({design})
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    return {
      success: response.message || 'Design updated successfully',
    };
  } catch(error:any) {
    return { 
      error: error.message || 'Failed to update design' 
    };
  }
}

export async function createDesign(design:Design):Promise<RequestState> {
  try{
    const url = `${API_BASE_URL}${API_ENDPOINTS.DESIGN.CREATE}`
    
    const response = await authenticatedFetch(url, {
      method: 'POST',
      body: JSON.stringify({design})
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    return {
      success: response.message || 'Design created successfully',
    };
  } catch(error:any){
    return { 
      error: error.message || 'Failed to create design' 
    };
  }
}