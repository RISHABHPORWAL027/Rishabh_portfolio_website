"use client";

import React from "react";
import { motion } from "framer-motion";

const ITEMS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "REST APIs",
  "AI-assisted dev",
  "Performance",
  "UI Systems",
  "Design tokens",
  "Redux",
  "Vue.js",
  "Three.js",
];

export default function MarqueeStrip() {
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-white/8 py-4 bg-[#0c0c0c]">
      <motion.div
        className="flex gap-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap text-sm uppercase tracking-[0.35em] text-white/30">
            {item}
            <span className="text-white/15">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
