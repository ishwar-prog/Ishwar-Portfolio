import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import god from '../assets/god.png';
import virat from '../assets/virat.png';
import krsna from '../assets/krsna.png';
import john from '../assets/john.png';
import hisoka from '../assets/hisoka.png';
import github from '../assets/github.png';
import cbum from '../assets/cbum.png';


const images = [
  god,
  virat,
  krsna,
  john,
  hisoka,
  github,
  cbum
];

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
      className="py-20 px-4 md:px-8 bg-[#1f1f1f] flex justify-center items-center min-h-[40vh] cursor-pointer"
      onClick={() => window.location.href = 'mailto:ishwar16suthar@gmail.com'}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 hover:opacity-90 transition-opacity">
        <h2 className="text-[15vw] md:text-[12rem] font-extrabold text-[#f6f4f0] leading-none tracking-tighter">
          get in
        </h2>
        
        <div className="w-[20vw] h-[20vw] md:w-70 md:h-60 rounded-[4rem] overflow-hidden relative flex items-center justify-center bg-transparent">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                className="w-full h-full object-cover absolute inset-0"
                // initial={{ opacity: 0 }}
                // animate={{ opacity: 1 }}
                // exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "linear" }}
              />
            </AnimatePresence>
        </div>

        <h2 className="text-[15vw] md:text-[12rem] font-extrabold text-[#f6f4f0] leading-none tracking-tighter">
          touch
        </h2>
      </div>
    </section>
  );
}
