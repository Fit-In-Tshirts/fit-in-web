export type Address = {
  houseNumber: string,
  addressLine_1: string,
  addressLine_2: string,
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
  firstName: string,
  lastName: string,
  email: string,
  addresses: CustomerAddress[]
  phoneNumbers: phoneNumber[]
}

export type CustomerAddress = {
  houseNumber: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
  province: string,
  zipCode: string
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