// this only for testing the JWT token
//and cookie behaviors

"use server";

import { authenticatedFetch } from "@/utils/auth";

export async function profileAction() {
  const response = await authenticatedFetch("http://localhost:5000/api/auth/me", {
    method: "GET",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch profile");
  }

  return result; // ✅ return data
}
