import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";
import { authenticatedFetch } from "@/utils/auth";

export interface RequestState {
  error?: string
  success?: string
  data?: any
}

export async function getProducts(): Promise<RequestState>{
  try {

    const endpoint = `${API_BASE_URL}${API_ENDPOINTS.PRODUCT.GET_ALL}`
    
    const response = await authenticatedFetch(endpoint, {
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

    console.log(serializedProducts);

    return {
      success: response.data.message || 'Products loaded successfully',
      data: {
        categories : serializedProducts,
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

    console.log("res: ", response);
    
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