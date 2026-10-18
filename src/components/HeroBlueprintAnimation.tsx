import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const HeroBlueprintAnimation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Precision Elevation Datum Line (Stable & Restrained, No Grids, No Oscillation) */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className="absolute left-0 right-0 top-[22%] h-[1px] bg-gradient-to-r from-transparent via-[#165DFF]/30 to-transparent pointer-events-none"
      >
        <div className="absolute right-12 -top-2.5 px-2.5 py-0.5 rounded-full bg-[#09152C]/90 border border-blue-400/60 shadow-xs text-[9px] font-mono text-blue-300 flex items-center gap-1.5 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#165DFF]" />
          <span className="font-bold">ELEVATION DATUM +48.600m</span>
        </div>
      </motion.div>

      {/* Soft Radial Glow Scrim for Text Contrast - Cool-Blue Toned */}
      <div className="absolute inset-0 bg-radial-light opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#E2ECF7]/40 via-transparent to-[#E3EDF6]/70" />
    </div>
  );
};
