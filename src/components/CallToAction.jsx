import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import god from "../assets/god.png";
import virat from "../assets/virat.png";
import krsna from "../assets/krsna.png";
import john from "../assets/john.png";
import hisoka from "../assets/hisoka.png";
import github from "../assets/github.png";
import cbum from "../assets/cbum.png";

const images = [god, virat, krsna, john, hisoka, github, cbum];

export default function CallToAction() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      className="py-12 md:py-20 px-3 md:px-0 bg-[#1f1f1f] flex justify-center items-center min-h-[30vh] md:min-h-[40vh] text-[#f6f4f0]"
    >
      <a 
        href="https://mail.google.com/mail/?view=cm&fs=1&to=ishwar16suthar@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 cursor-pointer hover:text-white/20 transition-colors duration-300 text-decoration-none w-full"
      >
        {/* Mobile: image first, then text */}
        {/* Desktop: get in [image] touch */}
        <h2 className="hidden md:block text-[12rem] font-extrabold leading-none tracking-tighter">
          get in
        </h2>

        {/* Image container - shown first on mobile */}
        <div className="order-first md:order-none w-[70vw] h-[45vw] sm:w-[50vw] sm:h-[35vw] md:w-95 md:h-75 rounded-[2rem] md:rounded-[4rem] overflow-hidden relative flex items-center justify-center bg-transparent">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              className="w-full h-full object-cover absolute inset-0"
              transition={{ duration: 0.15, ease: "linear" }}
            />
          </AnimatePresence>
        </div>

        {/* Mobile: "get in touch" below image */}
        <div className="flex flex-col items-center md:hidden">
          <h2 className="text-[13vw] font-extrabold leading-none tracking-tighter">
            get in touch
          </h2>
        </div>

        <h2 className="hidden md:block text-[12rem] font-extrabold leading-none tracking-tighter">
          touch
        </h2>
      </a>
    </section>
  );
}
