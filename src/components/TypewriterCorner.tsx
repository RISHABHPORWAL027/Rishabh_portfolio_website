"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  lines?: string[];
  typingMsPerChar?: number;
  pauseMsAfterLine?: number;
  pauseMsAfterCycle?: number;
};

export default function TypewriterCorner({
  lines,
  typingMsPerChar = 38,
  pauseMsAfterLine = 1200,
  pauseMsAfterCycle = 1800,
}: Props) {
  const script = useMemo(
    () =>
      lines ?? [
        "const expertise = 'Frontend + Fullstack';",
        "const stack = ['React', 'Next.js', 'TypeScript'];",
        "const approach = 'AI-assisted, production-ready';",
        "const status = 'available for work';",
        "// 4+ years shipping cinematic UIs",
      ],
    [lines]
  );

  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentLine = script[lineIdx] ?? "";
    const complete = !isDeleting && charIdx >= currentLine.length;
    const empty = isDeleting && charIdx <= 0;

    const delay = complete ? pauseMsAfterLine : empty ? 80 : typingMsPerChar;

    const t = window.setTimeout(() => {
      if (complete) { setIsDeleting(true); return; }
      if (empty) {
        setIsDeleting(false);
        const next = (lineIdx + 1) % script.length;
        setLineIdx(next);
        if (next === 0) window.setTimeout(() => setCharIdx(0), pauseMsAfterCycle);
        else setCharIdx(0);
        return;
      }
      setCharIdx((p) => p + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(t);
  }, [script, lineIdx, charIdx, isDeleting, typingMsPerChar, pauseMsAfterLine, pauseMsAfterCycle]);

  const text = (script[lineIdx] ?? "").slice(0, Math.max(0, charIdx));

  return (
    // bottom-LEFT corner
    <div className="pointer-events-none absolute bottom-6 left-6 z-20 max-w-[80vw] md:max-w-sm">
      <div className="rounded-xl border border-white/8 bg-black/50 px-4 py-3 backdrop-blur-md">
        {/* terminal header dots */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/8" />
          <span className="ml-2 text-[9px] uppercase tracking-[0.4em] text-white/20">terminal</span>
        </div>
        {/* code line */}
        <div className="text-[11px] md:text-xs font-mono text-green-400/80 leading-relaxed">
          <span className="text-white/25 mr-2">~$</span>
          {text}
          <span className="ml-0.5 inline-block h-3.5 w-[6px] align-[-1px] bg-green-400/70 animate-pulse rounded-sm" />
        </div>
      </div>
    </div>
  );
}
