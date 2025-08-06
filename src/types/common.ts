import bcrypt from 'bcrypt'

export type Address = {
  houseNumber: string,
  addressLine_1: string,
  addressLine_2: string,
  city: string,
  province: string,
  zipcode: number
}

export type UserSignup = {
  id: string;
  firstName: string,
  lastName: string,
  email: string,
  passwordHash: string,
  address: Address
  phoneNumber_mobile: string,
  phoneNumber_home: string,
}

const SALT_ROUNDS = 10

export async function hashPassword(plainPassword: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS)
  return hashedPassword
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}