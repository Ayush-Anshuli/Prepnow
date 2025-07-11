"use client"
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { InterviewType, Level } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

function FormContainer({handleInputChange,nextStep}) {


    const [interviewType, setInterviewType] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState([]);
    
    useEffect(() => {
        if(interviewType) {
            handleInputChange("type",interviewType);
        }
    },[interviewType])

    useEffect(() => {
        if(selectedLevel) {
            handleInputChange("level",selectedLevel);
        }
    },[selectedLevel])


    const AddInterviewType = (type) => {
        const data = interviewType.some(item => item.title === type.title)
        if(!data) {
            setInterviewType((prev) => [...prev,type]);
        }
        else {
            const result = interviewType.filter((item) => item.title !== type.title);
            setInterviewType(result);
        }
    }

    const AddLevel = (level) => {
        const data = selectedLevel.some(item => item.title === level.title)
        if(!data) {
            setSelectedLevel((prev) => [...prev,level]);
        }
        else {
            const result = selectedLevel.filter((item) => item.title !== level.title);
            setSelectedLevel(result);
        }
    }

  return (
    <div className='p-5 bg-white rounded-lg font-inter font-medium'>
        <div className='my-5'>
            <h2 className='text-sm'>Job Position</h2>
            <Input placeholder='e.g. Software Engineer'
            className={'mt-2'}
            onChange = {(e) => handleInputChange("jobPosition",e.target.value)}
            />
        </div>

        <div className='my-5'>
            <h2 className='text-sm'>Job Description</h2>
            <Textarea className={"mt-2 h-[200px]"} placeholder='Enter Details of Job'
            onChange = {(e) => handleInputChange("jobDescription",e.target.value)}
            />
        </div>

        <div className='my-5'>
            <h2 className='text-sm'>Interview Duration</h2>

            <Select
            onValueChange = {(value) => handleInputChange("interviewDuration",value)}
            >
                <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="5 Min">5 Min</SelectItem>
                    <SelectItem value="15 Min">15 Min</SelectItem>
                    <SelectItem value="30 Min">30 Min</SelectItem>
                    <SelectItem value="45 Min">45 Min</SelectItem>
                    <SelectItem value="60 Min">60 Min</SelectItem>
                </SelectContent>
                </Select>

        </div>


        <div className='my-5 '>
            <h2 className='text-sm'>Experience Level</h2>
            <div className='flex gap-2 mt-2 flex-wrap  '>
                {Level.map((type,index) => (
                    <div key={index} className = {`
                        flex gap-2 px-2 cursor-pointer border border-gray-300 rounded-md items-center mt-2
                    hover:bg-blue-100 transition-colors duration-200
                    ${selectedLevel.some(item => item.title === type.title) 
                        ? 'bg-blue-100 text-blue-700 border-blue-300' 
                        : 'bg-white text-gray-700'
                    }
                        `}
                    onClick = {() => AddLevel(type)}
                    >
                        <type.icon className='w-4 h-4'/>
                        <p className='text-sm'>{type.title}</p>
                    </div>
                ))}
            </div>
        </div>

        



        <div className='my-5 '>
            <h2 className='text-sm'>Interview Type</h2>
            <div className='flex gap-2 mt-2 flex-wrap  '>
                {InterviewType.map((type,index) => (
                    <div key={index} className = {`
                        flex gap-2 px-2 cursor-pointer border border-gray-300 rounded-md items-center mt-2
                    hover:bg-blue-100 transition-colors duration-200
                    ${interviewType.some(item => item.title === type.title) 
                        ? 'bg-blue-100 text-blue-700 border-blue-300' 
                        : 'bg-white text-gray-700'
                    }
                        `}
                    onClick = {() => AddInterviewType(type)}
                    >
                        <type.icon className='w-4 h-4'/>
                        <p className='text-sm'>{type.title}</p>
                    </div>
                ))}
            </div>
        </div>

            <div className='mt-10 flex justify-end' onClick={() => nextStep()}>
            <Button>Generate Question <ArrowRight/></Button>
            </div>

    </div>
  )
}

export default FormContainer