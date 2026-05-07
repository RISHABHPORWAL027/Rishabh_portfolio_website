"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Types ─────────────────────────────────────────────────── */
interface Bug {
  id: number;
  emoji: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  rotation: number;
  alive: boolean;
}

interface Splat {
  id: number;
  x: number;
  y: number;
}

type Stage = "idle" | "hunting" | "won";

/* ─── Helpers ────────────────────────────────────────────────── */
const BUG_EMOJIS = ["🪲", "🐜", "🦟", "🐛"];

const randX = () =>
  Math.random() * (typeof window !== "undefined" ? window.innerWidth - 100 : 1200) + 40;
const randY = () =>
  Math.random() * (typeof window !== "undefined" ? window.innerHeight - 100 : 700) + 40;

function newTarget(bug: Bug): Pick<Bug, "targetX" | "targetY" | "rotation"> {
  return {
    targetX: randX(),
    targetY: randY(),
    rotation: Math.random() * 360,
  };
}

/* ─── Confetti particle ──────────────────────────────────────── */
const CONFETTI_ITEMS = ["🎉", "🎊", "✨", "⭐", "💚", "🌟", "🎯", "💥"];
function Confetti() {
  const pieces = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    emoji: CONFETTI_ITEMS[i % CONFETTI_ITEMS.length],
    x: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 1.8 + Math.random() * 1.2,
    rotation: Math.random() * 720 - 360,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 z-[9990] overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-2xl select-none"
          style={{ left: `${p.x}%`, top: "-5%" }}
          animate={{ y: "110vh", rotate: p.rotation, opacity: [1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "linear" }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */
export default function BugEasterEgg() {
  const [stage, setStage] = useState<Stage>("idle");
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [splats, setSplats] = useState<Splat[]>([]);
  const [hammerPos, setHammerPos] = useState({ x: -200, y: -200 });
  const [hammerSwing, setHammerSwing] = useState(false);
  const [solved, setSolved] = useState(false);
  const splatId = useRef(0);
  const wanderTimers = useRef<NodeJS.Timeout[]>([]);

  /* ── Activate ── */
  const activate = useCallback(() => {
    const initial = BUG_EMOJIS.map((emoji, i) => ({
      id: i,
      emoji,
      x: randX(),
      y: randY(),
      targetX: randX(),
      targetY: randY(),
      rotation: Math.random() * 360,
      alive: true,
    }));
    setBugs(initial);
    setStage("hunting");
  }, []);

  /* ── Bug wandering – each bug picks a new target on interval ── */
  useEffect(() => {
    if (stage !== "hunting") return;
    wanderTimers.current.forEach(clearInterval);
    wanderTimers.current = bugs.map((bug) =>
      setInterval(() => {
        setBugs((prev) =>
          prev.map((b) =>
            b.id === bug.id && b.alive ? { ...b, ...newTarget(b) } : b
          )
        );
      }, 1500 + Math.random() * 1500)
    );
    return () => wanderTimers.current.forEach(clearInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  /* ── Track mouse (hammer) ── */
  useEffect(() => {
    if (stage !== "hunting") return;
    const onMove = (e: MouseEvent) =>
      setHammerPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [stage]);

  /* ── Kill a bug ── */
  const killBug = useCallback(
    (id: number, ex: number, ey: number) => {
      setHammerSwing(true);
      setTimeout(() => setHammerSwing(false), 300);

      // Splat FX
      const sid = splatId.current++;
      setSplats((p) => [...p, { id: sid, x: ex, y: ey }]);
      setTimeout(() => setSplats((p) => p.filter((s) => s.id !== sid)), 700);

      setBugs((prev) => {
        const next = prev.map((b) => (b.id === id ? { ...b, alive: false } : b));
        if (next.every((b) => !b.alive)) {
          setTimeout(() => setStage("won"), 600);
        }
        return next;
      });
    },
    []
  );

  /* ── Reset / dismiss win screen for the current page view only ── */
  const reset = useCallback(() => {
    setBugs([]);
    setSplats([]);
    setSolved(true);
  }, []);

  if (solved) return null;

  return (
    <>
      {/* ── Warning button ── */}
      <motion.button
        onClick={stage === "idle" ? activate : undefined}
        className={`pointer-events-auto group flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-[11px] font-mono uppercase tracking-[0.25em] backdrop-blur transition-all duration-300 select-none ${
          stage === "idle"
            ? "border-amber-500/30 bg-amber-400/5 text-amber-400/70 hover:border-amber-400/60 hover:bg-amber-400/10 hover:text-amber-300 cursor-pointer"
            : stage === "hunting"
            ? "border-red-500/40 bg-red-400/8 text-red-400/80 cursor-default animate-pulse"
            : "border-green-500/40 bg-green-400/8 text-green-400/80 cursor-default"
        }`}
      >
        {stage === "idle" && (
          <>
            <span className="animate-pulse">⚠️</span>
            <span>Don't touch — there's a bug on this site</span>
          </>
        )}
        {stage === "hunting" && (
          <>
            <span>🐛</span>
            <span>Click on them to squish the bugs!</span>
            <span className="ml-1 text-white/20">
              ({bugs.filter((b) => b.alive).length} left)
            </span>
          </>
        )}
        {stage === "won" && (
          <>
            <span>✅</span>
            <span>All bugs squished!</span>
          </>
        )}
      </motion.button>

      {/* ── Bugs ── */}
      <AnimatePresence>
        {bugs.map((bug) =>
          bug.alive ? (
            <motion.button
              key={bug.id}
              className="fixed z-[9985] select-none focus:outline-none leading-none"
              style={{ top: 0, left: 0, fontSize: "3.5rem", filter: "drop-shadow(0 0 12px rgba(0,255,80,0.5))" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                x: bug.targetX,
                y: bug.targetY,
                scale: 1,
                opacity: 1,
                rotate: bug.rotation,
              }}
              exit={{ scale: 2.8, opacity: 0, transition: { duration: 0.25 } }}
              transition={{
                x: { duration: 1.4, ease: "linear" },
                y: { duration: 1.4, ease: "linear" },
                rotate: { duration: 1.4, ease: "linear" },
                scale: { duration: 0.35, type: "spring", bounce: 0.5 },
                opacity: { duration: 0.3 },
              }}
              onClick={(e) => {
                e.stopPropagation();
                killBug(bug.id, e.clientX, e.clientY);
              }}
              whileHover={{ scale: 1.5, filter: "drop-shadow(0 0 20px rgba(255,100,0,0.8))" }}
            >
              {bug.emoji}
            </motion.button>
          ) : (
            <motion.div
              key={`dead-${bug.id}`}
              className="fixed z-[9985] select-none pointer-events-none leading-none"
              style={{ x: bug.targetX, y: bug.targetY, top: 0, left: 0, fontSize: "3.5rem" }}
              initial={{ scale: 1.5, rotate: 0, opacity: 1 }}
              animate={{ scale: 0, rotate: 200, opacity: 0 }}
              transition={{ duration: 0.4, ease: "backIn" }}
            >
              {bug.emoji}
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* ── Splat FX ── */}
      <AnimatePresence>
        {splats.map((s) => (
          <motion.div
            key={s.id}
            className="fixed z-[9990] pointer-events-none select-none leading-none"
            style={{ left: s.x - 24, top: s.y - 24, fontSize: "3rem" }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 2.2, 1.4], opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            💥
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Hammer cursor (only during hunt) ── */}
      {stage === "hunting" && (
        <motion.div
          className="fixed z-[9998] pointer-events-none select-none leading-none"
          style={{
            left: hammerPos.x - 16,
            top: hammerPos.y - 40,
            fontSize: "2.8rem",
          }}
          animate={hammerSwing ? { rotate: [0, -45, 20, 0], scale: [1, 1.5, 1] } : { rotate: -15 }}
          transition={{ duration: 0.22 }}
        >
          🔨
        </motion.div>
      )}

      {/* ── Win screen ── */}
      <AnimatePresence>
        {stage === "won" && (
          <>
            <Confetti />
            <motion.div
              className="fixed inset-0 z-[9991] flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={reset}
            >
              <motion.div
                className="text-center px-8"
                initial={{ scale: 0.5, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
              >
                <div className="text-7xl mb-4">🏆</div>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                  All Bugs Squished!
                </h2>
                <p className="text-green-400 font-mono text-sm tracking-[0.4em] uppercase mb-2">
                  // Bugs: 0 · Status: production_ready
                </p>
                <p className="text-white/35 text-xs font-mono mt-6 uppercase tracking-widest">
                  Click anywhere to dismiss
                </p>
              </motion.div>

              {/* Big emoji burst */}
              {["🎉", "🎊", "✨", "💪", "🚀"].map((e, i) => (
                <motion.span
                  key={i}
                  className="absolute text-5xl pointer-events-none"
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.5, 1],
                    x: [0, (i - 2) * 160],
                    y: [0, -120 + (i % 2) * 60],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 1.2 }}
                >
                  {e}
                </motion.span>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
