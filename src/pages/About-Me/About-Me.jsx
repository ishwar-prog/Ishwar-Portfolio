import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";
import ishwar from "../../assets/ishwar.png";
import TiltedCard from "../../components/ui/TiltedCard";
import { gsap } from "gsap";

const experiences = [
  {
    role: "campus ambassador",
    org: "smarted innovations",
    desc: "campus ambassador for smarted , an ed-tech platform where i was responsible for promoting career-based opportunities,engaging students,and connecting peers to valuable learning and growth resources.",
    date: "nov 2025 - present"
  },
  {
    role: "digital communication director",
    org: "rotaract club of kccmesr",
    desc: "as the digital communication director, i led tech events, digital workshops, and online engagement to connect students through technology, strengthening the club's digital presence and student participation.",
    date: "oct 2025- present"
  },
  {
    role: "member",
    org: "kccemsr entrepreneurship cell",
    desc: "actively participated in tech and entrepreneurship events and workshops, built projects, and contributed to redesigning the official kce-cell website to improve its digital presence.",
    date: "jul 2025 - present"
  },
  {
    role: "virtual internship",
    org: "google for developers",
    desc: "virtual internship in artificial intelligence and machine learning (aiml) at google for developers through aicte eduskills virtual internship",
    date: "jul 2025 - sep 2025"
  }
];

export default function AboutMe() {
  
  useEffect(() => {
     // Optional: Scroll to top on mount
     window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#1f1f1f] min-h-screen w-full overflow-hidden text-[#f6f4f0]">
      <Navbar />
      
      <section className="pt-32 pb-40 px-4 md:px-8 max-w-[92rem] mx-auto">
        
        {/* Header */}
        <h1 className="text-[20rem] leading-[0.5] font-extrabold mb-33 tracking-tighter flex justify-center text-center">
          about me
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
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
          <div className="flex justify-end">
            <div className="w-full md:w-[580px] h-[650px]  rounded-[80px] relative flex items-center justify-center">
               <TiltedCard
                 imageSrc={ishwar}
                 altText="Ishwar Suthar"
                 captionText=""
                 containerHeight="100%"
                 containerWidth="100%"
                 imageHeight="100%"
                 imageWidth="100%"
                 rotateAmplitude={12}
                 scaleOnHover={1.05}
                 showMobileWarning={false}
                 showTooltip={false}
                 displayOverlayContent={false}
               />
            </div>
          </div>

        </div>

      </section>

      {/* Experience Section */}
      <section className="pb-30 px-4 md:px-8 max-w-[92rem] mx-auto">
        <h2 className="text-[8rem] leading-[0.8] font-bold mb-16 tracking-tighter lowercase">
          my experience
        </h2>
        
        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1fr] gap-x-8 gap-y-4 py-12 border-t border-white/20 items-start">
              
              <div className="flex flex-col gap-1">
                <h3 className="text-3xl font-bold lowercase">{exp.role}</h3>
                <p className="text-xl text-white/50 lowercase">{exp.org}</p>
              </div>

              <div>
                <p className="text-xl text-white/70 leading-snug lowercase font-medium">
                  {exp.desc}
                </p>
              </div>

              <div className="flex md:justify-end">
                <p className="text-2xl font-bold lowercase">{exp.date}</p>
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
