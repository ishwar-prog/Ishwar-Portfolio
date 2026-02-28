import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Navbar from "../../components/Navbar";
import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";
import ishwar from "../../assets/ishwar.png";
import TiltedCard from "../../components/ui/TiltedCard";
import smartedImg from "../../assets/smarted.png";
import rotaractImg from "../../assets/rotaract.png";
import kcecellImg from "../../assets/kcecell.png";
import googleImg from "../../assets/google.png";

const experiences = [
  {
    role: "campus ambassador",
    org: "smarted innovations",
    desc: "campus ambassador for smarted , an ed-tech platform where i was responsible for promoting career-based opportunities,engaging students,and connecting peers to valuable learning and growth resources.",
    date: "nov 2025 - present",
    image: smartedImg
  },
  {
    role: "digital communication director",
    org: "rotaract club of kccmesr",
    desc: "as the digital communication director, i led tech events, digital workshops, and online engagement to connect students through technology, strengthening the club's digital presence and student participation.",
    date: "oct 2025- present",
    image: rotaractImg
  },
  {
    role: "member",
    org: "kccemsr entrepreneurship cell",
    desc: "actively participated in tech and entrepreneurship events and workshops, built projects, and contributed to redesigning the official kce-cell website to improve its digital presence.",
    date: "jul 2025 - present",
    image: kcecellImg
  },
  {
    role: "virtual internship",
    org: "google for developers",
    desc: "virtual internship in artificial intelligence and machine learning (aiml) at google for developers through aicte eduskills virtual internship",
    date: "jul 2025 - sep 2025",
    image: googleImg
  }
];

export default function AboutMe() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const imageContainerRef = useRef(null);
  
  // Create quickTo functions for smooth cursor tracking
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
     // Optional: Scroll to top on mount
     window.scrollTo(0, 0);
     
     // Initialize quickTo instances
     if (imageContainerRef.current) {
        xTo.current = gsap.quickTo(imageContainerRef.current, "x", { duration: 0.8, ease: "power3" });
        yTo.current = gsap.quickTo(imageContainerRef.current, "y", { duration: 0.8, ease: "power3" });
     }
  }, []);

  const handleMouseMove = (e) => {
    if (xTo.current && yTo.current && imageContainerRef.current) {
      // Adjust offset center image roughly based on its dimension 
      // width ~ 320px => offset -160
      // height ~ 400px => offset -200
      const imgWidth = 320;
      const imgHeight = 400;
      xTo.current(e.clientX - imgWidth / 2);
      yTo.current(e.clientY - imgHeight / 2);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, { scale: 0.5, opacity: 0, duration: 0.4, ease: "power3.in" });
    }
  };

  return (
    <main className="bg-[#1f1f1f] min-h-screen w-full overflow-hidden text-[#f6f4f0]">
      <Navbar />
      
      <section className="pt-32 pb-40 px-0 md:px-0 max-w-[92rem] mx-auto">
        
        {/* Header */}
        <h1 className="text-[20rem] leading-[0.5] font-extrabold mb-33 tracking-tighter flex justify-center text-center">
          about me
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Column: Text */}
          <div className="flex flex-col gap-8 max-w-[500px]">
            <p className="text-2xl leading-snug font-bold text-white/50 lowercase">
              i'm a full stack developer based in mumbai, india, specializing in building dynamic web apps and writing clean code.
            </p>
            
            <p className="text-2xl leading-snug font-bold text-white/50 lowercase">
              i'm currently in second year of computer engineering from kc college of engineering (thane), mumbai university with a deep interest in developement and agentic ai. i have build multiple projects which you can check.
            </p>
            
            <p className="text-2xl leading-snug font-bold text-white/50 lowercase">
              when i'm not behind a computer screen, i'm usually making videos, learning japanese and playing games.
            </p>
          </div>

          {/* Right Column: Image */}
          {/* Customization: Change 'justify-center' to 'justify-start' for left align, 'justify-end' for right align */}
          <div className="flex justify-center">
            <div className="w-full md:w-[540px] h-[580px]  rounded-[80px] relative flex items-center justify-center">
               <TiltedCard
                 imageSrc={ishwar}
                 altText="Ishwar Suthar"
                 captionText="ishwar suthar"
                 containerHeight="100%"
                 containerWidth="100%"
                 imageHeight="100%"
                 imageWidth="100%"
                 rotateAmplitude={22}
                 scaleOnHover={1.2}
                 showMobileWarning={false}
                 showTooltip={true}
                 displayOverlayContent={false}
               />
            </div>
          </div>

        </div>

      </section>

      {/* Hover Image Container */}
      <div 
        ref={imageContainerRef}
        className="fixed top-0 left-0 pointer-events-none z-50 overflow-hidden rounded-xl w-[320px] aspect-[4/5] opacity-0 scale-50 hidden md:block shadow-2xl"
      >
        <img 
          src={hoveredIndex !== null ? experiences[hoveredIndex].image : experiences[0].image} 
          className="w-full h-full object-cover bg-[#D3FD50]" 
          alt="Experience visual" 
        />
      </div>

      {/* Experience Section */}
      <section className="pb-30 px-0 md:px-0 max-w-[100rem] mx-auto w-full relative">
        <h2 className="text-[8rem] leading-[0.8] font-bold mb-16 tracking-tighter lowercase px-8">
          my experience
        </h2>
        
        <div 
          className="flex flex-col w-full border-t border-white/20"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              onMouseEnter={() => handleMouseEnter(index)}
              className="group grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1fr] gap-x-8 gap-y-4 py-12 px-8 border-b border-white/20 items-center transition-all duration-300 hover:bg-[#D3FD50] cursor-pointer"
            >
              
              <div className="flex flex-col gap-2 z-10">
                <h3 className="text-3xl md:text-4xl font-bold uppercase transition-colors duration-300 group-hover:text-black">{exp.role}</h3>
                <p className="text-xl text-white/50 uppercase transition-colors duration-300 group-hover:text-black/70">{exp.org}</p>
              </div>

              <div className="z-10">
                <p className="text-xl md:text-2xl text-white/70 leading-snug lowercase font-medium transition-colors duration-300 group-hover:text-black/80">
                  {exp.desc}
                </p>
              </div>

              <div className="flex md:justify-end z-10">
                <p className="text-2xl font-bold uppercase transition-colors duration-300 group-hover:text-black">{exp.date}</p>
              </div>

            </div>
          ))}
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
}
