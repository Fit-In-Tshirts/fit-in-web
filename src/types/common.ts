export type Address = {
  houseNumber: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
  province: string,
  zipcode: string
}

export type User = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  address: Address
  phoneNumber_mobile: string,
  phoneNumber_home: string,
}

// Customer * needs fine tuning with the DB.
export type Customer = {
  id: any
  firstName: string,
  lastName: string,
  email: string,
  addresses: Address[]
  phoneNumbers: phoneNumber[]
}

export type phoneNumber = {
  phoneNumber: string,
  phoneType: PhoneType
}

export enum PhoneType {
  MOBILE, HOME
}
//customer

export interface UserDataFromCookie {
  id: string,
  email: string,
  roleId: string,
  firstName: string,
  lastName: string
}

export interface CustomerFilter {
  email: string,
  firstName: string,
  lastName: string,
  houseNumber: string,
  addressLine1: string,
  addressLine2: string,
  province: string,
  city: string,
  zipcode: string
}

export interface Paginator {
  pageSize: number,         // number of records per page
  pageIndex: number,         // current page number (0-based)
  totalRecords?: number,      // total items from server
}

export type SortOrder = 'asc' | 'desc' | null;

export interface SortingState {
  column: string | null;
  order: SortOrder;
}