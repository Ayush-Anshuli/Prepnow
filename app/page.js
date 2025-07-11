'use client';

import About from "./components/About";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import HerSection from "./components/HerSection";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
        <HerSection/>
        <Banner/>
        <HowItWorks/>
        <About/>
      <Footer/>
    </div>
  );
}
