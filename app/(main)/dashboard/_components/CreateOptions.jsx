import { PhoneCall, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {

  return (
    <div className='grid grid-cols-2 gap-4 mx-8 mt-4 '>
        <Link href={'/dashboard/create-interview'} className='bg-white border border-gray-200 p-4 rounded-2xl cursor-pointer'>
            <VideoIcon className='p-3 text-primary bg-primary/10 rounded-lg h-12 w-12'/>
            <h2 className='text-lg font-bold'>Create New Interview</h2>
            <p className='text-gray-500'>Create AI Interviews and Schedule them with candidates for your next job </p>
        </Link>

        <div className='bg-white border border-gray-200 p-4 rounded-2xl'>
            <PhoneCall className='p-3 text-primary bg-primary/10 rounded-lg h-12 w-12'/>
            <h2 className='text-lg font-bold'>Create Phone Screening Call</h2>
            <p className='text-gray-500'>Schedule phone Screening Calls with candidates for your next job </p>
        </div>
    </div>
  )
}

export default CreateOptions