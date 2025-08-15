'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//get JWT token from cookie
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');
  return token?.value || null;
}

//get user data from cookie
export async function getUserData() {
  const cookieStore = await cookies();
  const userData = cookieStore.get('user-data');

  if(!userData) return null;

  try {
    return JSON.parse(userData.value);
  } catch(error) {
    return null;
  }
}

//for making authenticated API calls
export async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = await getAuthToken();

  if(!token) {
    redirect('/signin');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  const responseData = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    message: responseData.message,
    data: responseData.data,
  };
}

//logout function
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  cookieStore.delete('user-data');
}