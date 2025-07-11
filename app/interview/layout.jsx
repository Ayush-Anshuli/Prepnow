"use client"

import React, { useState, useEffect } from 'react'
import InterviewHeader from './_components/InterviewHeader'
import { InterviewDataContext } from '../context/InterviewDataContext'

function InterviewLayout({children}) {
  // Initialize from localStorage if available
  const [interviewInfo, setInterviewInfoState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('interviewInfo');
      return stored ? JSON.parse(stored) : undefined;
    }
    return undefined;
  });

  // Wrap setInterviewInfo to also update localStorage
  const setInterviewInfo = (info) => {
    setInterviewInfoState(info);
    if (typeof window !== 'undefined') {
      if (info) {
        localStorage.setItem('interviewInfo', JSON.stringify(info));
      } else {
        localStorage.removeItem('interviewInfo');
      }
    }
  };

  // Keep localStorage in sync if interviewInfo changes (for direct updates)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (interviewInfo) {
        localStorage.setItem('interviewInfo', JSON.stringify(interviewInfo));
      } else {
        localStorage.removeItem('interviewInfo');
      }
    }
  }, [interviewInfo]);

  return (
    <InterviewDataContext.Provider value={{interviewInfo,setInterviewInfo}}>
      <div className='bg-secondary min-h-screen mb-20'>
        <InterviewHeader/>
        {children}
      </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout