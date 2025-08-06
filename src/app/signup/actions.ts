'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { hashPassword, UserSignup } from '@/types/common'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const supabaseAuthData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data, error } = await supabase.auth.signUp(supabaseAuthData)

  if (error) {
    redirect('/error')
  }

  const UserSignupData : UserSignup = {
    id: data.user!.id,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    passwordHash: (await hashPassword(supabaseAuthData.password)).toString(),
    address: {
      houseNumber: formData.get('houseNumber') as string,
      addressLine_1: formData.get('addressLine_1') as string,
      addressLine_2: formData.get('addressLine_2') as string,
      city: formData.get('city') as string,
      province: formData.get('province') as string,
      zipcode: Number(formData.get('zipcode')?.toString())
    },
    phoneNumber_mobile: formData.get('phoneNumber_mobile') as string,
    phoneNumber_home: formData.get('phoneNumber_home') as string
  }

  const response = await fetch('http://localhost:5000/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(UserSignupData)
  })

  console.log('data: ', data)
  console.log('error: ' , error)
  
  revalidatePath('/', 'layout')
  redirect(`/signup/confirmation?email=${supabaseAuthData.email}`)
}