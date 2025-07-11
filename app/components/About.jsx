import React from 'react'

const companiesLeft = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple', 'Adobe', 'Salesforce', 'Uber', 'Airbnb'
];
const companiesRight = [
  'Stripe', 'Shopify', 'Twitter', 'LinkedIn', 'Spotify', 'Oracle', 'Intel', 'IBM', 'Zoom', 'Slack'
];

const testimonials = [
  {
    name: 'Priya Sharma',
    company: 'Google',
    review: 'PrepNow made my interview preparation seamless and effective. The AI feedback was spot on!'
  },
  {
    name: 'Rahul Verma',
    company: 'Amazon',
    review: 'I loved the real-time insights and the variety of questions. Highly recommended for job seekers.'
  },
  {
    name: 'Aisha Khan',
    company: 'Meta',
    review: 'Our hiring process is faster and more objective with PrepNow. Great tool for recruiters!'
  },
  {
    name: 'Siddharth Patel',
    company: 'Microsoft',
    review: 'The continuous improvement tracking helped me land my dream job. Thank you, PrepNow!'
  }
];

function About() {
  return (
    <section id="about-section" className="w-full py-16 bg-white flex flex-col items-center justify-center">
      {/* About Description */}
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About PrepNow</h2>
        <p className="text-gray-600 text-lg md:text-xl">
          PrepNow is an advanced AI-powered interview preparation platform designed to help candidates and recruiters achieve success. Our mission is to make interview practice accessible, insightful, and effective for everyone. With real-time feedback, data-driven insights, and a seamless experience, PrepNow empowers users to ace their interviews and make smarter hiring decisions.
        </p>
      </div>
      {/* Company Marquee - Modern Continuous Animation */}
      <div className="w-full max-w-5xl mb-8">
        {/* Left to Right */}
        <div className="overflow-hidden relative h-16">
          <div className="flex items-center h-full animate-marquee whitespace-nowrap space-x-12 text-xl font-semibold text-blue-700" style={{ animation: 'marquee 18s linear infinite' }}>
            {[...companiesLeft, ...companiesLeft].map((company, idx) => (
              <span key={company + idx}>{company}</span>
            ))}
          </div>
        </div>
        {/* Right to Left */}
        <div className="overflow-hidden relative h-16 mt-2">
          <div className="flex items-center h-full animate-marquee-reverse whitespace-nowrap space-x-12 text-xl font-semibold text-blue-500" style={{ animation: 'marquee-reverse 18s linear infinite' }}>
            {[...companiesRight, ...companiesRight].map((company, idx) => (
              <span key={company + idx}>{company}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="w-full max-w-5xl mt-12">
        <h3 className="text-2xl font-bold text-center mb-8">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-start">
              <p className="text-gray-700 mb-4">“{t.review}”</p>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 mr-3">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Marquee Keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}

export default About