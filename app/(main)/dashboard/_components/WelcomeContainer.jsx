"use client"

import React from 'react'
import { useUser } from '@/app/Provider'
import Image from 'next/image'

function WelcomeContainer() {
    const {user} = useUser()
    console.log(user)
    
  return (
    <div className='bg-white p-4 m-8 rounded-2xl font-inter flex items-center justify-between'>
      <div style={{fontFamily:"Inter", fontSize:"26px", }}>Welcome Back <span className='text-blue-500' > {user?.email}</span>
          <h2 className='text-gray-400 text-sm'>Your personal hub to master interviews—fueled by AI.</h2>
    </div>
    {user && <Image src={user?.picture || '/assets/profilePicture.png'} alt='user' width={40} height={40} className='rounded-full'/>}
    </div>
  )
}

export default WelcomeContainer