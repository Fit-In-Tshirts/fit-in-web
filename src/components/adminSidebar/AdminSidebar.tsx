'use client'

import Link from "next/link";
import Image from "next/image";
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
} from "@/components/ui/sidebar";
import { 
  Columns3Cog, ListCheck, LucideIcon, PackageCheck, PackagePlus, PaintBucket, StretchHorizontal, TrendingUp, UserRoundPen 
} from "lucide-react";
import finderprintIcon from '../../icons/fingerprint.svg';
import { useAdminStore } from '../../stores/useAdminStore';

type SidebarMenuItem = {
  title: string;
  url: string;
  icon: LucideIcon; // ensures it's one of the lucide-react icons
};

export function AdminSidebar() {
  const currentTab = useAdminStore((s) => s.currentTab);
  const setCurrentTab = useAdminStore((s) => s.setCurrentTab);
  const section = useAdminStore((s) => s.currentSection);
  const setCurrentSection = useAdminStore((s) => s.setCurrentSection);

  const overall:SidebarMenuItem[] = [
    { title: "Statistics", url: "/admin/overall/statistics", icon: TrendingUp },
    { title: "Customer Management", url: "/admin/overall/customer-management", icon: UserRoundPen },
  ];

  const ecom:SidebarMenuItem[] = [
    { title: "Category Configuration", url: "/admin/ecom/category-configuration", icon: Columns3Cog },
    { title: "Product Management", url: "/admin/ecom/product-management", icon: StretchHorizontal },
    { title: "Inventory", url: "/admin/ecom/completed-orders", icon: ListCheck },
    { title: "Orders", url: "/admin/ecom/item-management", icon: PackagePlus },
  ];

  const printing:SidebarMenuItem[] = [
    { title: "New Orders", url: "/admin/printing/new-orders", icon: PackagePlus },
    { title: "Ongoing Orders", url: "/admin/printing/ongoing-orders", icon: PaintBucket },
    { title: "Completed Orders", url: "/admin/printing/completed-orders", icon: PackageCheck },
  ];

  const handleSidebarClick = (section: string, tab: string) => {
    setCurrentSection(section);
    setCurrentTab(tab);
  }

  const renderMenuItems = (items: SidebarMenuItem[], sectionName: string) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <Link
            href={item.url}
            onClick={() => handleSidebarClick(sectionName, item.title)}
            className="flex items-center gap-2"
          >
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar side="left" collapsible="offcanvas" variant="inset" className="bg-neutral-100">
      <SidebarHeader className="bg-neutral-100 rounded-lg border border-neutral-200 hover:border-neutral-200 hover:bg-neutral-50 flex flex-row items-center justify-center">
        <Image src={finderprintIcon} alt="admin" width={20} />
        <p className="font-semibold">WICHITHRA</p>
      </SidebarHeader>

      <SidebarContent className="bg-neutral-100">
        <SidebarGroup>
          <SidebarGroupLabel>Overall</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(overall, 'Overall')}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>E-commerce</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(ecom, 'E-com')}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Printing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(printing, 'Printing')}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
