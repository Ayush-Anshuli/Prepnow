"use client";

import { supabase } from '@/services/supabaseClient';
import React, { useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import toast from 'react-hot-toast';

function AuthCard() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) toast.error(`Google login failed: ${error.message}`);
  };

  const signInWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) toast.error(`GitHub login failed: ${error.message}`);
  };

  const signInWithMagicLink = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000",
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Check your email for the login link!');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 380,
        borderRadius: 16,
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.2rem',
        color: '#fff',
        fontFamily: 'inter',
      }}
    >
      <div style={{ textAlign: 'left', display: 'flex' }}>
        <h1
          style={{
            fontSize: 'clamp(1rem, 4vw, 1.2rem)',
            textAlign: 'center',
            color: '#2563eb',
            margin: 0,
            wordBreak: 'break-word',
          }}
        >
          PrepNow
        </h1>
      </div>

      <h2
        style={{
          fontWeight: 700,
          fontSize: 'clamp(1.1rem, 4vw, 1.6rem)',
          margin: 0,
          color: 'black',
          fontFamily: 'inter',
          textAlign: 'center',
          wordBreak: 'break-word',
        }}
      >
        Log in to your Account
      </h2>
      <p
        style={{
          color: 'gray',
          fontSize: '1rem',
          margin: 0,
          textAlign: 'center',
          fontFamily: 'inter',
        }}
      >
        Welcome back! Select method to log in:
      </p>

      {/* Social Buttons */}
      <div style={{ display: 'flex', gap: 12, width: '100%', marginTop: 8 }}>
        <button
          onClick={signInWithGoogle}
          style={{
            flex: 1,
            border: '1px solid #d3d3d3',
            borderRadius: 8,
            padding: '0.7rem 0',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            color: 'gray',
          }}
        >
          <FaGoogle style={{ fontSize: 18 }} /> Google
        </button>
        <button
          onClick={signInWithGithub}
          style={{
            flex: 1,
            border: '1px solid #d3d3d3',
            borderRadius: 8,
            padding: '0.7rem 0',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            color: 'gray',
          }}
        >
          <FaGithub style={{ fontSize: 18 }} /> GitHub
        </button>
      </div>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: 8,
          margin: '1rem 0 0.5rem 0',
        }}
      >
        <div style={{ flex: 1, height: 1, background: '#d3d3d3' }} />
        <span style={{ color: '#64748b', fontSize: 14 }}>
          or continue with email
        </span>
        <div style={{ flex: 1, height: 1, background: '#d3d3d3' }} />
      </div>

      {/* Email Field */}
      <div
        style={{ width: '100%', position: 'relative', marginBottom: 8 }}
      >
        <span
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 18,
            color: 'gray',
          }}
        >
          <MdEmail />
        </span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem 1rem 0.8rem 2.5rem',
            border: '0.5px solid #d3d3d3',
            borderRadius: 8,
            fontSize: 16,
            color: 'black',
            outline: 'none',
          }}
        />
      </div>

      {/* Magic Link Button */}
      <button
        onClick={signInWithMagicLink}
        disabled={loading || !email}
        style={{
          width: '100%',
          background: loading ? '#a5b4fc' : '#2563eb',
          color: '#fff',
          fontWeight: 700,
          fontSize: 16,
          border: 'none',
          borderRadius: 8,
          padding: '0.9rem 0',
          marginTop: 4,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: email ? 1 : 0.6,
        }}
      >
        {loading ? 'Sending link...' : 'Login'}
      </button>
    </div>
  );
}

export default AuthCard;
