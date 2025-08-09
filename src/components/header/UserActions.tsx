'use client'
import { Button } from "../ui/button";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import UserIcon from '../../icons/user.svg'
import LogOutIcon from '../../icons/log-out.svg'
import LogInIcon from '../../icons/log-in.svg'

import { useRouter } from 'next/navigation'
import { getAuthToken, getUserData, logoutAction } from "@/utils/auth";
import { useEffect, useState } from "react";
import { UserDataFromCookie } from "@/types/common";

export default function UserActions() {
  const [userData, setUserData] = useState<UserDataFromCookie| null>()
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const getUserDataFromCookie = async () => {
      try {
        const cookiedata = await getUserData();
        setUserData(cookiedata)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserDataFromCookie();
  }, []);

  useEffect(() => {
    const checkUserAuthStatus = async () => {
      try {
        const cookiedata = await getAuthToken();
        if(cookiedata) {
          setIsUserLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    checkUserAuthStatus();
  }, []);

  const handleLogout = () => {
    logoutAction();
    setIsUserLoggedIn(false);
    setUserData(null)
  }

  const directToSignin = () => {
    router.push('/signin')
  }

  const UserInfoCompact = ({ userData }: { userData: UserDataFromCookie }) => {
    return (
      <div className="px-2 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {userData.firstName?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Hello, {userData.firstName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {userData.email}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size='lg' className="border border-neutral-400 hover:bg-neutral-300 hover:border-neutral-300 rounded-full p-2"> 
          <Image src={UserIcon} alt={"User"} /> 
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        {isUserLoggedIn && userData ? 
          <UserInfoCompact userData={userData} /> : null
        }
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

          {isUserLoggedIn ?
          <>
            <DropdownMenuItem onClick={handleLogout} className=" hover:bg-red-200 focus:bg-red-200">
              Logout
              <DropdownMenuShortcut>
                <Image src={LogOutIcon} alt={"User"} width={20} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </> :
          <>
            <DropdownMenuItem onClick={directToSignin} className=" hover:bg-blue-200 focus:bg-blue-200">
              Sign In
              <DropdownMenuShortcut>
                <Image src={LogInIcon} alt={"User"} width={20} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
          }

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}