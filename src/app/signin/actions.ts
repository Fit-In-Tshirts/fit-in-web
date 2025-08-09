'use server'

import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api"
import { cookies } from "next/headers"
import { stringify } from "querystring"

export interface SigninState {
  error?: string,
  success?: string
}

export async function signinAction(prevState: SigninState, formData: FormData): Promise<SigninState> {
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if(!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Signin failed!' }
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
      roleId: responseData.data.user.roleId,
      firstName: responseData.data.user.firstName,
      lastName: responseData.data.user.lastName
    }), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return { success: 'Signed in successfully!' }
  } catch(error:any) {
    return { error: error.message || 'Something went wrong!'}
  }
}