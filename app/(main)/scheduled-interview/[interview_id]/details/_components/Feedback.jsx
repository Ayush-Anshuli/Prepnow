import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

function Feedback({candidate, avgRating, loading = false}) {
  // Parse feedback JSON
  let feedbackObj = null;
  try {
    feedbackObj = typeof candidate.feedback === 'string' ? JSON.parse(candidate.feedback) : candidate.feedback;
  } catch {
    feedbackObj = null;
  }
  const technicalSkills = feedbackObj?.rating?.technicalSkills ?? null;
  const summary = feedbackObj?.summery ?? null;
  const recommendation = feedbackObj?.Recommendation ?? null;
  const recommendationMsg = feedbackObj?.RecommendationMsg ?? null;
  const communication = feedbackObj?.rating?.communication ?? null;
  const problemSolving = feedbackObj?.rating?.problemSolving ?? null;
  const experience = feedbackObj?.rating?.experince ?? feedbackObj?.rating?.experience ?? null;

  console.log('Technical Skills:', technicalSkills);

  if (loading) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'} className={'text-primary'}>View Report</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col gap-6 mt-2">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className='w-12 h-12 rounded-full' />
                    <div className='flex flex-col'>
                      <Skeleton className='w-32 h-6 mb-1' />
                    </div>
                  </div>
                  <div className='flex flex-col items-end'>
                    <Skeleton className='w-10 h-8 mb-1' />
                    <Skeleton className='w-6 h-3' />
                  </div>
                </div>
                {/* Skills Assessment Skeleton */}
                <div>
                  <Skeleton className='w-32 h-5 mb-2' />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className='w-28 h-5' />
                        <Skeleton className='flex-1 h-3' />
                        <Skeleton className='w-10 h-4' />
                      </div>
                      <div className="flex items-center gap-3">
                        <Skeleton className='w-28 h-5' />
                        <Skeleton className='flex-1 h-3' />
                        <Skeleton className='w-10 h-4' />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className='w-28 h-5' />
                        <Skeleton className='flex-1 h-3' />
                        <Skeleton className='w-10 h-4' />
                      </div>
                      <div className="flex items-center gap-3">
                        <Skeleton className='w-28 h-5' />
                        <Skeleton className='flex-1 h-3' />
                        <Skeleton className='w-10 h-4' />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Performance Summary Skeleton */}
                <div>
                  <Skeleton className='w-40 h-5 mb-2' />
                  <Skeleton className='w-full h-16' />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className={'text-primary'}>View Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-6 mt-2">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className='flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold'>
                    {candidate.userName?.[0] || '?'}
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-lg'>{candidate?.userName || 'Unknown'}</span>
                  </div>
                </div>
                <div className='flex flex-col items-end'>
                  <span className='text-2xl font-bold text-blue-700'>{avgRating !== null ? avgRating : 'N/A'}</span>
                  <span className='text-xs text-gray-500'>/10</span>
                </div>
              </div>
              {/* Skills Assessment */}
              <div>
                <span className="font-semibold text-base mb-2 block">Skills Assessment</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {/* Left column */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-medium min-w-[120px]">Technical Skills</span>
                      <Progress value={technicalSkills * 10} className="flex-1" />
                      <span className="text-sm text-gray-500 min-w-[40px] text-right">{technicalSkills !== null ? `${technicalSkills}/10` : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium min-w-[120px]">Problem Solving</span>
                      <Progress value={problemSolving * 10} className="flex-1" />
                      <span className="text-sm text-gray-500 min-w-[40px] text-right">{problemSolving !== null ? `${problemSolving}/10` : 'N/A'}</span>
                    </div>
                  </div>
                  {/* Right column */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-medium min-w-[120px]">Communication</span>
                      <Progress value={communication * 10} className="flex-1" />
                      <span className="text-sm text-gray-500 min-w-[40px] text-right">{communication !== null ? `${communication}/10` : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium min-w-[120px]">Experience</span>
                      <Progress value={experience * 10} className="flex-1" />
                      <span className="text-sm text-gray-500 min-w-[40px] text-right">{experience !== null ? `${experience}/10` : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Performance Summary */}
              {summary && (
                <div>
                  <span className="font-semibold text-base mb-1 block">Performance Summary</span>
                  <p className="text-gray-700 text-sm mt-1">{summary}</p>
                </div>
              )}
              {/* Recommendation */}
              {recommendation && (
                <div>
                  <span className="font-semibold">Recommendation:</span>
                  <p className="text-gray-700 text-sm mt-1">{recommendation}</p>
                </div>
              )}
              {recommendationMsg && (
                <div>
                  <span className="font-semibold">Recommendation Message:</span>
                  <p className="text-gray-700 text-sm mt-1">{recommendationMsg}</p>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Feedback

