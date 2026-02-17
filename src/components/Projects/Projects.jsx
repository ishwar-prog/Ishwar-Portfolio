import React from "react";
import ProjectCard from "./ProjectCard";
import streamora from "../../assets/streamora.png.png";
import gsap from "../../assets/gsap.png.png";
import mediasearch from "../../assets/mediasearch.png.png";
import reboxed from "../../assets/reboxed.png.png";
import disasterIQ from "../../assets/disasterIQ.png.png";
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
    title: "disasterIQ",
    category: "disaster intelligence system",
    image: disasterIQ,
    className: "col-span-1 md:col-span-8",
    route: "/projects/disasteriq",
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
    <section className="py-20 px-0 md:px-0  text-white" id="work">
      <div className="max-w-[92rem] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[400px] md:auto-rows-[500px]">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
