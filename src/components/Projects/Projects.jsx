import React from "react";
import ProjectCard from "./ProjectCard";
import streamora from "../../assets/streamors-main.png";
import gsap from "../../assets/gsap-main.png";
import gullyculture from "../../assets/gullycultur.png";
import docsync from "../../assets/docsync-main.png";
import chronotask from "../../assets/chronotask-main.png";
import reboxed from "../../assets/reboxed-main.png";

const projects = [
  {
    title: "streamora",
    category: "video streaming platform",
    image: streamora,
    route: "/projects/streamora",
  },
  {
    title: "vibelab",
    category: "gsap animation Showcase",
    image: gsap,
    route: "/projects/vibelab",
  },
  {
    title: "gullyculture",
    category: "brand showcase website",
    image: gullyculture,
    route: "/projects/gullyculture",
  },
  {
    title: "docsync",
    category: "developer tools & syncing",
    image: docsync,
    route: "/projects/docsync",
  },
  {
    title: "chronotask",
    category: "ai-based task manager",
    image: chronotask,
    route: "/projects/chronotask",
  },
  {
    title: "reboxed",
    category: "e-commerce experience",
    image: reboxed,
    route: "/projects/reboxed",
  },
];

export default function Projects() {
  return (
    <section className="relative z-10 py-12 md:py-20 lg:py-28 px-4 md:px-8 lg:px-16 text-white" id="work">
      <div className="max-w-[92rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20">
        {projects.map((project, index) => (
          <div key={index} data-cursor-text="See More" className="w-full">
            <ProjectCard {...project} className="w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

