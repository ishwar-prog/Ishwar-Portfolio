import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ImageGallery from "../../components/ui/ImageGallery";
import { CardCurtainReveal, CardCurtain, CardCurtainRevealFooter } from "../../components/ui/CardCurtainReveal";
import ExpandCards from "../../components/ui/ExpandCards";

import jellmoMain from "../../assets/jellmo.png.png";
import jellmo1 from "../../assets/jellmo-1.png";
import jellmo2 from "../../assets/jellmo-2.png";
import jellmo3 from "../../assets/jellmo-3.png";

import streamoraImg from "../../assets/streamora.png.png";
import gsapImg from "../../assets/gsap.png.png";
import mediasearchImg from "../../assets/mediasearch.png.png";
import reboxedImg from "../../assets/reboxed.png.png";
import chronotaskImg from "../../assets/chronotask.png";

const otherProjects = [
  { title: "streamora", category: "video streaming", image: streamoraImg, route: "/projects/streamora", github: "https://github.com/ishwar-prog/Grand-Backend", liveUrl: "https://streamoraa.onrender.com/" },
  { title: "vibelab", category: "gsap", image: gsapImg, route: "/projects/vibelab", github: "https://github.com/ishwar-prog/Gsap-Project", liveUrl: "https://gsap1-project.onrender.com/" },
  { title: "mediasearch", category: "search engine", image: mediasearchImg, route: "/projects/mediasearch", github: "https://github.com/ishwar-prog/Redux-Project", liveUrl: "https://modi-rahul.vercel.app/" },
  { title: "reboxed", category: "ecommerce", image: reboxedImg, route: "/projects/reboxed", github: "https://github.com/ishwar-prog/hackios", liveUrl: "https://reboxed.onrender.com/" },
  { title: "chronotask", category: "ai-based task manager", image: chronotaskImg, route: "/projects/chronotask", github: "https://github.com/ishwar-prog/Chrono-AiTask", liveUrl: "https://chrono-ai-task.vercel.app/" },
];

export default function WorkJellmo() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen w-full overflow-hidden text-[#f6f4f0]">
      <Navbar />

      {/* Project Header */}
      <section className="pt-20 md:pt-30 pb-12 md:pb-25 px-3 md:px-0 max-w-368 mx-auto">
        <h1 className="text-[12vw] sm:text-[14vw] md:text-[8rem] leading-[0.85] font-black tracking-tighter lowercase text-center">
          jellmo
        </h1>
      </section>

      {/* Main Project Image with Icons */}
      <section className="pb-10 md:pb-16 px-3 md:px-0 max-w-368 mx-auto">
        <CardCurtainReveal className="w-full rounded-[40px]">
          <img
            src={jellmoMain}
            alt="jellmo main"
            className="w-full h-auto object-cover"
          />
          <CardCurtain />
          <CardCurtainRevealFooter>
            <a
              href="https://github.com/omtawde09/jellmo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/35 hover:scale-110 transition-all duration-200 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </CardCurtainRevealFooter>
          {/* Mobile: always-visible icons at bottom-right */}
          <div className="md:hidden absolute bottom-3 right-3 flex gap-2 z-30">
            <a
              href="https://github.com/omtawde09/jellmo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </CardCurtainReveal>
      </section>

      {/* Project Overview */}
      <section className="pb-10 md:pb-16 px-3 md:px-0 max-w-368 mx-auto">
        <p className="text-white/50 text-sm md:text-xl mb-2 lowercase font-semibold">project overview</p>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold leading-tight lowercase max-w-max">
          We built a hybrid AI system that combines the structured world modeling of V-JEPA with the reasoning and interpretability strengths of Large Language Models. Our system first converts visual scenes into stable, predictive latent representations that capture physical structure and temporal dynamics. These latent metrics are then translated into human-readable insights using an LLM, enabling explainable reasoning over real-world interactions. 
          <br />
          <br />
          The result is a grounded AI pipeline that bridges low-level visual prediction with high-level logical interpretation.
        </h2>

        {/* Project Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 md:gap-60 mt-8 md:mt-13 text-sm md:text-base">
          <div>
            <p className="text-white/65 lowercase mb-1 font-semibold text-sm md:text-xl">project type</p>
            <p className="font-semibold text-base sm:text-lg md:text-2xl lowercase">hybrid multimodal ai research system</p>
          </div>
          <div>
            <p className="text-white/65 lowercase mb-1 font-semibold text-sm md:text-xl">year</p>
            <p className="font-semibold text-base sm:text-lg md:text-2xl lowercase">2/26</p>
          </div>
          <div>
            <p className="text-white/65 lowercase mb-1 font-semibold text-sm md:text-xl">role</p>
            <p className="font-semibold text-base sm:text-lg md:text-2xl lowercase">llm integration & reasoning pipeline engineer</p>
          </div>
          <div>
            <p className="text-white/65 lowercase mb-1 font-semibold text-sm md:text-xl">client</p>
            <p className="font-semibold text-base sm:text-lg md:text-2xl lowercase">hackathon project</p>
          </div>
        </div>
      </section>

      {/* Additional Project Images - Gallery */}
      <section className="pb-12 md:pb-20 px-3 md:px-0 max-w-368 mx-auto">
        <ImageGallery
          images={[
            { title: "jellmo screenshot 1", url: jellmo1 },
            { title: "jellmo screenshot 2", url: jellmo2 },
            { title: "jellmo screenshot 3", url: jellmo3 },
          ]}
        />
      </section>

      {/* Other Projects Section */}
      <section className="pb-14 md:pb-25 px-3 md:px-0 max-w-368 mx-auto">
        <h2 className="text-[8vw] sm:text-[9vw] md:text-[8rem] leading-[1] font-black tracking-tighter lowercase mb-8 md:mb-18">
          other projects
        </h2>
        <ExpandCards projects={otherProjects} />
      </section>

      <Footer />
    </main>
  );
}
