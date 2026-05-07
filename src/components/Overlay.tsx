"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Overlay = () => {
  const { scrollYProgress } = useScroll();

  // Opacity transforms for each section
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);

  // Y parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.75], [50, -50]);

  return (
    <div className="pointer-events-none relative z-10 w-full">
      {/* Section 1 */}
      <motion.section
        style={{ opacity: opacity1, y: y1 }}
        className="flex h-screen w-full flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="text-5xl font-bold tracking-tighter md:text-8xl text-white">
          RISHABH DAPKARA <br />
          <span className="text-white/40">FRONTEND DEVELOPER</span>
        </h1>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/60">
          Scroll to explore
        </p>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        style={{ opacity: opacity2, y: y2 }}
        className="flex h-screen w-full flex-col items-start justify-center px-10 md:px-24"
      >
        <div className="max-w-2xl">
          <h2 className="text-4xl font-medium leading-tight md:text-6xl text-white">
            4.5+ YEARS <br />
            <span className="text-white/40">CRAFTING UI.</span>
          </h2>
          <p className="mt-6 text-lg text-white/50">
            React.js, Next.js, Vue.js, and modern JavaScript building scalable, high-performance web applications.
          </p>
        </div>
      </motion.section>

      {/* Section 3 */}
      <motion.section
        style={{ opacity: opacity3, y: y3 }}
        className="flex h-screen w-full flex-col items-end justify-center px-10 md:px-24 text-right"
      >
        <div className="max-w-2xl">
          <h2 className="text-4xl font-medium leading-tight md:text-6xl text-white">
            SCALABILITY & <br />
            <span className="text-white/40">OPTIMIZATION.</span>
          </h2>
          <p className="mt-6 text-lg text-white/50">
            Specialized in responsive UI and creating user-centric digital experiences.
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default Overlay;
