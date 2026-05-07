"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01!@#$%";
const ORIGINAL = "RISHABH";

const links = [
  { label: "About", href: "#about" },
  { label: "Work",  href: "#works" },
  { label: "Contact", href: "#contact" },
];

const social = [
  { label: "Email", href: "mailto:porwal027@gmail.com" },
  { label: "in",    href: "https://www.linkedin.com/in/rishabhdapkara" },
  { label: "gh",    href: "https://github.com/RISHABHPORWAL027" },
];

/* ─── Glitch name ────────────────────────────────────────── */
function GlitchName() {
  const [display, setDisplay] = useState(ORIGINAL);
  const [hovered, setHovered] = useState(false);

  const runGlitch = useCallback(() => {
    let step = 0;
    const id = setInterval(() => {
      if (step > 16) {
        setDisplay(ORIGINAL);
        clearInterval(id);
        return;
      }
      setDisplay(
        ORIGINAL.split("").map((ch, i) =>
          i < step - 6
            ? ch
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      step++;
    }, 35);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (hovered) return runGlitch();
    // On mouse-leave: snap back immediately
    const t = setTimeout(() => setDisplay(ORIGINAL), 80);
    return () => clearTimeout(t);
  }, [hovered, runGlitch]);

  return (
    <a
      href="#home"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-center gap-0 text-sm font-semibold uppercase tracking-[0.3em] text-white/90 hover:text-white transition-colors select-none"
    >
      <span className="transition-colors">{display}</span>
      {/* Blinking terminal cursor — green-tinted on hover */}
      <span
        className={`ml-0.5 animate-blink font-light transition-colors ${
          hovered ? "text-green-400" : "text-white/35"
        }`}
      >
        _
      </span>
    </a>
  );
}

/* ─── Nav ────────────────────────────────────────────────── */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 transition-all duration-500 ${
        scrolled
          ? "bg-[#0c0c0c]/80 backdrop-blur-xl border-b border-white/5"
          : ""
      }`}
    >
      <GlitchName />

      <nav className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-sm uppercase tracking-[0.2em] text-white/45 hover:text-white transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        {social.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="text-xs uppercase tracking-[0.25em] text-white/35 hover:text-white transition-colors"
          >
            {s.label}
          </a>
        ))}
      </div>
    </motion.header>
  );
}
