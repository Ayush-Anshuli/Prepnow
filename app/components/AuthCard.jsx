"use client";

import React, { useState } from 'react';

function AuthCard() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
   <>

    <div style={{ width: '100%', maxWidth: 380, borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', color: '#fff' }}>
      {/* Logo */}
      <div style={{ width: '100%', textAlign: 'left' }}>
        <h1 style={{color:"black", fontSize:"1.2rem", fontFamily:"cursive",color:"#2563eb"}}>PrepNow </h1>
      </div>

      {/* <img src="/assets/Login-img.jpg" alt="Logo" style={{ width: 48, height: 48, borderRadius: 12, marginBottom: 8 }} /> */}
      {/* Heading */}
      <h2 style={{ fontWeight: 700, fontSize: '1.6rem', margin: 0, color: 'black' }}>Log in to your Account</h2>
      <p style={{ color: 'gray', fontSize: '1rem', margin: 0, textAlign: 'center' }}>Welcome back! Select method to log in:</p>
      {/* Social Buttons */}
      <div style={{ display: 'flex', gap: 12, width: '100%', marginTop: 8 }}>
        <button style={{ flex: 1, border: '1px solid #d3d3d3', borderRadius: 8, padding: '0.7rem 0',  fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', color: 'gray' }}>
          <span style={{ fontSize: 18 }}>🟦</span> Google
        </button>
        <button style={{ flex: 1, border: '1px solid #d3d3d3', borderRadius: 8, padding: '0.7rem 0',  fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', color: 'gray' }}>
          <span style={{ fontSize: 18 }}>🐙</span> GitHub
        </button>
      </div>
      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 8, margin: '1rem 0 0.5rem 0' }}>
        <div style={{ flex: 1, height: 1, background: '#334155' }} />
        <span style={{ color: '#64748b', fontSize: 14 }}>or continue with email</span>
        <div style={{ flex: 1, height: 1, background: '#334155' }} />
      </div>
      {/* Email Field */}
      <div style={{ width: '100%', position: 'relative', marginBottom: 8 }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#fff' }}>✉️</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', border: '0.5px solid #d3d3d3', borderRadius: 8, fontSize: 16, color: 'black', outline: 'none' }}
        />
      </div>
      {/* Password Field */}
      <div style={{ width: '100%', position: 'relative', marginBottom: 8 }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#fff' }}>🔒</span>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', border: '1px solid #d3d3d3', borderRadius: 8, fontSize: 16,  color: 'black', outline: 'none' }}
        />
      </div>
      {/* Log in Button */}
      <button style={{ width: '100%', background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, padding: '0.9rem 0', marginTop: 4, cursor: 'pointer' }}>
        Log in
      </button>
    </div>
   </>
  );
}

export default AuthCard; 