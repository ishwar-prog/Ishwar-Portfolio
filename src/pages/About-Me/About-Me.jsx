import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar";
import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";
import ishwar from "../../assets/ishwar.png";
import TiltedCard from "../../components/ui/TiltedCard";
import ScrollVelocityText from "../../components/ui/ScrollVelocityText";
import smartedImg from "../../assets/smarted.png";
import rotaractImg from "../../assets/rotaract.png";
import kcecellImg from "../../assets/ecelllogo.jpg";
import googleImg from "../../assets/google.svg";

gsap.registerPlugin(ScrollTrigger);

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

const ScrollRevealText = ({ text, className }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.scroll-word');
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { color: "rgba(255, 255, 255, 0.2)" }, // greyish color
        {
          color: "#ffffff", // white
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 50%",
            scrub: true,
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="scroll-word inline-block mr-[0.25em]" style={{ color: "rgba(255, 255, 255, 0.2)" }}>
          {word}
        </span>
      ))}
    </p>
  );
};

export default function AboutMe() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tappedIndex, setTappedIndex] = useState(null);
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

  const handleTap = (index) => {
    setTappedIndex(tappedIndex === index ? null : index);
  };

  return (
    <main className="bg-[#1f1f1f] min-h-screen w-full overflow-hidden text-[#f6f4f0]">
      <Navbar />
      
      <section className="pt-20 md:pt-24 lg:pt-32 pb-10 md:pb-16 lg:pb-40 px-0 mx-auto overflow-hidden">
        
        {/* Header - Loop Text Animation */}
        <div className="mb-16 md:mb-33 -ml-4 -mr-4 flex flex-col gap-2 md:gap-4 origin-center rotate-[-2deg] scale-[1.05]">
          <ScrollVelocityText 
            baseVelocity={-2} 
            className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[20rem] leading-[0.8] font-extrabold tracking-tighter lowercase flex items-center"
          >
            about me • about me • 
          </ScrollVelocityText>
          <ScrollVelocityText 
            baseVelocity={2} 
            className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[20rem] leading-[0.8] font-extrabold tracking-tighter lowercase flex items-center text-transparent"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}
          >
            <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>about me • about me • </span>
          </ScrollVelocityText>
        </div>

        {/* Mobile: image first, text below. Desktop: side by side */}
        <div className="max-w-[92rem] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Image - shown first on mobile via order */}
          <div className="flex justify-center order-first md:order-last">
            <div className="w-full max-w-[400px] md:max-w-none md:w-[540px] h-[400px] sm:h-[480px] md:h-[580px] rounded-[40px] md:rounded-[80px] relative flex items-center justify-center">
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

          {/* Text Column - shown second on mobile */}
          <div className="flex flex-col gap-6 md:gap-8 max-w-[600px] order-last md:order-first">
            <ScrollRevealText
              text="i'm a full stack developer based in mumbai, india, specializing in building dynamic web apps and writing clean code."
              className="text-lg sm:text-xl md:text-2xl leading-snug font-bold lowercase flex flex-wrap"
            />
            
            <ScrollRevealText
              text="i'm currently in second year of computer engineering from kc college of engineering (thane), mumbai university with a deep interest in developement and agentic ai. i have build multiple projects which you can check."
              className="text-lg sm:text-xl md:text-2xl leading-snug font-bold lowercase flex flex-wrap"
            />
            
            <ScrollRevealText
              text="when i'm not behind a computer screen, i'm usually making videos, learning japanese, making music and playing games."
              className="text-lg sm:text-xl md:text-2xl leading-snug font-bold lowercase flex flex-wrap"
            />
          </div>
        </div>

      </section>

      {/* Hover Image Container - desktop only */}
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
      <section className="pb-10 md:pb-14 lg:pb-30 px-0 max-w-[100rem] mx-auto w-full relative">
        <h2 className="text-[3rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] leading-[0.8] font-bold mb-8 md:mb-12 lg:mb-16 tracking-tighter lowercase px-4 md:px-8">
          my experience
        </h2>
        
        <div 
          className="flex flex-col w-full border-t border-white/20 rounded-4xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleTap(index)}
              className={`group grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1fr] gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-4 py-6 md:py-8 lg:py-12 px-4 md:px-8 border-b border-white/20 items-start md:items-center transition-all duration-300 cursor-pointer  ${
                tappedIndex === index ? "bg-[#D3FD50] lg:bg-transparent" : ""
              } lg:hover:bg-[#D3FD50] rounded-4xl`}
            >
              {/* Mobile: show experience image when tapped */}
              {tappedIndex === index && (
                <div className="md:hidden w-full flex justify-center mb-3">
                  <img 
                    src={exp.image} 
                    alt={exp.org}
                    className="w-24 h-24 object-contain rounded-4xl"
                  />
                </div>
              )}
              
              <div className="flex flex-col gap-1 md:gap-2 z-10">
                <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase transition-colors duration-300 ${tappedIndex === index ? "text-black lg:text-white" : "text-white"} lg:group-hover:text-black`}>{exp.role}</h3>
                <p className={`text-sm sm:text-base md:text-xl uppercase transition-colors duration-300 ${tappedIndex === index ? "text-black/70 lg:text-white/50" : "text-white/50"} lg:group-hover:text-black/70`}>{exp.org}</p>
              </div>

              <div className="z-10">
                <p className={`text-sm sm:text-base md:text-xl lg:text-2xl leading-snug lowercase font-medium transition-colors duration-300 ${tappedIndex === index ? "text-black/80 lg:text-white/70" : "text-white/70"} lg:group-hover:text-black/80`}>
                  {exp.desc}
                </p>
              </div>

              <div className="flex md:justify-end z-10">
                <p className={`text-base sm:text-lg md:text-2xl font-bold uppercase transition-colors duration-300 ${tappedIndex === index ? "text-black lg:text-white" : "text-white"} lg:group-hover:text-black`}>{exp.date}</p>
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
