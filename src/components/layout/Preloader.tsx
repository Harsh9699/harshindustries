"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = "hidden";
    
    // Hide preloader after animation sequence completes (4.5 seconds)
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 4500);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const TreeSVG = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary opacity-20">
      <path d="M12 2C7 2 3 6 3 11c0 2.15 1.13 4.05 2.85 5.15L8 22h8l2.15-5.85C19.87 15.05 21 13.15 21 11c0-5-4-9-9-9zM10 20v-3.5c-1.5-.5-2.5-1.5-3-3l1.5-1.5c1 1.5 2 2 3.5 2s2.5-.5 3.5-2l1.5 1.5c-.5 1.5-1.5 2.5-3 3V20h-4z"/>
    </svg>
  );

  const LeafSVG = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
       <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
    </svg>
  );

  const CupGraphic = () => (
    <div className="relative w-[150px] h-[190px] flex flex-col items-center justify-center">
      {/* Lip */}
      <div className="w-[160px] h-[20px] rounded-[50%] bg-[#FBFBF9] border-[2px] border-primary/20 absolute top-[-10px] z-10 shadow-sm"></div>
      {/* Body */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white to-[#FBFBF9] shadow-[0_15px_30px_rgba(0,0,0,0.15)] border-b-[6px] border-surface/50 flex flex-col items-center justify-center"
        style={{ clipPath: 'polygon(5% 0, 95% 0, 85% 100%, 15% 100%)' }}
      >
        <img src="/images/logo.png" className="w-[100px] h-auto opacity-95 z-10 mt-4" alt="Harsh Industries" />
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FBFBF9] pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 1, 1, 0] }}
          transition={{ duration: 4.5, times: [0, 0.7, 0.8, 0.9, 1], ease: "easeInOut" }}
        >
           {/* 1. The Tree Background */}
           <motion.div 
             className="absolute w-[400px] h-[400px]"
             initial={{ opacity: 0, scale: 0.8, y: -50 }}
             animate={{ opacity: [0, 1, 1, 0, 0], scale: [0.8, 1, 1, 1.2, 1.2], y: [-50, -20, -20, -10, -10] }}
             transition={{ duration: 4.5, times: [0, 0.1, 0.3, 0.5, 1], ease: "easeInOut" }}
           >
             <TreeSVG />
           </motion.div>

           {/* 2. Left Leaf */}
           <motion.div
             className="absolute w-[40px] h-[40px] text-[#4caf50]"
             initial={{ x: -80, y: -120, scale: 0.5, rotate: -30, opacity: 0 }}
             animate={{ 
                x: [-80, -80, -10, -10, -10],
                y: [-120, -120, 0, 0, 0],
                scale: [0.5, 0.5, 3.5, 3.5, 3.5],
                rotate: [-30, -30, 45, 45, 45],
                opacity: [0, 1, 1, 0, 0] // Fades out as they merge to form cup
             }}
             transition={{ duration: 4.5, times: [0, 0.1, 0.45, 0.55, 1], ease: "easeInOut" }}
           >
             <LeafSVG />
           </motion.div>

           {/* 3. Right Leaf */}
           <motion.div
             className="absolute w-[40px] h-[40px] text-[#2B5C3F]"
             initial={{ x: 80, y: -140, scale: 0.5, rotate: 60, opacity: 0 }}
             animate={{ 
                x: [80, 80, 10, 10, 10],
                y: [-140, -140, 0, 0, 0],
                scale: [0.5, 0.5, 3.5, 3.5, 3.5],
                rotate: [60, 60, -45, -45, -45],
                opacity: [0, 1, 1, 0, 0] // Fades out as they merge to form cup
             }}
             transition={{ duration: 4.5, times: [0, 0.1, 0.45, 0.55, 1], ease: "easeInOut" }}
           >
             <LeafSVG />
           </motion.div>

           {/* 4. The Cup Transformation */}
           <motion.div
             className="absolute flex items-center justify-center z-10"
             initial={{ opacity: 0, scale: 0.5 }}
             animate={{ 
                opacity: [0, 0, 1, 1, 0], // Bursts in as leaves merge
                scale: [0.5, 0.5, 1.15, 1, 1.2],
                y: [0, 0, 0, 0, -20]
             }}
             transition={{ duration: 4.5, times: [0, 0.45, 0.55, 0.7, 1], ease: "easeInOut" }}
           >
              <CupGraphic />
           </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
