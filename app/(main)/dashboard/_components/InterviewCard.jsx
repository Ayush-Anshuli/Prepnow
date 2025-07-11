import { Button } from '@/components/ui/button'
import { Copy, Send, Trash, MoreHorizontal, ArrowRight } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';
import { supabase } from '@/services/supabaseClient'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import Link from 'next/link';

function InterviewCard({interview, onDelete,viewDetail = false}) {

    const CopyLink =() => {
        const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id
        navigator.clipboard.writeText(url);
        toast.success("Link Copied")
    }

    const onSend = () => {
        const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id;
        const subject = encodeURIComponent('Check out this interview!');
        const body = encodeURIComponent(`Hi,\n\nHere's an interview link: ${url}\n\nBest regards.`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }

    const handleDelete = async () => {
        if (!interview?.interview_id) return;
        console.log('Attempting to delete interview_id:', interview?.interview_id);
        // First, delete all related feedback
        const feedbackDelete = await supabase
            .from('interview-feedback')
            .delete()
            .eq('interview_id', interview.interview_id);
        if (feedbackDelete.error) {
            console.log('Feedback delete error:', feedbackDelete.error.message);
            toast.error('Failed to delete interview feedback');
            return;
        }
        // Then, delete the interview
        const { error } = await supabase
            .from('Interview')
            .delete()
            .eq('interview_id', interview.interview_id);
        if (error) {
            console.log('Delete error:', error.message);
            toast.error('Failed to delete interview');
        } else {
            toast.success('Interview deleted');
            if (onDelete) onDelete(interview.interview_id);
        }
    }


  return (
    <div className='p-5 bg-white rounded-lg border'>
        <div className='flex items-center justify-between'>
            <h2 className='font-inter font-bold text-lg'>{interview?.jobPosition}</h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className='text-gray-600 hover:bg-gray-100 rounded-full p-1'>
                  <MoreHorizontal size={20} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the interview.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Yes, delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
            <h2 className='text-sm flex justify-between font-inter text-gray-500 mt-2'>{interview?.duration}

              <span className='text-sm text-green-500'>{interview['interview-feedback']?.length} Candidates</span>
            </h2>

{
  !viewDetail? 
            <div className='flex gap-3 w-full mt-5'>
                <Button className={'w-[50%]'} variant={'outline'} onClick = {() => CopyLink()} > <Copy/> Copy Link</Button>
                <Button className={'w-[50%]'} onClick={onSend}> <Send/> Send</Button>
            </div>
            :
            <Link href={'/scheduled-interview/'+interview?.interview_id+'/details'}>
            <Button className={'mt-5 w-full'} variant={'outline'}>View Details <ArrowRight/></Button>
            </Link>
}
    </div>
  )
}

export default InterviewCard     