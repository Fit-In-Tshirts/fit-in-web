'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signin(formData: FormData) {

  revalidatePath('/', 'layout')
  redirect('/home')
}