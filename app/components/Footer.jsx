import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-6 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        {/* Brand */}
        <div className="text-xl font-bold text-blue-600 font-inter">PrepNow</div>
        {/* Social Links */}
        <div className="flex gap-6 text-2xl">
          <a href="https://www.linkedin.com/in/ayush-anshuli-1a4b71246/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 transition-colors"><FaLinkedin /></a>
          <a href="https://www.instagram.com/__ay_u_sh_8/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition-colors"><FaInstagram /></a>
          <a href="https://github.com/Ayush-Anshuli" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-800 transition-colors"><FaGithub /></a>
          <a href="https://x.com/ayush_anshuli" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition-colors"><FaTwitter /></a>
        </div>
        {/* Copyright */}
        <div className="text-gray-500 text-sm font-inter">&copy; {new Date().getFullYear()} PrepNow. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;