'use client'

import React, { useEffect } from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import CreateOptions from './_components/CreateOptions'
import LatestInterviews from './_components/LatestInterviews'
import { useUser } from '@/app/Provider'
import { useRouter } from 'next/navigation'

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return; // Wait for user to be checked
    if (!user) {
      router.replace('/auth');
    }
  }, [user, router]);

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return null;

  return (
    <div>
      {/* <WelcomeContainer/> */}
      <h2 className='text-2xl font-bold mx-8  font-inter'>Dashboard</h2>
      <CreateOptions/>
      <LatestInterviews/>
    </div>
  )
}

export default Dashboard