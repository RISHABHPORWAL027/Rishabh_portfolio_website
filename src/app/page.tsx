"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Nav from "@/components/Nav";
import ScrollTicker from "@/components/ScrollTicker";
import TypewriterCorner from "@/components/TypewriterCorner";
import BugEasterEgg from "@/components/BugEasterEgg";
import {
  StatementSection,
  ServicesSection,
  WorksSection,
  ContactSection,
} from "@/components/Sections";

/* ─── Banner: scroll-driven text phases ──────────────────── */

function Banner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  // Local scroll progress scoped only to the banner section
  const { scrollYProgress: rawProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(rawProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  // Smooth canvas frames from 0–240 driven by banner scroll
  useMotionValueEvent(progress, "change", () => {});

  // ── Phase opacities ──────────────────────────────────────
  // Phase 1: Name     (  0% → 30% visible, fades 30–40%)
  const p1 = useTransform(progress, [0, 0.04, 0.28, 0.40], [0, 1, 1, 0]);
  const p1y = useTransform(progress, [0, 0.04], [24, 0]);

  // Phase 2: Role tag (28% → 55% visible, fades 55–65%)
  const p2 = useTransform(progress, [0.28, 0.36, 0.53, 0.63], [0, 1, 1, 0]);
  const p2y = useTransform(progress, [0.28, 0.38], [24, 0]);

  // Phase 3: Stack    (52% → 77% visible, fades 77–87%)
  const p3 = useTransform(progress, [0.52, 0.60, 0.75, 0.85], [0, 1, 1, 0]);
  const p3y = useTransform(progress, [0.52, 0.62], [24, 0]);

  // Phase 4: CTAs     (78% → end, no fade out)
  const p4 = useTransform(progress, [0.78, 0.88], [0, 1]);
  const p4y = useTransform(progress, [0.78, 0.88], [24, 0]);

  // Scroll hint fades after initial movement
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  return (
    // Tall section — 500vh gives the scroll breathing room for 4 text phases
    <section id="home" ref={bannerRef} className="relative h-[500vh] w-full">

      {/* Sticky viewport — everything inside sticks while scrolling through 500vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas background: frames 0–240 driven by THIS banner's scroll */}
        <ScrollyCanvas
          scrollProgress={progress}
          totalFrames={240}
          baseUrl="/sequence/homepage_img/"
          getFrameSrc={(i) =>
            `/sequence/homepage_img/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.jpg`
          }
          fallbackImage="/A_smooth_cinematic_202604182116-ezgif.com-video-to-webp-converter.webp"
        />

        {/* Gradient overlays for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/50" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        {/* ── Text overlay container ── */}
        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-16 pointer-events-none">

          {/* Phase 1 — Giant name */}
          <motion.div
            style={{ opacity: p1, y: p1y }}
            className="absolute bottom-[15vh] left-6 md:left-16"
          >
            <div className="text-[10px] text-white/40 tracking-[0.6em] uppercase mb-4">
              // Frontend Engineer · Fullstack · AI Developer
            </div>
            <h1
              className="font-bold leading-[0.9] tracking-tight text-white"
              style={{ fontSize: "clamp(3.8rem, 13vw, 12rem)" }}
            >
              RISHABH
            </h1>
            <h1
              className="font-bold leading-[0.9] tracking-tight text-white/25"
              style={{ fontSize: "clamp(3.8rem, 13vw, 12rem)" }}
            >
              DAPKARA
            </h1>
          </motion.div>

          {/* Phase 2 — Role statement */}
          <motion.div
            style={{ opacity: p2, y: p2y }}
            className="absolute bottom-[20vh] left-6 md:left-16 max-w-2xl"
          >
            <div className="text-[10px] text-white/35 tracking-[0.6em] uppercase mb-5">
              // 4+ years in production
            </div>
            <p
              className="font-medium text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
            >
              Building interfaces
              <br />
              <span className="text-white/35">that convert.</span>
            </p>
          </motion.div>

          {/* Phase 3 — Tech stack reveal */}
          <motion.div
            style={{ opacity: p3, y: p3y }}
            className="absolute bottom-[20vh] left-6 md:left-16 max-w-3xl"
          >
            <div className="text-[10px] text-white/35 tracking-[0.6em] uppercase mb-6">
              // Stack
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                "React.js",
                "Next.js",
                "TypeScript",
                "Redux Toolkit",
                "Material UI",
                "REST APIs",
                "Webpack",
                "AI Chatbot",
              ].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[clamp(1.1rem,2.5vw,2rem)] font-light text-white/80 tracking-wide"
                >
                  {tech}
                  {i < 7 && <span className="text-white/20 ml-6">·</span>}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Phase 4 — CTAs */}
          <motion.div
            style={{ opacity: p4, y: p4y }}
            className="pointer-events-auto absolute bottom-[12vh] left-6 md:left-16"
          >
            <div className="text-[10px] text-white/35 tracking-[0.6em] uppercase mb-6">
              // Ready to ship
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                data-cursor="floating"
                href="#works"
                className="rounded-full border border-white/20 bg-white/8 px-7 py-3.5 text-sm font-medium tracking-[0.18em] uppercase text-white/80 backdrop-blur hover:bg-white/15 hover:border-white/40 transition-all"
              >
                View work
              </a>
              <a
                data-cursor="floating"
                href="mailto:porwal027@gmail.com"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-[0.18em] uppercase text-black hover:bg-white/85 transition-all"
              >
                Hire me
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Bug Easter Egg: bottom-RIGHT, always visible across entire banner ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="pointer-events-auto absolute bottom-[12vh] right-6 md:right-16"
        >
          <BugEasterEgg />
        </motion.div>

        {/* ── Typewriter: bottom-LEFT, always visible in banner ── */}
        <TypewriterCorner />

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-6 right-8 flex flex-col items-center gap-2"
        >
          <div className="h-12 w-px bg-gradient-to-b from-transparent to-white/40 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.6em] text-white/30">scroll</span>
        </motion.div>

        {/* Progress bar: thin line at top showing banner scroll progress */}
        <motion.div
          className="pointer-events-none absolute top-0 left-0 h-[2px] bg-white/30"
          style={{ scaleX: progress, transformOrigin: "left" }}
        />
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────── */

function HomeRedirectsToTop() {
  useEffect(() => {
    const scrollHomeToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    if (window.location.hash === "#home") {
      requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0 }));
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest('a[href="#home"], a[href="/"], a[href="/#home"]')
        : null;

      if (!(target instanceof HTMLAnchorElement)) return;

      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname && url.pathname !== "/") return;

      event.preventDefault();
      window.history.pushState(null, "", "/#home");
      scrollHomeToTop();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0a]">
      <HomeRedirectsToTop />
      <Nav />

      {/* ══ BANNER (scroll-driven image sequence + text phases) ══ */}
      <Banner />

      {/* ══ SCROLL TICKER (bidirectional tech stack) ══ */}
      <ScrollTicker />

      {/* ══ REST OF SITE (solid dark background) ══ */}
      <div className="relative bg-[#0a0a0a]">
        <StatementSection />
        <ServicesSection />
        <WorksSection />
        <ContactSection />
      </div>
    </main>
  );
}
