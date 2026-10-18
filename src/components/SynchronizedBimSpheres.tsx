import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SynchronizedBimSpheresProps {
  className?: string;
  variant?: 'hero' | 'section' | 'subtle';
}

export const SynchronizedBimSpheres: React.FC<SynchronizedBimSpheresProps> = ({
  className = '',
  variant = 'section'
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {/* Synchronized Vector Path Lines Connecting Spatial Coordinate Points */}
      <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 1400 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bimSpherePathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#165DFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#2878FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Primary Spline Path with moving dash pattern */}
        <motion.path
          d="M -50,350 C 320,120 540,580 920,240 S 1320,440 1480,280"
          fill="none"
          stroke="url(#bimSpherePathGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* Secondary Orthogonal Construction Line */}
        <motion.path
          d="M 120,-30 C 420,380 820,160 1140,620"
          fill="none"
          stroke="#165DFF"
          strokeWidth="0.9"
          strokeDasharray="3 5"
          animate={{ strokeDashoffset: [0, 32] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        />

        {/* Connecting Radial Ray from Node 1 to Node 2 */}
        <motion.line
          x1="280"
          y1="180"
          x2="1080"
          y2="220"
          stroke="#38BDF8"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Sphere 1: Primary Sapphire Precision Node (Orbital & Depth Scaled Motion) */}
      <motion.div
        animate={{
          x: [0, 90, -50, 0],
          y: [0, -70, 50, 0],
          scale: [1, 1.25, 0.85, 1],
          opacity: [0.9, 1, 0.85, 0.9]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-28 left-[14%] w-9 h-9 rounded-full bg-gradient-to-tr from-[#165DFF] via-[#2878FF] to-white shadow-xl shadow-blue-500/40 flex items-center justify-center ring-2 ring-blue-400/50"
      >
        <span className="w-3 h-3 rounded-full bg-white/95 shadow-inner" />
        {/* Floating Precision Tag */}
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono font-bold text-blue-700 bg-white/90 border border-blue-200 px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap">
          XYZ: [142.4, 88.0, +34.5m]
        </span>
      </motion.div>

      {/* Sphere 2: Right Secondary Sky Blue Node (Synchronized Counter-Cycle with Depth Shift) */}
      <motion.div
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 60, -50, 0],
          scale: [1, 0.82, 1.18, 1],
          opacity: [0.85, 0.95, 1, 0.85]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-40 right-[16%] w-11 h-11 rounded-full bg-gradient-to-tr from-[#0B1530] via-[#165DFF] to-sky-300 shadow-2xl shadow-blue-900/35 flex items-center justify-center ring-2 ring-blue-300/60"
      >
        <span className="w-3.5 h-3.5 rounded-full bg-white/90" />
        {/* Elevation Datum Marker */}
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono font-bold text-blue-800 bg-white/90 border border-blue-200 px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap">
          DATUM: +42.000m · ±0mm
        </span>
      </motion.div>

      {/* Sphere 3: Lower Midfield Structural Anchor Sphere */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -35, 55, 0],
          scale: [1, 1.12, 0.92, 1]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-28 left-[24%] w-7 h-7 rounded-full bg-gradient-to-br from-[#2878FF] to-[#165DFF] shadow-lg shadow-blue-600/30 ring-1 ring-white/70 flex items-center justify-center"
      >
        <span className="w-2 h-2 rounded-full bg-white/90" />
      </motion.div>

      {/* Sphere 4: Far Right Micro Elevation Node */}
      <motion.div
        animate={{
          x: [0, -45, 35, 0],
          y: [0, 45, -35, 0],
          scale: [1, 0.88, 1.15, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-36 right-[20%] w-8 h-8 rounded-full bg-gradient-to-bl from-white via-sky-400 to-[#165DFF] shadow-lg shadow-blue-500/25 ring-1 ring-blue-300/60 flex items-center justify-center"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-blue-900/80" />
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] font-mono text-slate-500 bg-white/80 px-1 rounded shadow-2xs whitespace-nowrap">
          NODE-4
        </span>
      </motion.div>
    </div>
  );
};
