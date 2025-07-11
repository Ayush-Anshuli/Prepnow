"use client"

import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import QuestionListContainer from './QuestionListContainer';
import { useUser } from '@/app/Provider';
import { supabase } from '@/services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';


function QuestionList({ formData ,onCreateLink}) {

    const [loading, setLoading] = useState(true);
    const [questionList, setQuestionList] = useState();
    const {user} = useUser();
    const [saveLoading, setSaveLoading] = useState(false);



    useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData])


    const GenerateQuestionList = async () => {

        setLoading(true);
        try {
            const result = await axios.post('/api/ai-model', {
                ...formData
            });
            console.log("Full API response:", result.data)

            // Get the content from the API response
            const content = result.data.message.content;
            console.log("Original content:", content);

            // Clean the content by removing markdown code blocks if present
            let cleanedContent = content;
            if (content.includes('```json')) {
                cleanedContent = content.replace('```json', '').replace('```', '').trim();
            } else if (content.includes('```')) {
                cleanedContent = content.replace(/```/g, '').trim();
            }

            console.log("Cleaned content:", cleanedContent);

            // Try to find the JSON part more carefully
            let jsonStart = cleanedContent.indexOf('{');
            let jsonEnd = cleanedContent.lastIndexOf('}');

            if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
                cleanedContent = cleanedContent.substring(jsonStart, jsonEnd + 1);
            }

            console.log("Final JSON to parse:", cleanedContent);

            // Parse the JSON
            const parsedContent = JSON.parse(cleanedContent);
            const parsedQuestions = parsedContent.interviewQuestions || parsedContent;
            setQuestionList(parsedQuestions);

            setLoading(false);
            toast.success("Question List Generated Successfully")
        } catch (error) {
            console.error("Error parsing questions:", error);
            console.error("Error message:", error.message);

            // Log the actual response if available
            if (error.response) {
                console.error("API Response:", error.response.data);
                console.error("Raw content:", error.response.data?.message?.content);
            } else {
                console.error("No response data available");
            }

            toast.error("Error parsing questions. Please try again.")
            setLoading(false);
        }

    }


    const onFinish = async () => {
        const interview_id = uuidv4();
        setSaveLoading(true);

        const interviewData = {
            type: formData.type?.map(t => t.title).join(', '), // Convert array to string
            level: formData.level?.map(l => l.title).join(', '), // Convert array to string
            jobPosition: formData.jobPosition,
            jobDescription: formData.jobDescription,
            duration: formData.interviewDuration, // Try 'duration' instead of 'interviewDuration'
            questions: questionList,
            userEmail: user?.email,
            interview_id: interview_id
        };

        console.log('Data being sent to Supabase:', interviewData);

        const { data, error } = await supabase
            .from('Interview')
            .insert([interviewData])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            toast.error('Failed to save interview: ' + error.message);
        } else {
            console.log('Successfully saved:', data);
            toast.success('Interview saved successfully!');
            setSaveLoading(false);
        }

        onCreateLink(interview_id)
    }




    return (
        <div>
            {loading && <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center'>
                <Loader2Icon className='animate-spin' />
                <div className='font-inter'>
                    <h2 className='font-medium '>Generating Interview Question</h2>
                    <p className='text-primary '>Our AI is generating interview questions based on your job description and job position</p>
                </div>
            </div>}

            {questionList?.length > 0 && (
                <div>
                    <QuestionListContainer questionList={questionList} />

                </div>
            )}

            <div className='flex justify-end mt-5 mb-5'>
                <Button 
                    className='cursor-pointer'
                    onClick={() => onFinish() } 
                    disabled={saveLoading || loading || !questionList || questionList.length === 0 } 
                >
                    {saveLoading ? <Loader2Icon className='animate-spin' /> : "Create Interview Link and Save"}
                </Button>
            </div>
        </div>
    )
}

export default QuestionList