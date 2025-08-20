'use client'

import { SidebarTrigger } from "../ui/sidebar";
import { useAdminStore } from '../../stores/useAdminStore'
import { ChevronRight } from 'lucide-react';


export default function AdminHeader() {
  const currentSection = useAdminStore((s) => s.currentSection);
  const currentTab = useAdminStore((s) => s.currentTab);

  return (
    <div className="flex flex-row w-full h-10 justify-start items-center bg-neutral-100">
      <SidebarTrigger className="m-2" />
      <div className="flex flex-row items-center justify-start">
        <h1 className="font-medium"> {currentSection} </h1>
        <ChevronRight size={15} className="m-1"/>
        <h1 className="font-medium"> {currentTab} </h1>
      </div>
    </div>
  )
}