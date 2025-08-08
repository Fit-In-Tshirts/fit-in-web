// this only for testing the JWT token
//and cookie behaviors


import { Button } from "@/components/ui/button";
import { profileAction } from "./action";
import { logoutAction } from "@/utils/auth";
import Link from "next/link";

export default async function ProfilePage() {
  const result = await profileAction();

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>

      <div><Button onClick={logoutAction}>Logout</Button></div>
      <div><Link href={"/signin"}>Signin</Link></div>
    </div>
  );
}
