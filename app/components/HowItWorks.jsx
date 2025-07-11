import React from 'react'

function HowItWorks() {
  return (
    <section id="howitworks-section" className="w-full py-16 bg-[#f8f9fa] mt-12 flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How PrepNow Works</h2>
        <p className="text-gray-500 text-lg md:text-xl">
          Three simple steps to transform your recruitment process
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start w-full max-w-5xl px-4">
        {/* Step 1 */}
        <div className="flex-1 flex flex-col items-center text-center min-w-[220px]">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="text-blue-600 font-bold text-2xl">1</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">Create Interview</h3>
          <p className="text-gray-500">Set up your job requirements and customize interview questions.</p>
        </div>
        {/* Step 2 */}
        <div className="flex-1 flex flex-col items-center text-center min-w-[220px]">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="text-blue-600 font-bold text-2xl">2</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">Share with Candidates</h3>
          <p className="text-gray-500">Send interview links to candidates to complete at their convenience.</p>
        </div>
        {/* Step 3 */}
        <div className="flex-1 flex flex-col items-center text-center min-w-[220px]">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="text-blue-600 font-bold text-2xl">3</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">Review Results</h3>
          <p className="text-gray-500">Get AI-analyzed results, transcripts, and candidate comparisons.</p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks 