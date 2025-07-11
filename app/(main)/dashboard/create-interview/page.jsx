"use client"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormContainer from "./_components/FormContainer"
import QuestionList from "./_components/QuestionList"
import toast from 'react-hot-toast'
import InterviewLink from "./_components/InterviewLink"


function CreateInterview() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState();
    const [interview_id, setInterviewId] = useState();
    
    const handleInputChange = (field,value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }

    console.log(formData);

    const onNextStep = () => {
        if (!formData?.jobPosition?.trim()) {
            toast.error("Please enter a job position");
            return;
        }
        if (!formData?.jobDescription?.trim()) {
            toast.error("Please enter a job description");
            return;
        }
        if (!formData?.interviewDuration) {
            toast.error("Please select interview duration");
            return;
        }
        if (!formData?.type || formData.type.length === 0) {
            toast.error("Please select at least 1 interview type");
            return;
        }
        
        // If all validations pass, show success and proceed
        toast.success("Form completed successfully! Generating questions...");
        setStep(step + 1);
    }


    const onCreateLink = (interview_id) => {
        setInterviewId(interview_id);
        setStep(step + 1);
    }




  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
        <div className='flex gap-2 items-center   mt-5'>
            <ArrowLeft onClick={()=>router.back()} className='cursor-pointer'/>
            <h2 className='font-inter font-bold text-2xl'>Create New Interview</h2>
        </div>
            <Progress value={step*33.33} className={"my-5"} />
            {step == 1 ? <FormContainer formData={formData} handleInputChange={handleInputChange} 
            nextStep={() => onNextStep()}/> 
            : step == 2 ? <QuestionList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/> : 
            step == 3 ? <InterviewLink  interview_id={interview_id} formData={formData}/> : null}
           
    </div>
  )
}

export default CreateInterview