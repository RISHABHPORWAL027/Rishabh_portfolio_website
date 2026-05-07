"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiRedux, SiVuedotjs, SiNodedotjs, SiThreedotjs,
  SiFigma, SiGit, SiPostgresql,
  SiDocker, SiJenkins,
} from "react-icons/si";
import { TbApi, TbBrandOpenai, TbZoomCode, TbComponents, TbPalette, TbCloud } from "react-icons/tb";

/* ─── Full tech stack split into two rows ─────────────────── */

const ROW_1 = [
  { label: "React",         Icon: SiReact },
  { label: "Next.js",       Icon: SiNextdotjs },
  { label: "TypeScript",    Icon: SiTypescript },
  { label: "Tailwind CSS",  Icon: SiTailwindcss },
  { label: "Redux Toolkit", Icon: SiRedux },
  { label: "Material UI",   Icon: TbComponents },
  { label: "Three.js",      Icon: SiThreedotjs },
  { label: "Webpack",       Icon: TbZoomCode },
  { label: "Jest",          Icon: TbZoomCode },
  { label: "PostgreSQL",    Icon: SiPostgresql },
  { label: "MySQL",         Icon: SiPostgresql },
];

const ROW_2 = [
  { label: "Vue.js",          Icon: SiVuedotjs },
  { label: "JavaScript",      Icon: SiNodedotjs },
  { label: "REST APIs",       Icon: TbApi },
  { label: "AI Chatbot",      Icon: TbBrandOpenai },
  { label: "Performance",     Icon: TbZoomCode },
  { label: "Responsive UI",   Icon: TbPalette },
  { label: "Figma",           Icon: SiFigma },
  { label: "Git",             Icon: SiGit },
  { label: "Docker",          Icon: SiDocker },
  { label: "AWS / Azure / OCI", Icon: TbCloud },
  { label: "Jenkins",         Icon: SiJenkins },
];

/* ─── Single ticker track ─────────────────────────────────── */

function TickerTrack({
  items,
  direction,
  running,
}: {
  items: typeof ROW_1;
  direction: "left" | "right";
  running: boolean;
}) {
  // Double items so the CSS -50% translateX loops seamlessly
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3.5 border-b border-white/6 last:border-b-0">
      <div
        className={[
          direction === "left" ? "ticker-run-left" : "ticker-run-right",
          !running ? "ticker-paused" : "",
          "flex items-center w-max will-change-transform",
        ].join(" ")}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 px-6 text-[11px] font-mono uppercase tracking-[0.3em] text-white/28 whitespace-nowrap hover:text-white/55 transition-colors group"
          >
            <item.Icon className="text-sm text-white/18 group-hover:text-white/45 transition-colors shrink-0" />
            {item.label}
            <span className="text-white/10 ml-3">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────── */

export default function ScrollTicker() {
  const ref = useRef<HTMLDivElement>(null);
  // Start playing when ANY part of the section enters the viewport, pause when it leaves
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} className="bg-[#080808] border-y border-white/6">
      <TickerTrack items={ROW_1} direction="left"  running={inView} />
      <TickerTrack items={ROW_2} direction="right" running={inView} />
    </div>
  );
}
