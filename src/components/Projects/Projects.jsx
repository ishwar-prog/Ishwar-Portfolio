import React from "react";
import ProjectCard from "./ProjectCard";
import streamora from "../../assets/streamora.png.png";
import gsap from "../../assets/gsap.png.png";
import mediasearch from "../../assets/mediasearch.png.png";
import reboxed from "../../assets/reboxed.png.png";
import chronotask from "../../assets/chronotask.png";
import jellmo from "../../assets/jellmo.png.png";

const projects = [
  {
    title: "streamora",
    category: "video streaming",
    image: streamora,
    className: "col-span-1 md:col-span-8",
    route: "/projects/streamora",
  },
  {
    title: "VibeLab",
    category: "gsap",
    image: gsap,
    className: "col-span-1 md:col-span-4",
    route: "/projects/vibelab",
  },
  {
    title: "mediasearch",
    category: "search engine",
    image: mediasearch,
    className: "col-span-1 md:col-span-5",
    route: "/projects/mediasearch",
  },
  {
    title: "reboxed",
    category: "e-commerce",
    image: reboxed,
    className: "col-span-1 md:col-span-7",
    route: "/projects/reboxed",
  },
  {
    title: "chronotask",
    category: "ai-based task manager",
    image: chronotask,
    className: "col-span-1 md:col-span-8",
    route: "/projects/chronotask",
  },
  {
    title: "jellmo",
    category: "ai/ml",
    image: jellmo,
    className: "col-span-1 md:col-span-4",
    route: "/projects/jellmo",
  },
];

export default function Projects() {
  return (
    <section className="relative z-10 py-10 md:py-16 lg:py-20 px-3 md:px-4 lg:px-0 text-white" id="work">
      <div className="max-w-[92rem] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 lg:gap-8 auto-rows-[250px] sm:auto-rows-[320px] md:auto-rows-[340px] lg:auto-rows-[500px]">
        {projects.map((project, index) => (
          <div key={index} data-cursor-text="See More" className={project.className}>
             <ProjectCard {...project} className="h-full w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
