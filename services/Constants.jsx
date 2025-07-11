import { Calendar, Code2Icon, CodeIcon, icons, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SidebarOptions = [
    {
        name:"Dashboard",
        icon:LayoutDashboard,
        path:"/dashboard"
    },
    {
        name:"Scheduled Interview",
        icon:Calendar,
        path:"/scheduled-interview"
    },
    {
        name:"All Interview",
        icon:List,
        path:"/all-interview"
    },
    {
        name:"Premium",
        icon:WalletCards,
        path:"/premium"
    }
]


export const InterviewType = [
    {
        title:"Technical",
        icon:Code2Icon
    },
    {
        title:"Behavioral",
        icon:Code2Icon,
    },
    {
        title:"Coding",
        icon:CodeIcon
    },
    {
        title:"HR Round",
        icon:User2Icon
    },
    {
        title:"Managerial Interview",
        icon:User2Icon
    },
    {
        title:"Problem Solving",
        icon:Puzzle
    }
]


export const Level = [
    {
        title:"Entry Level",
        icon:Code2Icon
    },
    {
        title:"Mid Level",
        icon:Code2Icon
    },
    {
        title:"Senior Level",
        icon:Code2Icon
    },
    {
        title:"Expert Level",
        icon:Code2Icon
    },
    {
        title:"Internship",
        icon:Code2Icon
    },
    {
        title:"Fresher",
        icon:Code2Icon
    }
]


// AI Model Prompt

export const QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs,generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

your task:

Analyze the job description to identify key responsibilities,required skills,and expected experience.
Generate a list of interview questions depends on the interview duration and type.
Adjust the number and depth of questions to match a real-life {{type}} interview.

Format your response as a JSON object with array list of questions.

format:interviewQuestions: [
{
    "question":'',
    "type": "Technical/Behavioral/Coding/HR/Managerial/Problem Solving"
},
{
   ....
}]

The goal is to create a structured , relevant, and time-optimized interview plan for a {{jobTitle}} role

`



export const FEEDBACK_PROMPT = `

{{conversation}}
Depends on this Interview Conversation between assitant and user,  
Give me feedback for user interview. Give me rating out of 10 for technical Skills,  
Communication, Problem Solving, Experince. Also give me summery in 3 lines  
about the interview and one line to let me know whether is recommanded  
for hire or not with msg. Give me response in JSON format  
{  
  feedback:{  
    rating:{  
      techicalSkills:5,  
      communication:6,  
      problemSolving:4,  
      experince:7  
    },  
    summery:<in 3 Line>,  
    Recommendation:"",  
    RecommendationMsg:""  
  }  
}


`