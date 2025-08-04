'use client'
import { Button } from "../ui/button";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import UserIcon from '../../icons/user.svg'
import LogOut from '../../icons/log-out.svg'

import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function UserActions() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/signin') // or any route
    router.refresh() // if needed to revalidate layout
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size='lg' className="border border-neutral-400 hover:bg-neutral-300 hover:border-neutral-300 rounded-full p-2"> 
          <Image src={UserIcon} alt={"User"} /> 
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>

          <DropdownMenuItem className="hover:bg-blue-100 focus:bg-blue-100" >
            Dashboard
            <DropdownMenuShortcut>
              <Image src={UserIcon} alt={"User"} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="hover:bg-blue-100 focus:bg-blue-100" >
            Sample
            <DropdownMenuShortcut>
              <Image src={UserIcon} alt={"User"} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogout} className=" hover:bg-red-200 focus:bg-red-200">
            Logout
            <DropdownMenuShortcut>
              <Image src={LogOut} alt={"User"} width={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}