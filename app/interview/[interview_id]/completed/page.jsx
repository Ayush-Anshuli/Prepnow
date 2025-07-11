'use client';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '32px 8px' }}>
      <div style={{ width: 180, height: 180, marginBottom: 16 }}>
        <DotLottieReact
          src="https://lottie.host/f1effcdf-d294-4a50-ae3c-14b208f97d24/cKoIX69SK5.lottie"
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <h1 style={{
        fontSize: '2.2rem',
        fontWeight: 800,
        color: '#22c55e',
        marginBottom: 8,
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
      }}>
        Interview Completed!
      </h1>
      <p style={{
        fontSize: '1.1rem',
        color: '#334155',
        marginBottom: 32,
        textAlign: 'center',
        maxWidth: 500,
      }}>
        Congratulations on finishing your interview! Review your feedback and keep practicing to master your next opportunity.
      </p>
      <hr style={{ width: '100%', maxWidth: 700, border: 'none', borderTop: '2px solid #e5e7eb', margin: '32px 0 24px 0' }} />
      <h2 style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.5rem', marginBottom: 24, textAlign: 'center', letterSpacing: '1px' }}>What our users say</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', marginBottom: 40 }}>
        <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(37,99,235,0.10)', padding: 32, maxWidth: 320, minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1.5px solid #e0e7ff' }}>
          <p style={{ fontStyle: 'italic', color: '#475569', marginBottom: 12, fontSize: '1.05rem', textAlign: 'center' }}>
            "PrepNow made my interview prep so much easier! The AI questions felt just like the real thing."
          </p>
          <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '1rem' }}>— Priya S., Software Engineer</span>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(37,99,235,0.10)', padding: 32, maxWidth: 320, minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1.5px solid #e0e7ff' }}>
          <p style={{ fontStyle: 'italic', color: '#475569', marginBottom: 12, fontSize: '1.05rem', textAlign: 'center' }}>
            "I loved the instant feedback and the variety of questions. Highly recommend PrepNow!"
          </p>
          <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '1rem' }}>— Rahul M., Data Analyst</span>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px rgba(37,99,235,0.10)', padding: 32, maxWidth: 320, minWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1.5px solid #e0e7ff' }}>
          <p style={{ fontStyle: 'italic', color: '#475569', marginBottom: 12, fontSize: '1.05rem', textAlign: 'center' }}>
            "The best part was how real the interviews felt. PrepNow is a game changer!"
          </p>
          <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '1rem' }}>— Anjali T., Product Manager</span>
        </div>
      </div>
    </div>
  );
}

export default page;