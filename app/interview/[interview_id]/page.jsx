'use client'
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Clock, Info, Loader2Icon, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import toast from 'react-hot-toast';
import { InterviewDataContext } from '@/app/context/InterviewDataContext';
import { useRouter } from 'next/navigation';

function Interview() {

  const { interview_id } = useParams()
  // console.log(interview_id)
  const router = useRouter()

  const [interviewData, setInterviewData] = useState()
  const [userName, setUserName] = useState();
  const [userEmail,setUserEmail] = useState();
  const [loading, setLoading] = useState(false)
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext)

  const onJoinInterview = async () => {
    setLoading(true)
    let { data: Interview, error } = await supabase
      .from('Interview')
      .select('*')
      .eq('interview_id', interview_id)

      console.log(Interview[0])
      setInterviewInfo({
        userName : userName,
        userEmail : userEmail,
        interviewData:Interview[0]
      })
      router.push('/interview/'+interview_id+'/start')
      setLoading(false)
  }



  useEffect(() => {
    interview_id && GetInterviewDetail();
  }, [interview_id])

  const GetInterviewDetail = async () => {
    setLoading(true)
    try {

      let { data: Interview, error } = await supabase
        .from('Interview')
        .select("jobPosition,jobDescription,duration,type")
        .eq('interview_id', interview_id)

      setInterviewData(Interview[0])
      setLoading(false)

      if (Interview.length == 0) {
        toast.error("Incorrect InterviewLink")
      }
    }
    catch (e) {
      setLoading(false)
      toast.error("Incorrect Interview Link")

    }


  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className='px-10 md:px-28 lg:px-48 xl:px-64 w-full'>
          <div className='flex p-9 flex-col items-center justify-center border bg-white text-primary font-inter rounded-xl min-h-[500px] lg:px-33 xl:px-52 mt-16 mb-20'>
            <h1>PrepNow</h1>
            <h2 className='mt-3'>PrepNow - AI Powered Interview Platform</h2>
            <div className="flex justify-center items-center mt-8 w-full">
              <DotLottieReact
                src="https://lottie.host/ffdbd82a-ba3c-422d-ae09-7c602a610b63/fDDoGAKky4.lottie"
                loop
                autoplay
                speed={1.7}
                useFrameInterpolation={true}
                style={{ width: 400, height: 400 }}
              />
            </div>
            <h2 className='font-inter mt-5 font-bol text-xl'>{interviewData?.jobPosition}</h2>
            <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-[20px] width-[20px]' /> {interviewData?.duration}</h2>
            <div className='w-full mt-8'>
              <h2 className='text-black '>Enter your Name</h2>
              <Input placeholder="e.g Ayush" className={'mt-2 text-black'} onChange={(e) => setUserName(e.target.value)} />
            </div>

            <div className='w-full mt-8'>
              <h2 className='text-black '>Enter your Email</h2>
              <Input placeholder="e.g xyz@gmail.com" className={'mt-2 text-black'} onChange={(e) => setUserEmail(e.target.value)} />
            </div>


            <div className='p-6 w-full bg-blue-100 flex gap-4 rounded-lg mt-5'>
              <Info className='text-primary' />
              <div>
                <h2 className='font-bold font-inter text-black text-xl'>
                  Before you start
                </h2>
                <ul className='text-sm mt-2'>
                  <li>- Make sure that you have a good internet connection</li>
                  <li>- Find a Quiet place for interview</li>
                  <li>- Test your camera and microphone</li>
                </ul>
              </div>
            </div>
            <Button className='mt-5 w-full font-bold cursor-pointer'
              disabled={loading || !userName}
              onClick={() => (onJoinInterview())}
              
            >
              <Video/> {loading && <Loader2Icon/>} Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Interview