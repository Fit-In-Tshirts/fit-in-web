'use server'

import { User } from '@/common/types'

export interface SignupState {
  error?: string
  success?: string
}

export async function signupAction(prevState: SignupState, formData: FormData) : Promise<SignupState> {

  const UserData : User = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    address: {
      houseNumber: formData.get('houseNumber') as string,
      addressLine_1: formData.get('addressLine_1') as string,
      addressLine_2: formData.get('addressLine_2') as string,
      city: formData.get('city') as string,
      province: formData.get('province') as string,
      zipcode: formData.get('zipcode') as string
    },
    phoneNumber_mobile: formData.get('phoneNumber_mobile') as string,
    phoneNumber_home: formData.get('phoneNumber_home') as string
  }

  try {
    const response = await fetch('http://localhost:5000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(UserData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { error: errorData.message || 'Signup failed' }
    }

    return { success: 'Account created successfully!' }
  } catch (error:any) {
    return { error: error.message || 'Something went wrong' }
  } 
}