"use client"

import { useUser } from '@/app/Provider'
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient'
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import Link from 'next/link';

function ScheduledInterview() {

    const {user} = useUser();
    const [interviewsList,setInterviewsList] = useState([])

    useEffect(() => {
        user && GetInterviewsList()
    },[user])

    const GetInterviewsList = async () => {
        const result = await supabase.from('Interview')
            .select('jobPosition, duration, interview_id, created_at, interview-feedback(userEmail)')
            .eq('userEmail', user?.email)
            .order('created_at', { ascending: false });
        console.log(result);
        setInterviewsList(result.data || []);
    }

    const removeInterview = (interview_id) => {
        setInterviewsList((prev) => prev.filter(i => i.interview_id !== interview_id));
    };

  return (
    <div className='mt-5 mx-8 '>
    <h2 className='font-bold text-lg'>Interview List With Feedback</h2>

    {interviewsList?.length == 0 && 
        <div className='p-5 mt-2 flex flex-col gap-3   rounded-2xl items-center'>
            <Video className='h-10 w-10 text-primary'/>
            <h2>You don't have any interview created!</h2>
            <Link href={'/dashboard/create-interview'}>
            
            <Button className="w-[200px] mx-auto"> <span className='cursor-pointer'>+ Create New Interview</span></Button>
            </Link>
        </div>
        }

        {Array.isArray(interviewsList) && interviewsList.length > 0 && (
          <div className='grid mt-5 grid-cols-2 xl:grid-cols-3 gap-5 '>
            {interviewsList.map((interview,index) => (
              <InterviewCard  interview={interview} key={index} onDelete={removeInterview}
                viewDetail = {true}
              />
            ))}
          </div>
        )}


    </div>
  )
}

export default ScheduledInterview