import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { Paginator } from "@/types/common";
import { authenticatedFetch } from "@/utils/auth";

export interface RequestState {
  error?: string
  success?: string
  data?: any
}

export async function getProducts(paginator:Paginator): Promise<RequestState>{
  try {
    const queryParams = new URLSearchParams();

    if (paginator.pageSize !== undefined) {
      queryParams.append('pageSize', paginator.pageSize.toString());
    }
    if (paginator.pageIndex !== undefined) {
      queryParams.append('pageIndex', paginator.pageIndex.toString());
    }

    const endpoint = `${API_BASE_URL}${API_ENDPOINTS.PRODUCT.GET_ALL}`
    const url = queryParams.toString() ? `${endpoint}?${queryParams.toString()}` : endpoint;
    
    const response = await authenticatedFetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      return { 
        error: response.message || `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    if (!response.data.products) {
      return { 
        error: 'Invalid response format' 
      };
    }

    const serializedProducts = JSON.parse(JSON.stringify(response.data.products));

    return {
      success: response.data.message || 'Products loaded successfully',
      data: {
        products : serializedProducts,
        totalRecords : response.data.totalRecords
      }
    };

  } catch(error:any) {
    return { 
      error: error.message || 'Failed to load products' 
    };
  }
}

export async function deleteProduct(id:string):Promise<RequestState> {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.PRODUCT.DELETE}`

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
      success: response.message || 'Product deleted successfully',
    };
  } catch(error:any) {
    return { 
      error: error.message || 'Failed to delete product' 
    };
  }
}

export async function getFilterData() {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.PRODUCT.GET_FILTER_DATA}`

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
        error: 'Invalid response format' 
      };
    }

    const serializedCategoryNames = JSON.parse(JSON.stringify(response.data.categoryNames));
    const serializedDesignNames = JSON.parse(JSON.stringify(response.data.designNames));

    return {
      success: response.data.message || 'Filter data loaded successfully',
      data: {
        categoryNames : serializedCategoryNames,
        designNames : serializedDesignNames
      }
    };

  } catch(error:any) {
     return { 
      error: error.message || 'Failed to load categories' 
    };
  }

}