"use client"

import { useUser } from '@/app/Provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';

function InterviewDetailsPage() {
    const {interview_id} = useParams();

    const {user} = useUser()

    const [interviewDetail,setInterviewDetail] = useState();

    useEffect(() => {
        GetInterviewDetail();
    },[user])


    const GetInterviewDetail = async () => {
        const result = await supabase.from('Interview')
            .select('jobPosition, jobDescription, type, questions, duration, interview_id, created_at, interview-feedback(userEmail,userName,feedback,created_at)')
            .eq('userEmail', user?.email)
            .eq('interview_id',interview_id)

            console.log('Interview detail result:', result);
            if (Array.isArray(result?.data) && result.data.length > 0) {
                setInterviewDetail(result.data[0]);
            } else {
                setInterviewDetail(null);
            }
    }
  return (
    <div className='mx-8 mt-5'>
        <h2 className='font-bold text-2xl'>Interview Details </h2>
        <InterviewDetailContainer interviewDetail={interviewDetail}/>
        {Array.isArray(interviewDetail?.['interview-feedback']) && interviewDetail['interview-feedback'].length > 0 && (
          <CandidateList detail={interviewDetail['interview-feedback']} />
        )}
    </div>
  )
}

export default InterviewDetailsPage