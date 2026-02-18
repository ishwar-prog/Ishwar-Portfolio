import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ImageGallery from "../../components/ui/ImageGallery";

// Main project image
import streamoraMain from "../../assets/streamora.png.png";
// Additional project images
import streamora1 from "../../assets/streamora-1.png";
import streamora2 from "../../assets/streamora-2.png";
import streamora3 from "../../assets/streamora-3.png";

// Other project images for the "other projects" section
import gsapImg from "../../assets/gsap.png.png";
import reboxedImg from "../../assets/reboxed.png.png";
import reduxImg from "../../assets/redux-1.png";

const otherProjects = [
  {
    title: "gsap-project",
    category: "gsap",
    image: gsapImg,
    route: "/projects/vibelab",
  },
  {
    title: "redux",
    category: "state management",
    image: reduxImg,
    route: "/projects/redux",
  },
  {
    title: "reboxed",
    category: "ecommerce",
    image: reboxedImg,
    route: "/projects/reboxed",
  },
];

export default function WorkStreamora() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#1f1f1f] min-h-screen w-full overflow-hidden text-[#f6f4f0]">
      <Navbar />

      {/* Project Header */}
      <section className="pt-30 pb-25 px-0 md:px-0 max-w-368 mx-auto">
        <h1 className="text-[15vw] md:text-[8rem] leading-[0.85] font-black tracking-tighter lowercase text-center">
          streamora
        </h1>
      </section>

      {/* Main Project Image with Icons */}
      <section className="pb-16 px-0 md:px-0 max-w-368 mx-auto">
        <div className="relative w-full rounded-[12px] overflow-hidden">
          <img
            src={streamoraMain}
            alt="streamora main"
            className="w-full h-auto object-cover"
          />
          {/* Icons at bottom right */}
          <div className="absolute bottom-6 right-6 flex gap-4">
            <a
              href="https://github.com/ishwar-prog/Grand-Backend"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://streamoraa.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="pb-16 px-0 md:px-0 max-w-368 mx-auto">
        <p className="text-white/65 text-sm md:text-xl mb-2 lowercase font-semibold">project overview</p>
        <h2 className="text-2xl md:text-4xl font-bold leading-tight lowercase max-w-max">
          streamora isn't just a video app- it's my deep dive into real backend arcjitecture. I built it to understand how production systems actually work: layered express structure, JWT auth flows, secure middleware, upload pipelines, and clean API contracts. The React frontend isn't just UI - it mirrors real-world patterns with service layers, Zustand state, and infinite feeds. From Cloudinary uploads to rate limiting and global error handling, this project forced me to think like a backend engineer, not just a coder. 
          <br />
          <br />
          if you're curious how modern full-stack systems are structured under the hood, Streamora is worth exploring.
        </h2>

        {/* Project Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-60 mt-13 text-sm md:text-base">
          <div>
            <p className="text-white/65 lowercase mb-1 font-semibold text-xl">project type</p>
            <p className="font-semibold text-2xl lowercase">web application</p>
          </div>
          <div>
            <p className="text-white/65 lowercase mb-1 font-semibold text-xl">year</p>
            <p className="font-semibold text-2xl lowercase">11/25</p>
          </div>
          <div>
            <p className="text-white/65 lowercase mb-1 font-semibold text-xl">role</p>
            <p className="font-semibold text-2xl lowercase">full-stack developer</p>
          </div>
          <div>
            <p className="text-white/65 lowercase mb-1 font-semibold text-xl">Context</p>
            <p className="font-semibold text-2xl lowercase">personal project</p>
          </div>
        </div>
      </section>

      {/* Additional Project Images - Gallery */}
      <section className="pb-20 px-0 md:px-0 max-w-368 mx-auto">
        <ImageGallery
          images={[
            { title: "streamora screenshot 1", url: streamora1 },
            { title: "streamora screenshot 2", url: streamora2 },
            { title: "streamora screenshot 3", url: streamora3 },
          ]}
        />
      </section>

      {/* Other Projects Section */}
      <section className="pb-25 px-0 md:px-0 max-w-368 mx-auto">
        <h2 className="text-[10vw] md:text-[6rem] leading-[1] font-black tracking-tighter lowercase mb-15">
          other projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {otherProjects.map((project) => (
            <Link
              key={project.title}
              to={project.route}
              className="flex flex-col gap-3 group cursor-pointer"
            >
              <div className="relative w-full aspect-[6/6] overflow-hidden rounded-[12px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg md:text-2xl font-semibold tracking-tight lowercase">
                  {project.title}
                </h3>
                <p className="text-white/50 text-xs md:text-base lowercase font-[600]">
                  {project.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
