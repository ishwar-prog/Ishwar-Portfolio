import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

export default function SelectedWork() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#1f1f1f] min-h-screen w-full overflow-hidden text-[#f6f4f0]">
      <Navbar />

      <section className="pt-15 pb-30 px-4 md:px-1 max-w-368 mx-auto">
        {/* Header */}
        <h1 className="text-[12vw] md:text-[15rem] leading-[0.9] font-black mb-10 tracking-tighter lowercase text-center">
          selected work
        </h1>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {projects.map((project, index) => (
            <Link key={project.title} to={project.route}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="flex flex-col gap-4 group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-auto overflow-hidden rounded-[20px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-[800px] h-[350px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Project Info */}
                <div className="flex flex-col px-1">
                  <h3 className="text-xl md:text-xl font-bold tracking-tight lowercase">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm md:text-medium font-semibold lowercase">
                    {project.category}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
}
