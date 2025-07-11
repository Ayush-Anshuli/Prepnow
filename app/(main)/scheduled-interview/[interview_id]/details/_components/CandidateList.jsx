import { Button } from '@/components/ui/button';
import React from 'react'
import Feedback from './Feedback';

function CandidateList({ detail }) {
  const candidates = Array.isArray(detail) ? detail : [];

  // Helper to calculate average rating out of 10
  const getAverageRating = (feedback) => {
    if (!feedback) return null;
    let ratingObj;
    // If feedback is a string, parse it
    if (typeof feedback === 'string') {
      try {
        ratingObj = JSON.parse(feedback).rating;
      } catch {
        return null;
      }
    } else {
      ratingObj = feedback.rating;
    }
    if (!ratingObj) return null;
    const values = Object.values(ratingObj);
    if (!values.length) return null;
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return Math.round(avg * 10) / 10; // rounded to 1 decimal
  };

  return (
    <div className='mb-5'>
      <h2 className='text-lg font-inter font-bold mt-8 mb-4'>Candidates ({candidates?.length})</h2>
      <div className='space-y-4'>
        {candidates.map((candidate, index) => {
          const avgRating = getAverageRating(candidate.feedback);
          return (
            <div key={index} className='flex items-center justify-between bg-white shadow-sm border border-gray-200 rounded-xl p-4'>
              <div className='flex items-center gap-4'>
                <div className='flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold'>
                  {candidate.userName?.[0] || '?'}
                </div>
                <div className='flex flex-col'>
                  <span className='font-semibold text-base'>{candidate?.userName || 'Unknown'}</span>
                  {candidate?.userEmail && (
                    <span className='text-gray-500 text-sm'>{candidate.userEmail}</span>
                  )}
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <h2 className='text-green-500'>{avgRating !== null ? `${avgRating}/10` : 'N/A'}</h2>
                <Feedback candidate={candidate} avgRating={avgRating}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CandidateList