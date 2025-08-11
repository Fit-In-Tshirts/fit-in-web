'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Columns3Cog, PackageCheck, PackagePlus, PaintBucket, StretchHorizontal, TrendingUp, UserRoundPen } from "lucide-react"
import finderprintIcon from '../../icons/fingerprint.svg'
import Image from "next/image"
import { useAdminStore } from '../../stores/useAdminStore'

export function AdminSidebar() {
  const currentTab = useAdminStore((s) => s.currentTab);
  const setCurrentTab = useAdminStore((s) => s.setCurrentTab);
  const section = useAdminStore((s) => s.currentSection)
  const setCurrentSection = useAdminStore((s) => s.setCurrentSection)

  const overall = [
    {
      title: "Statistics",
      url: "statistics",
      icon: TrendingUp ,
    },
    {
      title: "Customer Management",
      url: "customer-management",
      icon: UserRoundPen ,
    }
  ]
  const ecom = [
    {
      title: "New Orders",
      url: "admin/ecom/new-orders",
      icon: PackagePlus,
    },
    {
      title: "Completed Orders",
      url: "admin/ecom/completed-orders",
      icon: PackageCheck,
    },
    {
      title: "Item Management",
      url: "admin/ecom/item-management",
      icon: StretchHorizontal,
    },
    {
      title: "Category Management",
      url: "admin/ecom/category-management",
      icon: Columns3Cog,
    },
  ]

  const printing = [
    {
      title: "New Orders",
      url: "admin/printing/new-orders",
      icon: PackagePlus ,
    },
    {
      title: "Ongoing Orders",
      url: "admin/printing/ongoing-orders",
      icon: PaintBucket,
    },
    {
      title: "Completed Orders",
      url: "admin/printing/completed-orders",
      icon: PackageCheck,
    }
  ]

  const hanldeSidebarClick = (section:string, tab:string) => {
    setCurrentSection(section);
    setCurrentTab(tab);
  }

  return (
    <Sidebar side="left" variant="inset" className="bg-neutral-100">
      <SidebarHeader className="bg-neutral-100 rounded-lg border border-neutral-200 hover:border-neutral-200 hover:bg-neutral-50 flex flex-row items-center justify-center ">
        <Image src={finderprintIcon} alt={"admin"} width={20} />
        <p className="font-semibold">FIT-IN-TSHIRTS</p>
      </SidebarHeader>
      <SidebarContent className="bg-neutral-100">

        <SidebarGroup>
          <SidebarGroupLabel>Overall</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {overall.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} onClick={() => hanldeSidebarClick('Overall', item.title)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>E-commerce</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ecom.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} onClick={() => hanldeSidebarClick('E-com', item.title)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Printing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {printing.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} onClick={() => hanldeSidebarClick('Printing', item.title)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}