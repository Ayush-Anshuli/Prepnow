"use client"

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { SidebarOptions } from "@/services/Constants"
import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@/app/Provider"
import { LogOut } from "lucide-react"
  
  export function AppSidebar() {
    const path = usePathname();
    const { logout } = useUser();

    return (
      <Sidebar>
        <SidebarHeader >
            <h1 className='text-xl text-blue-500 p-2 mt-5 font-inter'>PrepNow</h1>
        </SidebarHeader>
        <Link href={'/dashboard/create-interview'}>
        <Button className={'m-2 p-2 cursor-pointer'}>
            <Plus  />
            Create New Interview
        </Button>
        </Link>
        <SidebarContent>
          <SidebarGroup >
            <SidebarContent>
              <SidebarMenu>
                {SidebarOptions.map((option,index) => (
                  <SidebarMenuItem className={"mt-3 text-lg"} key={index}>
                                         <SidebarMenuButton asChild className={`${path==option.path ? 'text-primary' : ''}`} >
                      <Link href={option.path}>
                        <option.icon />
                        <span >{option.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 justify-center mt-2"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
    )
  }