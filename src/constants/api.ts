export const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  AUTH : {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    // LOGOUT: '/auth/logout',
  },
  USER: {
    GET_ALL: '/user/getall',
  },
  CUSTOMER: {
    GET_ALL: '/customer/getall',
    GET_BY_ID: '/customer/get_by_id',
    DELETE_BY_ID: '/customer/delete_by_id',
    UPDATE: '/customer/update'
  },
  CATEGORY: {
    GET_ALL: '/category/getall',
    DELETE_BY_ID: '/category/delete_by_id',
    UPDATE: '/category/update',
    CREATE: '/category/create',
  }
}