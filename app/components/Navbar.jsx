import React from 'react'
import Link from 'next/link'
import { useUser } from '@/app/Provider'
import { useRouter } from 'next/navigation'

function Navbar() {
  const { user } = useUser();
  const router = useRouter();

  const handleDashboardClick = (e) => {
    e.preventDefault();
    console.log('Dashboard button clicked. User:', user);
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  };

  // Smooth scroll to section by ID
  const handleScrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between font-inter">
      {/* Logo/Brand */}
      <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight hover:text-blue-800 transition-colors">
        PrepNow
      </Link>
      {/* Centered Nav Links */}
      <div className="flex-1 flex justify-center gap-8">
        <a href="#features" onClick={handleScrollTo('banner-section')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
        <a href="#howitworks" onClick={handleScrollTo('howitworks-section')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">How it works?</a>
        <a href="#about" onClick={handleScrollTo('about-section')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
      </div>
      {/* Right Side - Dashboard */}
      <button
        onClick={handleDashboardClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors"
        style={{ minWidth: 120 }}
      >
        Dashboard
      </button>
    </nav>
  )
}

export default Navbar