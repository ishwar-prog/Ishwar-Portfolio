import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";
import ishwar from "../../assets/ishwar.png";
import TiltedCard from "../../components/ui/TiltedCard";
import { gsap } from "gsap";

export default function AboutMe() {
  
  useEffect(() => {
     // Optional: Scroll to top on mount
     window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#1f1f1f] min-h-screen w-full overflow-hidden text-[#f6f4f0]">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-[92rem] mx-auto">
        
        {/* Header */}
        <h1 className="text-[10rem] leading-[0.8] font-bold mb-20 tracking-tighter">
          about me
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left Column: Text */}
          <div className="flex flex-col gap-8 max-w-2xl">
            <p className="text-3xl leading-snug font-bold text-white/50 lowercase">
              i'm a full stack developer based in mumbai, india, specializing in building dynamic web apps and writing clean code.
            </p>
            
            <p className="text-3xl leading-snug font-bold text-white/50 lowercase">
              i'm currently in second year of computer engineering from kc college of engineering (thane), mumbai university with a deep interest in developement and agentic ai. i have build multiple projects which you can check.
            </p>
            
            <p className="text-3xl leading-snug font-bold text-white/50 lowercase">
              when i'm not behind a computer screen, i'm usually making videos, learning japanese and playing games.
            </p>

            <div className="mt-4">
               <button className="bg-[#f6f4f0] text-black px-8 py-3 rounded-lg text-lg font-bold hover:bg-white/90 transition-colors cursor-pointer lowercase">
                 download resume
               </button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-end">
            <div className="w-full md:w-[600px] h-[650px]  rounded-[50px] relative flex items-center justify-center">
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

      <CallToAction />
      <Footer />
    </main>
  );
}
