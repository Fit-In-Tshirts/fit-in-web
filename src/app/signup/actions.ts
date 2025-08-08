'use server'

import { Address, User } from '@/types/common'
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api'
import { cookies } from 'next/headers'

export interface SignupState {
  error?: string
  success?: string
}

export async function signupAction(prevState: SignupState, formData: FormData) : Promise<SignupState> {
  const address : Address = {
    houseNumber: formData.get('houseNumber') as string,
    addressLine_1: formData.get('addressLine_1') as string,
    addressLine_2: formData.get('addressLine_2') as string,
    city: formData.get('city') as string,
    province: formData.get('province') as string,
    zipcode: formData.get('zipcode') as string
  };
  const userData : User = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    address,
    phoneNumber_mobile: formData.get('phoneNumber_mobile') as string,
    phoneNumber_home: formData.get('phoneNumber_home') as string
  }

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { error: errorData.message || 'Signup failed' }
    }

    //get response data
    const responseData = await response.json();

    // Store the JWT token in httpOnly cookie for security
    const cookieStore = await cookies();

    cookieStore.set('auth-token', responseData.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 //7days
    })

    // Optionally store user data in a separate cookie (without sensitive info)
    cookieStore.set('user-data', JSON.stringify({
      id: responseData.data.user.id,
      email: responseData.data.user.email,
      roleId: responseData.data.user.roleId
    }), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return { success: 'Account created successfully!' }
  } catch (error:any) {
    return { error: error.message || 'Something went wrong' }
  } 
}