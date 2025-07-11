import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

function HerSection() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center bg-[linear-gradient(to_bottom,_#eaf2fb_0%,_#ffffff_100%)] px-6 md:px-16 py-12">
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto min-h-[50vh]">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start max-w-xl w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 text-center md:text-left">
            AI-Powered <span className="text-blue-600">Interview Assistant</span> for Modern Recruiters
          </h1>
          <p className="text-gray-500 text-lg md:text-xl mb-8 text-center md:text-left">
            Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match. Save time, reduce bias, and improve your hiring process.
          </p>
        </div>
        {/* Right: Lottie Animation (no card background, larger size) */}
        <div className="flex-1 flex justify-center items-center w-full mt-12 md:mt-0">
          <div className="flex items-center justify-center" style={{ width: '32rem', height: '32rem', maxWidth: '100%' }}>
            <DotLottieReact
              src="https://lottie.host/14c1bcbc-ff21-4b06-b06c-fde5d26436aa/ZRL9f0edzq.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HerSection