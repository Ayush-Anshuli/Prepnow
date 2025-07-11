import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/AppSidebar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

function DashboardProvider({children}) {
  return (
    
      <SidebarProvider>
        <AppSidebar />
      <div className='w-full bg-gray-100'>
        {/* <SidebarTrigger style={{cursor:"pointer"}}/> */}
        <WelcomeContainer />
        {children}
      </div>
      </SidebarProvider>

  )
}

export default DashboardProvider