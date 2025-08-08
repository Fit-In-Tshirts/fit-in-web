'use server'

import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api"

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

    // You might want to handle the response data (like storing tokens)
    // const responseData = await response.json()

    return { success: 'Signed in successfully!' }
  } catch(error:any) {
    return { error: error.message || 'Something went wrong!'}
  }
}