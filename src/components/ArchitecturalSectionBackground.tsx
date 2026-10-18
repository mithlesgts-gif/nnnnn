import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface ArchitecturalSectionBackgroundProps {
  image: string;
  secondaryImage?: string;
  theme?: 'light' | 'dark';
  alt?: string;
  className?: string;
  title?: string;
  location?: string;
  elevation?: string;
  showGrid?: boolean;
  showScanLine?: boolean;
}

export const ArchitecturalSectionBackground: React.FC<ArchitecturalSectionBackgroundProps> = ({
  image,
  secondaryImage,
  theme = 'light',
  alt = 'Architectural building framework and BIM coordination',
  className = '',
  title = 'Metropolitan High-Rise Superstructure',
  location = 'Jamshedpur / Global Delivery',
  elevation = 'DATUM: +68.400m',
  showGrid = false,
  showScanLine = true
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* 
        Single, Controlled Directional Entrance Animation with Viewport Once Trigger
        Completely stable once revealed - Zero shaking, vibrating, or continuous movement
      */}
      <motion.div
        initial={
          shouldReduceMotion
            ? { opacity: 0.85 }
            : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
        }
        animate={
          isInView
            ? {
                opacity: 1,
                clipPath: 'inset(0 0% 0 0)'
              }
            : {
                opacity: 0,
                clipPath: 'inset(0 100% 0 0)'
              }
        }
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="w-full h-full relative"
      >
        {/* Stable, stationary high-definition architectural construction image */}
        <img
          src={image}
          alt={alt}
          className={`w-full h-full object-cover object-center ${
            isDark
              ? 'opacity-90 filter brightness-[0.88] contrast-115 saturate-[1.05]'
              : 'opacity-85 filter brightness-[0.92] contrast-110 saturate-[1.05]'
          }`}
        />

        {/* 
          Targeted readability scrim: cool-blue architectural tone preserving authentic construction visibility
          while ensuring text meets WCAG AA standards
        */}
        {isDark ? (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/60 to-slate-950/40 pointer-events-none" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#DFEAF5]/88 via-[#EBF2F9]/65 to-[#DFEAF5]/40 pointer-events-none" />
        )}

        {/* Vertical vignette to blend cleanly with adjacent sections */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-gradient-to-b from-slate-950/65 via-transparent to-slate-950/75'
              : 'bg-gradient-to-b from-[#DFEAF5]/65 via-transparent to-[#DFEAF5]/75'
          } pointer-events-none`}
        />
      </motion.div>

      {/* Engineering Technical Coordinates Stamp */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="hidden md:flex absolute top-6 left-6 items-center gap-2 text-[10px] font-mono pointer-events-none z-10"
      >
        <span
          className={`px-2 py-0.5 rounded ${
            isDark
              ? 'bg-slate-900/90 text-blue-400 border border-blue-500/30'
              : 'bg-[#DFEAF5]/95 text-blue-700 border border-blue-300 shadow-xs'
          }`}
        >
          {elevation}
        </span>
        <span className={isDark ? 'text-slate-400' : 'text-slate-700 font-semibold'}>
          {title} · {location}
        </span>
      </motion.div>
    </div>
  );
};
