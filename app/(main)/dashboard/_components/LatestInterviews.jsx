"use client"
import { useUser } from '@/app/Provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { Camera, Video } from 'lucide-react'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import InterviewCard from './InterviewCard'

function LatestInterviews() {
    const [interviewsList,setInterviewsList] = useState([])
    const {user} = useUser()


    useEffect(() => {
      GetInterviewList()
    },[user])

    const GetInterviewList = async () => {
      let { data: Interview, error } = await supabase
        .from('Interview')
        .select("*")
        .eq('userEmail',user?.email)
        .limit(6)

        // console.log(Interview)
        setInterviewsList(Interview)
    }

    const removeInterview = (interview_id) => {
        setInterviewsList((prev) => prev.filter(i => i.interview_id !== interview_id));
    };

  return (
    <div className='my-7 mx-8'>
        <h2 className='fon-inter font-bold text-2xl'>Previous Interviews</h2>

        {interviewsList?.length == 0 && 
        <div className='p-5 mt-2 flex flex-col gap-3   rounded-2xl items-center'>
            <Video className='h-10 w-10 text-primary'/>
            <h2>You don't have any interview created!</h2>
            <Link href={'/dashboard/create-interview'}>
            
            <Button className="w-[200px] mx-auto"> <span className='cursor-pointer'>+ Create New Interview</span></Button>
            </Link>
        </div>
        }

        {
          interviewsList && 
          <div className='grid mt-5 grid-cols-2 xl:grid-cols-3 gap-5 '>
            {interviewsList.map((interview,index) => (
              <InterviewCard  interview={interview} key={index} onDelete={removeInterview}/>
            ))}
          </div>
        }
    
    </div>
  )
}

export default LatestInterviews