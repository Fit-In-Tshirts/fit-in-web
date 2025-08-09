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

export interface UserDataFromCookie {
  id: string,
  email: string,
  roleId: string,
  firstName: string,
  lastName: string
}