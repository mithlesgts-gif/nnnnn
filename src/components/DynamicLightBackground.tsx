import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SyncedBimDotsBackground } from './SyncedBimDotsBackground';

interface DynamicLightBackgroundProps {
  theme?: 'sky' | 'azure' | 'blueprint' | 'soft';
  bgImage?: string;
  bgImages?: string[];
  bgImageOpacity?: string;
  animateMotion?: boolean;
  showDots?: boolean;
  showLaser?: boolean;
  showOrbs?: boolean;
  showWireframe?: boolean;
  showCompass?: boolean;
  laserElevationText?: string;
}

export const DynamicLightBackground: React.FC<DynamicLightBackgroundProps> = ({
  theme = 'sky',
  bgImage,
  bgImages,
  bgImageOpacity = 'opacity-80 sm:opacity-85',
  animateMotion = true,
  showDots = true,
  showLaser = true,
  showOrbs = true,
  showWireframe = true,
  showCompass = false,
  laserElevationText = 'ELEV: +14.600m'
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeImgIndex, setActiveImgIndex] = React.useState(0);

  // If multiple images provided, cycle through them
  React.useEffect(() => {
    if (!bgImages || bgImages.length <= 1 || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % bgImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [bgImages, shouldReduceMotion]);

  const currentImage = bgImages && bgImages.length > 0 
    ? bgImages[activeImgIndex] 
    : bgImage;

  // Gradients according to theme
  const themeGradients = {
    sky: 'bg-gradient-to-b from-[#F0F7FF] via-[#E8F2FC] to-[#F2F8FD]',
    azure: 'bg-gradient-to-b from-[#EFF6FF] via-[#E2EDFE] to-[#F0F7FF]',
    blueprint: 'bg-gradient-to-b from-[#F2F7FE] via-[#E9F3FC] to-[#F5F9FE]',
    soft: 'bg-gradient-to-b from-[#F4F9FE] via-[#EAF3FC] to-[#F7FAFE]'
  };

  const orbColor1 = theme === 'azure' 
    ? 'from-blue-500/15 to-sky-400/10' 
    : theme === 'blueprint'
    ? 'from-sky-500/15 to-blue-600/10'
    : 'from-blue-400/12 to-sky-300/10';

  const orbColor2 = theme === 'azure'
    ? 'from-sky-400/15 to-blue-600/10'
    : 'from-blue-500/12 to-indigo-400/8';

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${themeGradients[theme]}`}>
      {/* 1. High-Definition Architectural Building Photographic Backdrop (>=70% Visual Prominence) */}
      {currentImage && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            key={currentImage}
            initial={
              shouldReduceMotion
                ? { opacity: 0.8 }
                : { opacity: 0, scale: 1.06, clipPath: 'inset(0 100% 0 0)' }
            }
            animate={{
              opacity: 1,
              scale: shouldReduceMotion ? 1 : [1, 1.06, 1.02],
              x: shouldReduceMotion ? 0 : [0, 14, -10, 0],
              y: shouldReduceMotion ? 0 : [0, -8, 6, 0],
              clipPath: 'inset(0 0% 0 0)'
            }}
            transition={{
              clipPath: { duration: 1.2, delay: shouldReduceMotion ? 0 : 0.95, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.9, delay: shouldReduceMotion ? 0 : 0.9 },
              scale: { duration: 28, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 32, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 24, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="w-full h-full"
          >
            <img
              src={currentImage}
              alt="Construction and building background"
              aria-hidden="true"
              className={`w-full h-full object-cover object-center ${bgImageOpacity} filter contrast-105 saturate-[0.95] transition-opacity duration-1000`}
            />
          </motion.div>
          {/* Targeted scrim: preserves 70%+ building visual visibility while keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/88 via-white/60 to-white/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/70" />
        </div>
      )}

      {/* 2. Blueprint Engineering Grid */}
      <div className="absolute inset-0 bg-grid-light opacity-40" />

      {/* 3. Moving Dynamic Ambient Gradient Orbs (Gentle Drifting Waves) */}
      {showOrbs && !shouldReduceMotion && (
        <>
          {/* Primary Top-Left Drifting Orb */}
          <motion.div
            animate={{
              x: [0, 50, -40, 0],
              y: [0, -45, 25, 0],
              scale: [1, 1.18, 0.94, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute -top-24 -left-20 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr ${orbColor1} blur-3xl`}
          />

          {/* Secondary Bottom-Right Drifting Orb */}
          <motion.div
            animate={{
              x: [0, -45, 55, 0],
              y: [0, 50, -35, 0],
              scale: [1, 1.12, 0.92, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute -bottom-24 -right-20 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl ${orbColor2} blur-3xl`}
          />

          {/* Center Subtle Pulsing Glow Node */}
          <motion.div
            animate={{
              opacity: [0.15, 0.35, 0.15],
              scale: [0.95, 1.08, 0.95]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-300/10 blur-3xl"
          />
        </>
      )}

      {/* 4. Interactive Synchronized BIM Constellation Dots */}
      {showDots && (
        <SyncedBimDotsBackground 
          density="medium" 
          interactive={true} 
          className="opacity-70"
        />
      )}

      {/* 5. Moving Architectural Wireframe Geometry (Isometric Prism / Cube) */}
      {showWireframe && !shouldReduceMotion && (
        <>
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [0, 7, 0],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:block absolute top-16 right-12 w-28 h-28 opacity-45 pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600 drop-shadow-xs">
              <polygon points="50,15 85,32 50,49 15,32" fill="rgba(37,99,235,0.06)" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
              <polygon points="15,32 50,49 50,85 15,68" fill="rgba(37,99,235,0.09)" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="50,49 85,32 85,68 50,85" fill="rgba(37,99,235,0.14)" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="50" cy="49" r="2.2" fill="#2563EB" />
            </svg>
            <span className="text-[8px] font-mono text-blue-600/80 block text-center mt-1 font-bold">LOD 350 MODEL</span>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 16, 0],
              rotate: [0, -6, 0],
            }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden lg:block absolute bottom-16 left-8 w-24 h-24 opacity-40 pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 drop-shadow-xs">
              <polygon points="50,18 80,33 50,48 20,33" fill="rgba(37,99,235,0.05)" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="20,33 50,48 50,78 20,63" fill="rgba(37,99,235,0.07)" stroke="currentColor" strokeWidth="1.2" />
              <polygon points="50,48 80,33 80,63 50,78" fill="rgba(37,99,235,0.11)" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="50" cy="48" r="2" fill="#0284C7" />
            </svg>
            <span className="text-[8px] font-mono text-blue-600/80 block text-center mt-0.5 font-bold">0-CLASH ZONE</span>
          </motion.div>
        </>
      )}

      {/* 6. Rotating Technical Compass Dial */}
      {showCompass && !shouldReduceMotion && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="hidden xl:block absolute top-1/2 -right-20 -translate-y-1/2 w-56 h-56 opacity-25 pointer-events-none"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
            <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
            <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
            <text x="100" y="20" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">N</text>
            <text x="185" y="104" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">E</text>
            <text x="100" y="190" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">S</text>
            <text x="15" y="104" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">W</text>
          </svg>
        </motion.div>
      )}

      {/* 7. Subtle Gliding Laser Scan Line with Elevation Coordinate */}
      {showLaser && !shouldReduceMotion && (
        <motion.div
          animate={{
            top: ['6%', '90%', '6%'],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none z-0"
        >
          <div className="absolute right-10 -top-3 px-2 py-0.5 rounded-full bg-white/95 border border-blue-200/90 text-[9px] font-mono text-blue-700 shadow-xs flex items-center gap-1.5 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
            <span className="font-semibold">{laserElevationText}</span>
          </div>
        </motion.div>
      )}

      {/* 8. Pulsing Geometric Engineering Crosshair Markers */}
      <div className="absolute top-28 left-1/4 flex items-center justify-center w-4 h-4 text-blue-500/50 animate-pulse-glow">
        <svg viewBox="0 0 16 16" className="w-full h-full">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>

      <div className="absolute bottom-24 right-1/4 flex items-center justify-center w-4 h-4 text-sky-500/50 animate-pulse-glow">
        <svg viewBox="0 0 16 16" className="w-full h-full">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
};
