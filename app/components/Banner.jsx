import React from 'react'

function Banner() {
  return (
    <section id="banner-section" className="w-full py-16 bg-transparent flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Streamline Your Hiring Process</h2>
        <p className="text-gray-500 text-lg md:text-xl">
          PrepNow helps you save time and find better candidates with our advanced AI interview technology.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center w-full max-w-5xl px-4">
        {/* Card 1 */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col items-center text-center min-w-[260px] max-w-xs">
          <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
          <h3 className="font-semibold text-lg mb-2">Save Time</h3>
          <p className="text-gray-500">Automate initial screening interviews and focus on final candidates.</p>
        </div>
        {/* Card 2 */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col items-center text-center min-w-[260px] max-w-xs">
          <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V9m3 8V5m3 12v-6"/></svg>
          <h3 className="font-semibold text-lg mb-2">Data-Driven Insights</h3>
          <p className="text-gray-500">Get detailed analytics and candidate comparisons based on interview responses.</p>
        </div>
        {/* Card 3 */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col items-center text-center min-w-[260px] max-w-xs">
          <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <h3 className="font-semibold text-lg mb-2">Reduce Bias</h3>
          <p className="text-gray-500">Standardized interviews help eliminate unconscious bias in the hiring process.</p>
        </div>
      </div>
    </section>
  )
}

export default Banner