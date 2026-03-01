import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Navbar from "../../components/Navbar";
import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";
import ishwar from "../../assets/ishwar.png";
import TiltedCard from "../../components/ui/TiltedCard";
import ScrollVelocityText from "../../components/ui/ScrollVelocityText";
import { TextSpotlight } from "../../components/ui/TextSpotlight";
import smartedImg from "../../assets/smarted.png";
import rotaractImg from "../../assets/rotaract.png";
import kcecellImg from "../../assets/ecelllogo.jpg";
import googleImg from "../../assets/google.svg";

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
  
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
     window.scrollTo(0, 0);
     if (imageContainerRef.current) {
        xTo.current = gsap.quickTo(imageContainerRef.current, "x", { duration: 0.8, ease: "power3" });
        yTo.current = gsap.quickTo(imageContainerRef.current, "y", { duration: 0.8, ease: "power3" });
     }
  }, []);

  const handleMouseMove = (e) => {
    if (xTo.current && yTo.current && imageContainerRef.current) {
      const imgWidth = 250;
      const imgHeight = 250;
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
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, { scale: 0.5, opacity: 0, duration: 0.4, ease: "power3.in" });
    }
  };

  return (
    <main className="bg-[#1f1f1f] min-h-screen w-full overflow-hidden text-[#f6f4f0]">
      <Navbar />
      
      <section className="pt-32 pb-40 px-0 md:px-0 mx-auto overflow-hidden">
        
        {/* Header - Loop Text Animation */}
        <div className="mb-33 -ml-4 -mr-4 flex flex-col gap-4 origin-center rotate-[-2deg] scale-[1.05]">
          <ScrollVelocityText 
            baseVelocity={-2} 
            className="text-[10rem] md:text-[20rem] leading-[0.8] font-extrabold tracking-tighter lowercase flex items-center"
          >
            about me • about me • 
          </ScrollVelocityText>
          <ScrollVelocityText 
            baseVelocity={2} 
            className="text-[10rem] md:text-[20rem] leading-[0.8] font-extrabold tracking-tighter lowercase flex items-center text-transparent"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}
          >
            <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>about me • about me • </span>
          </ScrollVelocityText>
        </div>

        <div className="max-w-[92rem] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Column: Text */}
          <div className="flex flex-col gap-8 max-w-[600px]">
            <TextSpotlight
              text="i'm a full stack developer based in mumbai, india, specializing in building dynamic web apps and writing clean code."
              textClassName="text-2xl leading-snug font-bold lowercase"
              animateOnPhone={true}
            />
            
            <TextSpotlight
              text="i'm currently in second year of computer engineering from kc college of engineering (thane), mumbai university with a deep interest in developement and agentic ai. i have build multiple projects which you can check."
              textClassName="text-2xl leading-snug font-bold lowercase"
              animateOnPhone={true}
            />
            
            <TextSpotlight
              text="when i'm not behind a computer screen, i'm usually making videos, learning japanese, making music and playing games."
              textClassName="text-2xl leading-snug font-bold lowercase"
              animateOnPhone={true}
            />
          </div>

          {/* Right Column: Image */}
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
        className="fixed top-0 left-0 pointer-events-none z-50 overflow-visible w-[250px] aspect-[1/1] opacity-0 scale-50 hidden md:block"
      >
        <img 
          src={hoveredIndex !== null ? experiences[hoveredIndex].image : experiences[0].image} 
          className="w-full h-full object-contain drop-shadow-2xl" 
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
