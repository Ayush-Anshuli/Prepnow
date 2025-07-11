import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { ArrowLeft, Clock, CopyIcon, List, Mail, Plus } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

function InterviewLink({interview_id,formData}) {


    const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id;
    const GetInterviewURL = () => {
        return url;
    }

    const onCopyLink = async () => {
        await navigator.clipboard.writeText(url)
        toast.success("Link Copied")
    }

    // Handler to share via Email
    const handleShareEmail = () => {
        const subject = encodeURIComponent('AI Interview Invitation');
        const body = encodeURIComponent(`You are invited to an AI interview! Here is your interview link: ${url}`);
        window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    };

    // Handler to share via WhatsApp
    const handleShareWhatsApp = () => {
        const message = encodeURIComponent(`You are invited to an AI interview! Here is your interview link: ${url}`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
    };


  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <Image src="/assets/greencheck.png"
        height={200}
        width={200}
        alt='green check'
        className='h-[50px] w-[50px] mx-auto'
        />

        <h2 className='font-inter font-bold text-2xl mt-2'>Your AI Interview is ready!</h2>

        <p className='font-inter text-sm text-gray-500 mt-3'>
            Share this link with your candidate or prepare it by prepNow AI.
        </p>

        <div className='w-full mt-5 font-inter p-7 mt-6 rounded-xl border bg-white border-gray-200'>
            <div className='flex justify-between items-center'>
                <h2 className='font-inter font-bold '>Interview Link</h2>
                <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-md'>Valid for 30 days</h2>
        
            
            </div>

            <div className='mt-5 flex gap-5 items-center'>
                <Input defaultValue={GetInterviewURL()} disabled={true} />
                <Button className={"cursor-pointer"}  onClick = {() =>onCopyLink()}  ><CopyIcon/>Copy Link</Button>
            </div>

            <hr className='my-7'/>

            <div className='flex gap-5'>
                <h2 className='text-sm text-gray-500 flex items-center gap-2'><Clock className='w-4 h-4' />{formData?.duration}</h2>
                <h2 className='text-sm text-gray-500 flex items-center gap-2'><List className='w-4 h-4' />10 Questions</h2>
            </div>   

        </div>
        <div className='mt-7 bg-white p-5 rounded-lg w-full'>
            <h2 className='font-bold font-inter'>Share Via</h2>
            <div className='flex gap-7 mt-2'>
                <Button variant={'outline'} className={'cursor-pointer'} onClick={handleShareEmail}><Mail/>Email</Button>
                <Button variant={'outline'} className={'cursor-pointer'} onClick={handleShareWhatsApp}><FaWhatsapp className='w-4 h-4'/>Whatsapp</Button>
            </div>
        </div>

        <div className='flex w-full gap-5 justify-between mt-6'>
            <Link href={'/dashboard'}>
            <Button className={'cursor-pointer'} variant={'outline'}><ArrowLeft/>Back to Dashboard</Button>
            </Link>

            <Link href={'/dashboard/create-interview'}>
            <Button className={'cursor-pointer'}><Plus/>Create new Interview</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewLink