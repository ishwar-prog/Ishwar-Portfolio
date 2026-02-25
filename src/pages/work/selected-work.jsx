import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

import Navbar from "../../components/Navbar";
import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";

import streamora from "../../assets/streamora.png.png";
import gsapImg from "../../assets/gsap.png.png";
import mediasearch from "../../assets/mediasearch.png.png";
import reboxed from "../../assets/reboxed.png.png";
import disasterIQ from "../../assets/disasterIQ.png.png";
import jellmo from "../../assets/jellmo.png.png";

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
    title: "mediasearch",
    category: "search engine",
    tags: ["web app", "full stack"],
    image: mediasearch,
    route: "/projects/mediasearch",
  },
  {
    title: "reboxed",
    category: "e-commerce",
    tags: ["web app", "full stack"],
    image: reboxed,
    route: "/projects/reboxed",
  },
  {
    title: "disasterIQ",
    category: "disaster intelligence agent",
    tags: ["web app", "ai/ml"],
    image: disasterIQ,
    route: "/projects/disasteriq",
  },
  {
    title: "jellmo",
    category: "ai/ml",
    tags: ["ai/ml", "full stack"],
    image: jellmo,
    route: "/projects/jellmo",
  },
];

const StickyProjects = ({ projects }) => {
  const container = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
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
    <div className="relative h-full w-full" ref={container}>
      <div className="sticky-cards relative flex h-[100vh] w-full items-center justify-center pt-20 pb-10 px-3 lg:px-8">
        <div className="relative h-[600px] sm:h-[650px] md:h-[700px] lg:h-[770px] w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-6xl xl:max-w-7xl">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="absolute h-full w-full bg-[#1f1f1f] rounded-[20px] shadow-2xl border border-white/10 p-4 md:p-6"
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <Link to={project.route} className="block h-full w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="flex flex-col gap-4 group cursor-pointer h-full w-full"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-[75%] md:h-[80%] overflow-hidden rounded-[15px]">
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
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SelectedWork() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-[#1f1f1f] min-h-screen w-full overflow-hidden text-[#f6f4f0]">
        <Navbar />

        <section className="pt-15 pb-30 px-0 md:px-0 max-w-368 mx-auto">
          {/* Header */}
          <h1 className="text-[12vw] md:text-[15rem] leading-[0.9] font-black mb-20 tracking-tighter lowercase text-center">
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
