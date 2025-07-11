import { Calendar, Clock } from 'lucide-react';
import React from 'react'
import moment from 'moment';

function InterviewDetailContainer({interviewDetail}) {
  if (interviewDetail === undefined) {
    return <div>Loading...</div>;
  }
  if (interviewDetail === null) {
    return <div>No interview found.</div>;
  }

  // Split questions for two-column layout
  let leftQuestions = [], rightQuestions = [];
  if (Array.isArray(interviewDetail?.questions)) {
    const half = Math.ceil(interviewDetail.questions.length / 2);
    leftQuestions = interviewDetail.questions.slice(0, half);
    rightQuestions = interviewDetail.questions.slice(half);
  }

  return (
    <div className='w-full px-2 sm:px-6 md:px-12 py-8 bg-white rounded-2xl mt-8 border border-gray-100'>
      <h2 className='text-2xl font-inter font-bold mb-8 tracking-tight text-primary'>{interviewDetail.jobPosition}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
        <div className='flex flex-col items-start'>
          <span className='text-xs text-gray-500 mb-1'>Duration</span>
          <span className='flex items-center gap-2 text-base font-semibold text-gray-700'><Clock className='w-5 h-5 text-primary'/> {interviewDetail?.duration}</span>
        </div>
        <div className='flex flex-col items-start'>
          <span className='text-xs text-gray-500 mb-1'>Created On</span>
          <span className='flex items-center gap-2 text-base font-semibold text-gray-700'><Calendar className='w-5 h-5 text-primary'/>{moment(interviewDetail?.created_at).format('MMM DD, yyyy')}</span>
        </div>
        <div className='flex flex-col items-start'>
          <span className='text-xs text-gray-500 mb-1'>Type</span>
          <span className='flex items-center gap-2 text-base font-semibold text-gray-700'><Clock className='w-5 h-5 text-primary'/> {interviewDetail?.type?.split(',')[0]}</span>
        </div>
      </div>
      <div className='mt-6'>
        <h3 className='text-lg font-semibold mb-2 text-gray-800'>Job Description</h3>
        <p className='font-inter text-sm leading-6'>{interviewDetail?.jobDescription}</p>
      </div>
      <div className='mt-6'>
        <h3 className='text-lg font-semibold mb-2 text-gray-800'>Interview Questions</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <ul className='font-inter text-sm leading-6 list-disc pl-5'>
            {leftQuestions.map((q, idx) => (
              <li key={idx}>{q.question}</li>
            ))}
          </ul>
          <ul className='font-inter text-sm leading-6 list-disc pl-5'>
            {rightQuestions.map((q, idx) => (
              <li key={idx + leftQuestions.length}>{q.question}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InterviewDetailContainer