'use client';
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ width: 280, height: 280 }}>
        <DotLottieReact
          src="https://lottie.host/6578200f-4b0c-4f46-8159-175b0a299471/otUwswVTHO.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <h1 style={{
        marginTop: 24,
        fontSize: '2.5rem',
        fontWeight: 800,
        letterSpacing: '2px',
        color: '#2563eb',
        fontFamily: 'Inter, sans-serif',
        textShadow: '0 2px 16px rgba(37,99,235,0.15)',
        textAlign: 'center',
      }}>
        Coming Soon
      </h1>
    </div>
  )
}

export default page