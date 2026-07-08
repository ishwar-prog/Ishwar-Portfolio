import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

import Navbar from "../../components/Navbar";
import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";

import streamora from "../../assets/streamora.png.png";
import gsapImg from "../../assets/gsap.png.png";
import gullyculture from "../../assets/gullyculture-1.png";
import reboxed from "../../assets/reboxed.png.png";
import chronotask from "../../assets/chronotask.png";
import docsync from "../../assets/docsync.png";

const projects = [
  {
    title: "streamora",
    category: "video streaming",
    tags: ["web app", "full stack"],
    image: streamora,
    route: "/projects/streamora",
  },
  {
    title: "VibeLab",
    category: "gsap",
    tags: ["frontend", "animation"],
    image: gsapImg,
    route: "/projects/vibelab",
  },
  {
    title: "gullyculture",
    category: "brand showcase",
    tags: ["web app", "frontend"],
    image: gullyculture,
    route: "/projects/gullyculture",
  },
  {
    title: "reboxed",
    category: "e-commerce",
    tags: ["web app", "full stack"],
    image: reboxed,
    route: "/projects/reboxed",
  },
  {
    title: "chronotask",
    category: "ai-based task manager",
    tags: ["web app", "ai/ml"],
    image: chronotask,
    route: "/projects/chronotask",
  },
  {
    title: "docsync",
    category: "developer tool",
    tags: ["npm package", "automation"],
    image: docsync,
    route: "/projects/docsync",
  },
];

const StickyProjects = ({ projects }) => {
  const container = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      // Skip sticky animation on mobile
      if (window.innerWidth < 768) return;

      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current;
      const totalCards = cardElements.length;

      if (!cardElements[0]) return;

      gsap.set(cardElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <>
      {/* Mobile: simple stacked list */}
      <div className="md:hidden flex flex-col gap-6 px-3">
        {projects.map((project) => (
          <a key={project.title} href={project.route} className="block">
            <div className="flex flex-col gap-3 group cursor-pointer">
              <div className="relative w-full overflow-hidden rounded-4xl bg-[#1f1f1f] border border-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col px-1">
                <h3 className="text-xl font-bold tracking-tight lowercase">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm font-semibold lowercase">
                  {project.category}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Desktop: sticky card animation */}
      <div className="hidden md:block relative h-full w-full" ref={container}>
        <div className="sticky-cards relative flex h-screen w-full items-center justify-center pt-10 md:pt-14 lg:pt-20 pb-10 px-3 lg:px-8">
          <div className="relative h-[55vh] md:h-[60vh] lg:h-192.5 w-full max-w-3xl lg:max-w-6xl xl:max-w-7xl overflow-hidden">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="absolute h-full w-full bg-[#1f1f1f] rounded-[20px] shadow-2xl border border-white/10 p-4 md:p-3"
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              >
                <a href={project.route} className="block h-full w-full">
                  <div className="flex flex-col gap-1 group cursor-pointer h-full w-full">
                    {/* Image Container */}
                    <div className="relative w-full h-[80%] overflow-hidden rounded-4xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Project Info */}
                    <div className="flex flex-col px-2 mt-2">
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight lowercase">
                        {project.title}
                      </h3>
                      <p className="text-white/50 text-base md:text-lg font-semibold lowercase">
                        {project.category}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default function SelectedWork() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ReactLenis root>
      <main className="min-h-screen w-full overflow-hidden text-[#f6f4f0]">
        <Navbar />

        <section className="pt-12 md:pt-15 pb-16 md:pb-20 px-3 md:px-4 lg:px-0 max-w-368 mx-auto">
          {/* Header */}
          <h1 className="text-[10vw] sm:text-[11vw] md:text-[14vw] lg:text-[15rem] leading-[0.9] font-black mb-6 md:mb-8 lg:mb-20 tracking-tighter lowercase text-center whitespace-nowrap">
            selected work
          </h1>

          {/* Projects Stack */}
          <StickyProjects projects={projects} />
        </section>

        <CallToAction />
        <Footer />
      </main>
    </ReactLenis>
  );
}
