"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";

/* ─────────────────────────── DATA ─────────────────────────── */

const SERVICES = [
  {
    num: "01",
    title: "SaaS Dashboards & Workflows",
    desc: "Complex React interfaces for cloud platforms, tenant onboarding, provisioning flows, and database operations.",
  },
  {
    num: "02",
    title: "Consumer Product Interfaces",
    desc: "High-traffic booking, payment, onboarding, and campaign experiences built for performance and conversion.",
  },
  {
    num: "03",
    title: "AI & Automation UX",
    desc: "Chatbot and assistant interfaces that accept text, image, and audio inputs to make product workflows faster.",
  },
  {
    num: "04",
    title: "Frontend Architecture",
    desc: "TypeScript, Redux, API integration, testing, responsive design, build tooling, and maintainable component systems.",
  },
];

type ExperienceLink = {
  label: string;
  href: string;
};

type ExperienceItem = {
  idx: string;
  company: string;
  fullName: string;
  role: string;
  duration: string;
  logo: string;
  desc: string;
  tags: string[];
  color: string;
  accentColor: string;
  links?: ExperienceLink[];
  highlights: string[];
  active?: boolean;
};

const EXPERIENCE = [
  {
    idx: "01",
    company: "Tessell",
    fullName: "Tessell — Database-as-a-Service Platform",
    role: "SDE 2",
    duration: "May 2025 — Present",
    logo: "/logos/tessell.webp",
    desc: "Building frontend experiences for Tessell's DBaaS platform, including subscription onboarding for new tenants, multi-cloud support across AWS, Azure, and OCI, database provisioning and resize workflows, and an AI chatbot for database management tasks.",
    tags: ["React", "TypeScript", "Material UI", "Redux Toolkit", "Webpack", "Jest"],
    color: "group-hover:text-violet-400",
    accentColor: "violet",
    links: [{ label: "Website", href: "https://www.tessell.com/" }],
    highlights: [
      "Built subscription onboarding flows for new tenants with multi-cloud support across AWS, Azure, and OCI.",
      "Implemented database provisioning and resize workflows for Oracle, PostgreSQL, MySQL, SQL Server, and MongoDB.",
      "Created AI chatbot experiences that accept text, image, and audio inputs for database management tasks.",
      "Worked with React, TypeScript, Material UI, Redux Toolkit, Webpack, Emotion, and Jest.",
    ],
    active: true,
  },
  {
    idx: "02",
    company: "Uplers",
    fullName: "Uplers — Internal Talent Platform",
    role: "Frontend Developer",
    duration: "Aug 2024 — May 2025",
    logo: "/logos/uplers.png",
    desc: "Developed dynamic dashboard interfaces for internal applications to manage user profiles, resumes, history, and track records with responsive layouts, interactive charts, and scalable UI patterns.",
    tags: ["Next.js", "HTML", "CSS", "JavaScript", "Charts", "Responsive UI"],
    color: "group-hover:text-orange-400",
    accentColor: "orange",
    highlights: [
      "Developed dashboards to manage and display user profiles, resumes, history, and track records.",
      "Implemented responsive views and interactive charts for easier internal data scanning.",
      "Focused on scalable UI patterns using HTML, CSS, JavaScript, and Next.js.",
    ],
  },
  {
    idx: "03",
    company: "OLA",
    fullName: "Codoxy Solution — OLA Cabs / OLA Electric",
    role: "Frontend Developer",
    duration: "Nov 2022 — Jul 2024",
    logo: "/logos/ola.png",
    desc: "Built OLA Electric and OLA Cabs frontend experiences, including a scratch-and-win campaign with probability logic, booking and payment flows, and driver onboarding screens that reduced steps from 24 to 10.",
    tags: ["Next.js", "React", "Vue.js", "Redux", "Material UI", "Jest"],
    color: "group-hover:text-emerald-400",
    accentColor: "emerald",
    links: [
      { label: "Scratch card", href: "https://ola-ev-ui.olaelectric.com/scratch-card/92ac2f4f-f198-4789-a0fe-df45c7be0e6d" },
      { label: "Booking", href: "https://book.olaelectric.com/" },
      { label: "Driver web", href: "https://drive.olacabs.com/" },
      { label: "Driver app", href: "https://play.google.com/store/apps/details?id=com.olacabs.oladriver&hl=en_IN&pli=1" },
    ],
    highlights: [
      "Developed a scratch-and-win campaign with probability logic, security checks, and gamification elements.",
      "Contributed to booking and payment flows for OLA Electric with React, Redux, and testing coverage.",
      "Redesigned driver onboarding in app and web views, reducing the process from 24 steps to 10.",
      "Added language options, document verification, and theme improvements using Vue.js and Material UI.",
    ],
  },
  {
    idx: "04",
    company: "TCS",
    fullName: "Tata Consultancy Services",
    role: "Assistant System Engineer",
    duration: "Jul 2021 — Oct 2022",
    logo: "/logos/tcs.webp",
    desc: "Developed an internal banking web application with a responsive chatbot system, secure .NET and MySQL backend integration, and frontend performance tuning for high-volume transaction workflows.",
    tags: ["React", "TypeScript", "Redux", ".NET", "MySQL", "Banking"],
    color: "group-hover:text-sky-400",
    accentColor: "sky",
    highlights: [
      "Developed internal banking web application features using React, TypeScript, JavaScript, and Redux.",
      "Engineered a responsive chatbot system to improve query handling and customer interaction.",
      "Integrated frontend interfaces with secure .NET and MySQL backend services.",
      "Optimized frontend performance for high-volume workflows supporting 100K+ daily transactions.",
    ],
  },
] satisfies ExperienceItem[];

/* ──────────────────────── ANIMATION HELPERS ────────────────── */

/** Line-by-line slide-up reveal */
function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: "108%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Fade + slide up */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Character scramble → resolves to real text on scroll in */
function ScrambleText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [displayed, setDisplayed] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 18;
    const delayFrames = Math.round((delay / 1000) * 60);
    let rafId: number;

    const animate = () => {
      if (frame < delayFrames) { frame++; rafId = requestAnimationFrame(animate); return; }
      const progress = (frame - delayFrames) / total;
      if (progress >= 1) { setDisplayed(text); return; }
      setDisplayed(
        text
          .split("")
          .map((ch, i) =>
            i < Math.floor(progress * text.length)
              ? ch
              : ch === " "
              ? " "
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
      frame++;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView, text, delay, chars]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}

/** Stagger container for children */
function StaggerList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -18 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Counting number on scroll */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 40;
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function Divider() {
  return <div className="w-full h-px bg-white/8" />;
}

/* ──────────── ABOUT WOW HELPERS ───────────────────────────── */

/** Floating code tokens in the background — pure CSS, no jank */
const TOKENS = [
  { text: "const",       left: "7%",  top: "9%",  size: "0.65rem", o: 0.055, dur: 18 },
  { text: "async/await", left: "83%", top: "7%",  size: "0.55rem", o: 0.045, dur: 24 },
  { text: "=> {",        left: "14%", top: "72%", size: "0.75rem", o: 0.06,  dur: 20 },
  { text: "useState()",  left: "62%", top: "82%", size: "0.6rem",  o: 0.045, dur: 16 },
  { text: "interface",   left: "91%", top: "43%", size: "0.6rem",  o: 0.04,  dur: 22 },
  { text: ".map()",      left: "2%",  top: "50%", size: "0.7rem",  o: 0.055, dur: 21 },
  { text: "return (",    left: "73%", top: "28%", size: "0.6rem",  o: 0.038, dur: 25 },
  { text: "useEffect",   left: "28%", top: "18%", size: "0.65rem", o: 0.05,  dur: 19 },
  { text: "React.FC<>",  left: "48%", top: "92%", size: "0.55rem", o: 0.04,  dur: 17 },
  { text: "import",      left: "55%", top: "14%", size: "0.7rem",  o: 0.055, dur: 23 },
  { text: "null ??",     left: "38%", top: "62%", size: "0.6rem",  o: 0.038, dur: 20 },
  { text: "dispatch()",  left: "88%", top: "68%", size: "0.62rem", o: 0.042, dur: 22 },
];

function FloatingCodeBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {TOKENS.map((t, i) => (
        <motion.span
          key={i}
          className="absolute font-mono text-green-400"
          style={{ left: t.left, top: t.top, fontSize: t.size, opacity: t.o }}
          animate={{ y: [0, -22, 0, 18, 0], opacity: [t.o, t.o * 1.6, t.o, t.o * 0.7, t.o] }}
          transition={{ duration: t.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.1 }}
        >
          {t.text}
        </motion.span>
      ))}
    </div>
  );
}

/** 3D perspective flip — each word rotates in on X axis */
function Word3D({ word, delay = 0, dim = false }: { word: string; delay?: number; dim?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  return (
    <span
      ref={ref}
      className="inline-block mr-[0.25em] overflow-visible"
      style={{ perspective: "500px" }}
    >
      <motion.span
        className={`inline-block ${dim ? "text-white/28" : "text-white"}`}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={inView ? { rotateX: 0, opacity: 1 } : {}}
        transition={{ duration: 0.65, delay, type: "spring", bounce: 0.35 }}
        style={{ transformOrigin: "50% 100%", display: "inline-block" }}
      >
        {word}
      </motion.span>
    </span>
  );
}

/** Terminal-style type-in line */
function TerminalLine({ code, note, delay = 0 }: { code: string; note: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        setChars((p) => {
          if (p >= code.length) { clearInterval(id); return p; }
          return p + 1;
        });
      }, 26);
      return () => clearInterval(id);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, code, delay]);

  const done = chars >= code.length;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-4 border border-white/6 rounded-xl px-5 py-4 hover:border-green-400/20 hover:bg-green-400/[0.018] transition-colors group"
    >
      <span className="text-green-400/55 text-[11px] font-mono shrink-0 pt-0.5 group-hover:text-green-400/90 transition-colors">$</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-mono text-white/75 group-hover:text-green-400/80 transition-colors">
          {code.slice(0, chars)}
          {!done && (
            <span className="inline-block w-1.5 h-3 bg-green-400/70 ml-0.5 align-[-1px] animate-blink rounded-sm" />
          )}
        </div>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-1.5 text-[11px] text-white/30"
          >
            // {note}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ────────────────────── ABOUT / STATEMENT ─────────────────── */

export function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 40 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setGlow({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#080808] px-6 py-28 md:px-10 md:py-36 overflow-hidden"
    >
      {/* ── Layer 1: floating code tokens ── */}
      <FloatingCodeBg />

      {/* ── Layer 2: mouse-following radial glow ── */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(74,222,128,0.045), transparent 65%)`,
        }}
      />

      {/* ── Layer 3: subtle grid ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,222,128,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Eyebrow */}
        <FadeUp>
          <p className="text-[11px] uppercase tracking-[0.6em] text-white/30 mb-10">
            <span className="text-green-400/60 mr-2">//</span>
            <ScrambleText text="About me" className="text-white/30" />
          </p>
        </FadeUp>

        {/* 3D word-flip headline */}
        <div className="mb-16" style={{ perspective: "1000px" }}>
          <div className="text-[clamp(2.2rem,5.5vw,5rem)] font-semibold leading-[1.15] tracking-tight mb-1">
            <Word3D word="4+"      delay={0}    />
            <Word3D word="years"   delay={0.06} />
            <Word3D word="making"  delay={0.12} />
            <Word3D word="users"   delay={0.18} />
          </div>
          <div className="text-[clamp(2.2rem,5.5vw,5rem)] font-semibold leading-[1.15] tracking-tight">
            <Word3D word="click,"  delay={0.25} dim />
            <Word3D word="scroll"  delay={0.31} dim />
            <Word3D word="and"     delay={0.37} dim />
            <Word3D word="convert." delay={0.43} dim />
          </div>
        </div>

        {/* Stats — glowing border cells */}
        <StaggerList className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-16 border border-white/8">
          {[
            { n: 4,  suffix: "+", label: "Years exp" },
            { n: 4,  suffix: "",  label: "Companies" },
            { n: 100, suffix: "K+", label: "Daily txns" },
            { n: 30, suffix: "%", label: "Faster response" },
          ].map(({ n, suffix, label }) => (
            <StaggerItem key={label} className="relative group bg-white/[0.025] px-7 py-8 overflow-hidden hover:bg-white/[0.05] transition-colors">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(74,222,128,0.08), transparent 70%)" }} />
              <div className="relative text-3xl md:text-4xl font-semibold text-white font-mono">
                <CountUp to={n} suffix={suffix} />
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.4em] text-white/30">{label}</div>
            </StaggerItem>
          ))}
        </StaggerList>

        {/* Bio + Terminal manifesto */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <FadeUp delay={0.08}>
            <p className="text-base leading-[1.85] text-white/55">
              I'm Rishabh — a frontend engineer with 4+ years across DBaaS platforms,
              internal dashboards, banking products, and high-traffic consumer apps.
              I work deeply with{" "}
              <span className="text-green-400/75">React</span>,{" "}
              <span className="text-green-400/75">TypeScript</span>, Redux, API integration,
              responsive design, and production UI architecture.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-white/30">
              MCA from Medicaps University. Currently building cloud database workflows,
              multi-cloud onboarding, and AI assistant experiences at Tessell.{" "}
              <span className="text-green-400/50">Available for roles.</span>
            </p>
          </FadeUp>

          <div className="flex flex-col gap-3">
            <TerminalLine code="db_workflows()"      note="Provisioning, resize flows, tenant onboarding" delay={0.1}  />
            <TerminalLine code="consumer_apps()"     note="Booking, payments, campaigns, onboarding"      delay={0.35} />
            <TerminalLine code="secure_systems()"    note=".NET, MySQL, API integration, state management" delay={0.6}  />
            <TerminalLine code="ai_interfaces()"     note="Text, image, and audio assistant experiences"  delay={0.85} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── SERVICES ─────────────────────────── */

export function ServicesSection() {
  return (
    <section className="bg-[#0c0c0c] px-6 pb-28 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Divider />
        <FadeUp className="mt-14 mb-10">
          <p className="text-[11px] uppercase tracking-[0.6em] text-white/30">
            <span className="text-green-400/60 mr-2">//</span>
            <ScrambleText text="What I help with" />
          </p>
        </FadeUp>

        <div className="divide-y divide-white/8">
          {SERVICES.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.07}>
              <div className="group flex flex-col md:flex-row md:items-start gap-4 py-8 cursor-default -mx-6 px-6 md:-mx-10 md:px-10 hover:bg-white/[0.018] transition-colors">
                <span className="text-[11px] text-green-400/40 tracking-widest shrink-0 pt-1 w-8 font-mono">{s.num}</span>
                <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-white transition-colors md:w-64 shrink-0">
                  {s.title}
                </h3>
                <p className="text-white/40 leading-relaxed md:ml-auto md:max-w-lg text-sm">{s.desc}</p>
                <span className="hidden md:block text-white/10 group-hover:text-white/30 transition-colors text-lg self-center ml-4">↗</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Spring card variants (adapted from Framer scroll-triggered) */

const CARD_VARIANTS = {
  offscreen: {
    y: 180,
    opacity: 0,
    rotate: -4,
    scale: 0.94,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      bounce: 0.28,
      duration: 0.95,
    },
  },
};

function WorkDetailsModal({
  item,
  onClose,
}: {
  item: ExperienceItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[9992] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            role="dialog"
            aria-modal="true"
            aria-labelledby={`work-modal-${item.company}`}
            className="relative max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-[#0b0f14] shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close work details"
              onClick={onClose}
              className="absolute right-4 top-1.5 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-sm text-white/50 transition-colors hover:border-white/25 hover:text-white"
            >
              x
            </button>

            <div className="flex h-11 items-center gap-2 border-b border-white/8 bg-[#111821] px-4">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-300/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
              <div className="ml-4 flex h-full items-end">
                <div className="border-x border-t border-white/8 bg-[#0b0f14] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/45">
                  {item.company.toLowerCase()}.workspace
                </div>
              </div>
            </div>

            <div className="grid max-h-[calc(88vh-44px)] overflow-y-auto md:grid-cols-[240px_1fr]">
              <aside className="border-b border-white/8 bg-[#0e141b] p-6 md:border-b-0 md:border-r">
                <div className="relative mb-6 h-10 w-32 overflow-hidden">
                  <Image
                    src={item.logo}
                    alt={item.company}
                    fill
                    className="object-contain object-left"
                    style={{ filter: "invert(1)", mixBlendMode: "screen", opacity: 0.75 }}
                  />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-green-400/45">
                  {item.idx} / {item.duration}
                </div>
                <h3
                  id={`work-modal-${item.company}`}
                  className="mt-4 text-3xl font-semibold tracking-tight text-white"
                >
                  {item.company}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/35">{item.fullName}</p>
                <p className="mt-6 text-sm font-medium text-white/65">{item.role}</p>
                <div className="mt-8 rounded-md border border-white/8 bg-black/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/25">
                    request
                  </div>
                  <div className="mt-3 flex items-center gap-2 font-mono text-xs">
                    <span className="rounded bg-orange-400/12 px-2 py-1 text-orange-300/80">GET</span>
                    <span className="truncate text-white/45">/{item.company.toLowerCase()}/details</span>
                  </div>
                </div>
              </aside>

              <div className="p-7 md:p-9">
                <div className="mb-6 rounded-md border border-white/8 bg-[#05070a] font-mono">
                  <div className="flex items-center justify-between border-b border-white/8 px-4 py-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">response.json</span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-green-400/55">200 OK</span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-xs leading-6 text-white/50">
{`{
  "company": "${item.company}",
  "role": "${item.role}",
  "duration": "${item.duration}",
  "status": "${item.active ? "active" : "shipped"}"
}`}
                  </pre>
                </div>

                <p className="max-w-2xl text-base leading-relaxed text-white/58">
                  {item.desc}
                </p>

                <div className="mt-8">
                  <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.35em] text-white/25">
                    Highlights
                  </p>
                  <div className="space-y-3">
                    {item.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex gap-3 rounded-md border border-white/6 bg-[#111821]/70 px-4 py-3"
                      >
                        <span className="font-mono text-xs text-green-400/60">✓</span>
                        <p className="text-sm leading-relaxed text-white/48">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.35em] text-white/25">
                    Tech stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-white/8 bg-[#111821] px-2.5 py-1 text-[10px] font-mono text-white/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.35em] text-white/25">
                    Project URLs
                  </p>
                  {item.links?.length ? (
                    <div className="flex flex-wrap gap-3">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md border border-orange-400/25 bg-orange-400/[0.05] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.25em] text-orange-200/75 transition-colors hover:border-orange-300/45 hover:text-orange-100"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-white/35">
                      Internal or client-owned project. Public URL is not available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────── WORKS — stacked spring cards + timeline ───────── */

export function WorksSection() {
  const [selectedWork, setSelectedWork] = useState<ExperienceItem | null>(null);

  return (
    <section id="works" className="bg-[#0a0a0a] px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <FadeUp>
            <p className="text-[11px] uppercase tracking-[0.6em] text-white/30 mb-4">
              <span className="text-green-400/60 mr-2">//</span>
              <ScrambleText text="Work" />
            </p>
            <RevealLine>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tight text-white">
                Companies I've shipped for.
              </h2>
            </RevealLine>
          </FadeUp>
          <FadeUp delay={0.1} className="hidden md:block shrink-0">
            <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/20">
              {EXPERIENCE.length} roles · {new Date().getFullYear() - 2021}+ yrs
            </span>
          </FadeUp>
        </div>

        {/* IDE-style workspace */}
        <div className="mb-24 overflow-hidden rounded-lg border border-white/10 bg-[#0b0f14] shadow-2xl">
          <div className="flex h-11 items-center gap-2 border-b border-white/8 bg-[#111821] px-4">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-amber-300/70" />
            <span className="h-3 w-3 rounded-full bg-green-400/70" />
            <div className="ml-4 hidden h-full items-end gap-0 md:flex">
              <div className="border-x border-t border-white/8 bg-[#0b0f14] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/50">
                experience.tsx
              </div>
              <div className="border-r border-t border-white/8 bg-[#151d27] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/25">
                requests.postman
              </div>
            </div>
            <span className="ml-auto text-[10px] font-mono uppercase tracking-[0.28em] text-green-400/40">
              portfolio workspace
            </span>
          </div>

          <div className="grid md:grid-cols-[190px_1fr]">
            <aside className="hidden border-r border-white/8 bg-[#0e141b] p-4 md:block">
              <div className="mb-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/25">
                Explorer
              </div>
              {EXPERIENCE.map((item) => (
                <button
                  key={item.company}
                  type="button"
                  onClick={() => setSelectedWork(item)}
                  className="mb-1 flex w-full items-center gap-2 rounded px-2 py-2 text-left text-xs text-white/42 transition-colors hover:bg-white/[0.04] hover:text-white/70"
                >
                  <span className="text-green-400/45">▸</span>
                  <span>{item.company.toLowerCase()}.json</span>
                </button>
              ))}
            </aside>

            <div className="divide-y divide-white/8">
              {EXPERIENCE.map((item) => (
                <motion.article
                  key={item.company}
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ amount: 0.25, once: false }}
                  variants={CARD_VARIANTS}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${item.company} project details`}
                  onClick={() => setSelectedWork(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedWork(item);
                    }
                  }}
                  className="group relative cursor-pointer bg-[#0b0f14] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400/45"
                  whileHover={{
                    backgroundColor: item.active ? "rgba(74,222,128,0.045)" : "rgba(255,255,255,0.028)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="grid gap-0 md:grid-cols-[96px_1fr]">
                    <div className="flex items-center justify-between gap-4 border-b border-white/8 bg-[#101720] px-5 py-4 md:flex-col md:items-center md:justify-center md:gap-5 md:border-b-0 md:border-r md:px-4">
                      <span className="font-mono text-[11px] leading-none text-white/25">{item.idx.padStart(2, "0")}</span>
                      <span className="rounded bg-orange-400/10 px-2.5 py-1.5 text-[10px] font-mono leading-none text-orange-300/70">
                        GET
                      </span>
                    </div>

                    <div className="p-5 md:p-6">
                      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <div className="mb-2 flex items-center gap-3">
                            <div className="relative h-6 w-20 overflow-hidden">
                              <Image
                                src={item.logo}
                                alt={item.company}
                                fill
                                className="object-contain object-left"
                                style={{ filter: "invert(1)", mixBlendMode: "screen", opacity: 0.65 }}
                              />
                            </div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
                              /api/work/{item.company.toLowerCase()}
                            </span>
                          </div>
                          <h3 className={`text-xl font-semibold text-white transition-colors ${item.color}`}>
                            {item.company}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-white/32">{item.fullName}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {item.active && (
                            <span className="flex items-center gap-1 rounded border border-green-500/25 bg-green-500/10 px-2 py-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-green-400">active</span>
                            </span>
                          )}
                          <span className="rounded border border-white/8 bg-white/[0.025] px-2 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">
                            {item.duration}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-md border border-white/8 bg-[#05070a] p-4">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="font-mono text-xs text-blue-300/70">const role</span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-green-400/45">click to inspect</span>
                        </div>
                        <p className="text-sm leading-relaxed text-white/45">{item.role} — {item.desc}</p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span key={t} className="rounded border border-white/8 bg-[#111821] px-2.5 py-1 text-[10px] font-mono text-white/40">
                            {t}
                          </span>
                        ))}
                      </div>
                      {item.links && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {item.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className="text-[10px] font-mono uppercase tracking-[0.25em] text-orange-300/60 transition-colors hover:text-orange-200"
                            >
                              {link.label} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

      </div>
      <WorkDetailsModal item={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  );
}

/* ──────────────────────── CONTACT ──────────────────────────── */

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#0c0c0c] px-6 py-28 md:px-10 md:py-36 overflow-hidden">
      {/* Full-section background — covers entire contact area, stronger on the left */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/contactpage.jpeg"
          alt=""
          fill
          className="object-cover object-[22%_center] opacity-[0.42] scale-[1.08]"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c]/40 via-[#0c0c0c]/88 to-[#0c0c0c]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/20 via-transparent to-[#0c0c0c]/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <Divider />

        <div className="relative mt-20">
            <FadeUp>
              <p className="text-[11px] uppercase tracking-[0.6em] text-white/30 mb-10">
                <span className="text-green-400/60 mr-2">//</span>
                <ScrambleText text="Contact" />
              </p>
            </FadeUp>

            <div className="space-y-1 mb-6">
              <RevealLine>
                <h2 className="text-[clamp(2.2rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
                  Let's build something
                </h2>
              </RevealLine>
              <RevealLine delay={0.07}>
                <h2 className="text-[clamp(2.2rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-white/25">
                  people remember<span className="text-green-400 animate-blink">.</span>
                </h2>
              </RevealLine>
            </div>

            <FadeUp delay={0.12}>
              <p className="text-sm text-white/35 mb-12 max-w-md leading-relaxed">
                Open to frontend / fullstack roles and collaboration.
                <br />
                <span className="text-green-400/60">Available now.</span>
              </p>
            </FadeUp>

            <StaggerList className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <StaggerItem>
                <a
                  data-cursor="floating"
                  href="mailto:porwal027@gmail.com"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase text-black hover:bg-white/85 transition-colors"
                >
                  <span className="text-black/40 font-mono text-xs">→</span>
                  porwal027@gmail.com
                </a>
              </StaggerItem>
              <StaggerItem>
                <a
                  data-cursor="floating"
                  href="https://www.linkedin.com/in/rishabhdapkara"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-4 text-sm uppercase tracking-[0.2em] text-white/45 hover:text-white hover:border-white/30 transition-colors font-mono"
                >
                  LinkedIn ↗
                </a>
              </StaggerItem>
              <StaggerItem>
                <a
                  data-cursor="floating"
                  href="https://github.com/RISHABHPORWAL027"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-4 text-sm uppercase tracking-[0.2em] text-white/45 hover:text-white hover:border-white/30 transition-colors font-mono"
                >
                  GitHub ↗
                </a>
              </StaggerItem>
            </StaggerList>
        </div>

        {/* Footer */}
        <FadeUp delay={0.15}>
          <div className="mt-28 flex flex-col md:flex-row justify-between items-start gap-4 border-t border-white/8 pt-10 text-[11px] font-mono uppercase tracking-[0.3em] text-white/20">
            <span>© {new Date().getFullYear()} Rishabh Dapkara</span>
            <span className="text-green-400/30">status: available_for_work</span>
            <span>Frontend · Fullstack · AI</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
