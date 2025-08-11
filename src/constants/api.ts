export const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  AUTH : {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    // LOGOUT: '/auth/logout',
  },
  USER: {
    GET_ALL: '/user/getall',
    //GET_BY_ID: (id: string) => `/users/${id}`,
  },
  CUSTOMER: {
    GET_ALL: '/customer/getall',
    //GET_BY_ID: (id: string) => `/users/${id}`,
  },
  // PRODUCTS: {
  //   GET_ALL: '/products',
  //   GET_BY_ID: (id: string) => `/products/${id}`,
  // },
}