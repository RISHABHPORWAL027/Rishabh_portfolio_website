"use client";

import React, { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
  totalFrames: number;
  baseUrl: string;
  fallbackImage?: string;
  /**
   * Optional custom frame resolver. If provided, `baseUrl` is ignored.
   * Use this to support arbitrary frame naming schemes.
   */
  getFrameSrc?: (frameIndex: number) => string;
  /**
   * Optional external scroll progress (0..1). If provided, the component
   * will render as a full-screen canvas without adding its own scroll height.
   */
  scrollProgress?: MotionValue<number>;
}

const ScrollyCanvas: React.FC<ScrollyCanvasProps> = ({
  totalFrames,
  baseUrl,
  fallbackImage,
  getFrameSrc,
  scrollProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress: internalScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeScrollProgress = scrollProgress ?? internalScrollYProgress;

  // Map scroll progress (0-1) to frame index (0-totalFrames)
  const frameIndex = useTransform(activeScrollProgress, [0, 1], [0, totalFrames - 1]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        if (getFrameSrc) {
          img.src = getFrameSrc(i);
        } else {
          // Default pattern: frame_00_delay-0.067s.webp
          const frameStr = i.toString().padStart(2, "0");
          img.src = `${baseUrl}frame_${frameStr}_delay-0.067s.webp`;
        }
        
        const promise = new Promise((resolve) => {
          img.onload = () => resolve(img);
          img.onerror = () => {
             console.error(`Failed to load: ${img.src}`);
             resolve(null); // Continue anyway
          };
        });
        promises.push(promise);
        loadedImages.push(img);
      }

      const results = await Promise.all(promises);
      const successfulFrames = results.filter(img => img !== null);

      if (successfulFrames.length === 0 && fallbackImage) {
        // Pivot to fallback mode
        setImages([]);
        setIsLoaded(true);
      } else {
        setImages(loadedImages);
        setIsLoaded(true);
      }
    };

    preloadImages();
  }, [totalFrames, baseUrl, getFrameSrc, fallbackImage]);

  // Render function
  const render = (index: number) => {
    if (!canvasRef.current || images.length <= 1) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = images.length === 1 ? images[0] : images[Math.round(index)];
    if (!img) return;

    // Object-fit: cover logic
    const canvas = canvasRef.current;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Update canvas on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => render(latest));
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render(frameIndex.get());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded]);

  const CanvasLayer = (
    <div className="relative h-screen w-full overflow-hidden">
      {images.length > 0 ? (
        <canvas ref={canvasRef} className="h-full w-full object-cover" />
      ) : fallbackImage ? (
        <img src={fallbackImage} alt="Cinematic Background" className="h-full w-full object-cover" />
      ) : null}

      {/* Vignette & Noise Overlay for Premium feel */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(18,18,18,0.4)_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
            <div className="text-white text-xs font-semibold tracking-[0.4em] uppercase">
              Initializing Artifacts
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // If external scroll is driving this, render only the canvas layer (no extra scroll height).
  if (scrollProgress) return CanvasLayer;

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0">{CanvasLayer}</div>
    </div>
  );
};

export default ScrollyCanvas;
