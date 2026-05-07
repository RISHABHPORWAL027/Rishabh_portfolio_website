"use client";

import React, { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor = () => {
  // Smooth springs for the cursor's coordinates and dimensions
  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorWidth = useSpring(16, { stiffness: 300, damping: 20 });
  const cursorHeight = useSpring(16, { stiffness: 300, damping: 20 });
  const cursorBorderRadius = useSpring(50, { stiffness: 300, damping: 20 });
  
  // We use opacity so the halo isn't pure white when covering a large object
  const cursorOpacity = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for elements marked as a "floating target"
      const floatingTarget = target.closest('[data-cursor="floating"]') as HTMLElement;
      
      if (floatingTarget) {
        // Floating Target logic: Cursor SNAPS to match the element's exact bounding box
        const rect = floatingTarget.getBoundingClientRect();
        
        // Grab the element's actual border radius so the cursor wraps it perfectly
        const computedStyle = window.getComputedStyle(floatingTarget);
        const radius = parseFloat(computedStyle.borderRadius) || 8;

        cursorX.set(rect.left);
        cursorY.set(rect.top);
        cursorWidth.set(rect.width);
        cursorHeight.set(rect.height);
        cursorBorderRadius.set(radius);
        cursorOpacity.set(0.15); // Make it a translucent halo
      } else {
        // Normal state: Small dot tracking the exact mouse center
        cursorX.set(e.clientX - 8);
        cursorY.set(e.clientY - 8);
        cursorWidth.set(16);
        cursorHeight.set(16);
        cursorBorderRadius.set(50);
        cursorOpacity.set(1);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [cursorX, cursorY, cursorWidth, cursorHeight, cursorBorderRadius, cursorOpacity]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorX,
        y: cursorY,
        width: cursorWidth,
        height: cursorHeight,
        borderRadius: cursorBorderRadius,
        opacity: cursorOpacity,
        backgroundColor: "white",
        mixBlendMode: "difference", // Premium color inversion effect!
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};
