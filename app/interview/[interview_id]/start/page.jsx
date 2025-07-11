"use client"
import { InterviewDataContext } from '@/app/context/InterviewDataContext'
import { Mic, Phone, Timer, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState, useRef } from 'react'
import Vapi from '@vapi-ai/web';
import AlertComponent from './_components/AlertComponent'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { supabase } from '@/services/supabaseClient'

function StartInterview() {

    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext)
    const [hasMounted, setHasMounted] = useState(false);
    const videoRef = useRef(null);
    const router = useRouter();
    const { interview_id } = useParams();
    const [isSilent, setIsSilent] = useState(false);
    const silenceTimeoutRef = useRef(null);
    const [showPreNotice, setShowPreNotice] = useState(true);
    const audioStreamRef = useRef(null); // Store audio stream for cleanup
    // Conversation state for chat display
    const [conversation, setConversation] = useState([]);
    // Persistent Vapi instance
    const vapiRef = useRef(null);
    const [feedback, setFeedback] = useState(null);
    
    // Timer state for countdown
    const [timeLeft, setTimeLeft] = useState(null);
    const timerIntervalRef = useRef(null);
    const [loadingRedirect, setLoadingRedirect] = useState(false);

    // Helper to parse duration (e.g., '30 min' or 30)
    function parseDuration(duration) {
      if (!duration) return 0;
      if (typeof duration === 'number') return duration;
      const match = duration.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    }

    // Start timer when interviewInfo is available
    useEffect(() => {
      if (interviewInfo?.interviewData?.duration) {
        const minutes = parseDuration(interviewInfo.interviewData.duration);
        setTimeLeft(minutes * 60); // seconds
      }
    }, [interviewInfo]);

    // Countdown effect
    useEffect(() => {
      if (timeLeft === null) return;
      if (timeLeft <= 0) {
        stopInterview();
        return;
      }
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timerIntervalRef.current);
    }, [timeLeft]);

    // Format seconds to HH:MM:SS
    function formatTime(secs) {
      const h = Math.floor(secs / 3600).toString().padStart(2, '0');
      const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
      const s = (secs % 60).toString().padStart(2, '0');
      return `${h}:${m}:${s}`;
    }


    useEffect(() => {
      setHasMounted(true);
    }, []);

    // const router = useRouter();

    useEffect(() => {
      // Initialize Vapi only once
      if (!vapiRef.current) {
        vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
      }
    }, []);

    const startCall = () => {
        // Build the question list as a string
        const questions = interviewInfo?.interviewData?.questions?.map(q => q?.question) || [];
        const questionList = questions.join(', ');

        // Defensive: Check required data
        if (!interviewInfo?.userName || !interviewInfo?.interviewData?.jobPosition || questions.length === 0) {
            toast.error('Interview data is incomplete. Cannot start the call.');
            return;
        }

        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: "Hi "+interviewInfo?.userName+", how are you? Ready for your interview on "+interviewInfo?.interviewData?.jobPosition+"?",
            transcriber: {
              provider: "deepgram",
              model: "nova-2",
              language: "en-US",
            },
            voice: {
              provider: "playht",
              voiceId: "jennifer", // Original female voice
            },
            model: {
              provider: "openai",
              model: "gpt-4",
              messages: [
                {
                  role: "system",
                  content: `
          You are an AI assistant conducting interviews.
          Your job is to ask candidates provided interview questions, assess their responses.
          Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
          "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"
          Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions one by one:
          
          Questions: ${questionList}
          If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
          Need a hint? Think about how React tracks component updates!
          Provide brief, encouraging feedback after each answer. Example:
          "Nice! That's a solid answer."
          "Not quite. Want to try again?"
          Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
          Smoothly wrap up the interview smoothly by summarizing their performance. Example:
          "That was great! You handled some tough questions well. Keep sharpening your skills!"
          End on a positive note:
          "Thanks for chatting! Hope to see you crushing projects soon!"
          
          Key Guidelines:
          ✅ Be friendly, engaging, and witty ✅ Keep responses short and natural, like a real conversation ✅ Adapt based on the candidate’s confidence level ✅ Ensure the interview remains focused on React
          `,
                },
              ],
            },
          };

        // Log the payload for debugging
        console.log('Vapi assistantOptions payload:', assistantOptions);

        try {
            vapiRef.current.start(assistantOptions);
        } catch (err) {
            toast.error('Failed to start interview call. Please check your data and try again.');
            console.error('Vapi start error:', err);
        }
    }

    useEffect(() => {
         interviewInfo && startCall()
    },[interviewInfo])

    useEffect(() => {
      if (!vapiRef.current) return;

      const handleCallEnded = () => {
        stopAllMediaTracks();
        toast.error('Interview session ended. Redirecting to interview page...');
        // setTimeout(() => {
        //   router.push('/interview/' + interview_id);
        // }, 2000);
      };

      const handleError = (err) => {
        stopAllMediaTracks();
        toast.error('Interview session ended. Redirecting to interview page...');
        // setTimeout(() => {
        //   router.push('/interview/' + interview_id);
        // }, 2000);
      };

      // Listen for Vapi transcript messages
      const handleMessage = (message) => {
        console.log('Vapi message event:', message); // Debug log
        if (message.type === 'transcript' && message.transcriptType === 'final') {
          setConversation(prev => [...prev, { role: message.role, text: message.transcript }]);
        }
      };

      vapiRef.current.on('call-ended', handleCallEnded);
      vapiRef.current.on('error', handleError);
      vapiRef.current.on('message', handleMessage);

      return () => {
        vapiRef.current.off('call-ended', handleCallEnded);
        vapiRef.current.off('error', handleError);
        vapiRef.current.off('message', handleMessage);
      };

      
    }, [router]);

    useEffect(() => {
      // Hide pre-interview notice after 5 seconds
      const timer = setTimeout(() => setShowPreNotice(false), 5000);
      return () => clearTimeout(timer);
    }, []);


    // Attach camera stream after mount and when videoRef is available
    useEffect(() => {
      if (hasMounted && videoRef.current) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            videoRef.current.srcObject = stream;
          })
          .catch((err) => {
            videoRef.current.poster = '';
            videoRef.current.style.background = '#222';
            videoRef.current.style.color = '#fff';
            videoRef.current.style.display = 'flex';
            videoRef.current.style.alignItems = 'center';
            videoRef.current.style.justifyContent = 'center';
            videoRef.current.innerHTML = 'Camera access denied';
          });
      }
    }, [hasMounted]);

    useEffect(() => {
      let audioContext, analyser, microphone, javascriptNode;

      const detectSilence = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          audioStreamRef.current = stream; // Store for cleanup
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;

          microphone.connect(analyser);
          analyser.connect(javascriptNode);
          javascriptNode.connect(audioContext.destination);

          javascriptNode.onaudioprocess = function () {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const values = array.reduce((a, b) => a + b, 0);
            const average = values / array.length;

            if (average < 5) { // Silence threshold
              if (!silenceTimeoutRef.current) {
                silenceTimeoutRef.current = setTimeout(() => {
                  setIsSilent(true);
                }, 8000); // 8 seconds of silence
              }
            } else {
              setIsSilent(false);
              clearTimeout(silenceTimeoutRef.current);
              silenceTimeoutRef.current = null;
            }
          };
        } catch (err) {
          // Optionally handle error
        }
      };

      detectSilence();


      return () => {
        if (audioContext) audioContext.close();
        if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        // Stop audio stream on unmount
        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach(track => track.stop());
          audioStreamRef.current = null;
        }
      };
    }, []);

    // Utility to stop all media tracks
    function stopAllMediaTracks() {
      // Stop video stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        if (stream && stream.getTracks) {
          stream.getTracks().forEach(track => track.stop());
        }
        videoRef.current.srcObject = null;
      }
      // Stop silence detection audio stream
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
        audioStreamRef.current = null;
      }
    }

    // Place GenerateFeedback before stopInterview so it is defined before use
    const GenerateFeedback = async () => {
      setLoadingRedirect(true);
      console.log('GenerateFeedback called. Conversation:', conversation);
      try {
        const result = await axios.post('/api/ai-feedback', {
          conversation: conversation
        });
        console.log('Feedback API response:', result?.data);
        const Content = result.data?.content;
        if (typeof Content === 'string' && Content.trim().length > 0) {
          let cleaned = Content;
          const jsonMatch = cleaned.match(/{[\s\S]*}/);
          if (jsonMatch) {
            cleaned = jsonMatch[0];
            try {
              let parsed = JSON.parse(cleaned);
              if (parsed.feedback) parsed = parsed.feedback;
              console.log('Parsed feedback object:', parsed);

              // Save to Supabase
              const { data, error } = await supabase
                .from('interview-feedback')
                .insert([
                  {
                    userName: interviewInfo?.userName,
                    userEmail: interviewInfo?.userEmail,
                    interview_id: interview_id,
                    feedback: parsed,
                    recommended: false
                  }
                ])
                .select();

              if (error) {
                console.error('Supabase insert error:', error);
              } else {
                console.log('Feedback saved to Supabase:', data);
                setLoadingRedirect(false);
                router.push(`/interview/${interview_id}/completed`);
              }
            } catch (e) {
              console.error('Failed to parse feedback JSON:', e, cleaned);
            }
          } else {
            console.error('No valid JSON found in feedback content:', cleaned);
          }
        } else {
          console.error('No feedback content string received from API:', Content);
        }
      } catch (error) {
        console.error('Feedback API error:', error);
        setFeedback({ error: 'Could not generate feedback.' });
      }


    }

    const stopInterview = () => {
      // Stop the timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      toast.success('Interview ended by user. Redirecting to interview page...');
      if (vapiRef.current && typeof vapiRef.current.stop === 'function') vapiRef.current.stop();
      if (vapiRef.current && typeof vapiRef.current.destroy === 'function') vapiRef.current.destroy();
      stopAllMediaTracks();
      GenerateFeedback();
      // setTimeout(() => {
      //   router.push('/interview/' + interview_id);
      // }, 2000);
    }

    if (!hasMounted) {
      // Optionally, render a loading spinner or skeleton here
      return null;
    }

    if (loadingRedirect) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2Icon className="animate-spin w-16 h-16 text-blue-500 mb-4" />
          <div className="text-lg font-bold text-blue-700">Generating feedback and redirecting...</div>
        </div>
      );
    }
















  return (
    <div className='p-4 sm:p-8 md:p-16 lg:px-32 xl:px-12 max-w-6xl mx-auto'>
      {/* Conversation chat UI */}
      <div className='bg-white rounded-lg shadow p-4 mb-6 max-h-72 overflow-y-auto border border-gray-200'>
        <h3 className='font-bold mb-2 text-blue-700'>Live Conversation</h3>
        {conversation.length === 0 && <div className='text-gray-400 text-sm'>No conversation yet.</div>}
        <ul className='space-y-2'>
          {conversation.map((msg, idx) => (
            <li key={idx} className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
              <div className={`px-3 py-2 rounded-lg max-w-[70%] text-sm font-inter ${msg.role === 'assistant' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'}`}>
                <span className='block font-semibold'>{msg.role === 'assistant' ? 'AI' : 'You'}</span>
                <span>{msg.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Feedback UI */}
      {/* (Feedback UI removed) */}
      {showPreNotice && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4 text-center font-semibold">
          Please keep speaking during the interview. If you are silent for too long, the session will end automatically.
        </div>
      )}
        <h2 className='font-bold font-inter text-lg sm:text-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>AI Interview Session
        <span className='flex gap-2 items-center text-base sm:text-lg'>
            <Timer/>
            {timeLeft !== null ? formatTime(timeLeft) : '00:00:00'}
        </span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 xl:gap-20 2xl:gap-32 mt-8'> 
            <div className='mt-4 md:mt-8 w-full h-full'>
                <Image 
                    src={'/assets/Female.jpg'}
                    height={600}
                    width={900}
                    alt={'AI'}
                    className='w-full aspect-[4/3] max-w-xl rounded-lg shadow-md object-cover'
                />
                <h2 className='mt-4 text-lg sm:text-2xl font-bold text-blue-600 drop-shadow-sm text-center break-words max-w-full'>PrepNow - AI Interviewer</h2>
            </div>
            <div className='mt-4 md:mt-8 flex flex-col w-full h-full'>
                {/* Camera feed for user image */}
                <video
                  ref={videoRef}
                  id="user-webcam"
                  autoPlay
                  playsInline
                  className='w-full aspect-[4/3] max-w-xl rounded-lg shadow-md object-cover'
                  style={{ background: '#000', objectFit: 'cover' }}
                />

                <h2 className='mt-4 text-lg sm:text-2xl font-bold text-blue-600 drop-shadow-sm text-center break-words max-w-full'>{interviewInfo?.userName}</h2>
            </div>

        </div>

        <div className='flex items-center gap-5 justify-center mt-5'>
            <Mic className='h-12 w-12 p-3 bg-gray-300 rounded-full cursor-pointer'/>
            <AlertComponent stopInterview = {() => stopInterview()} >
                <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer' />
            </AlertComponent>
        </div>

    </div>
  )
}

export default StartInterview