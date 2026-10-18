import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Play, Pause, ChevronLeft, ChevronRight, Layers, Eye, Building2, HardHat, Compass } from 'lucide-react';

import bgFacade from '../assets/images/bg_bim_glass_facade_1792156749000.jpg';
import bgCrane from '../assets/images/bg_crane_structure_1792156747263.jpg';
import bgJobsite from '../assets/images/bg_modern_jobsite_1792156747851.jpg';
import bgTower from '../assets/images/bg_modern_building_tower_1792162103443.jpg';

export interface ConstructionPhotoItem {
  id: string;
  title: string;
  tag: string;
  stage: string;
  elevation: string;
  image: string;
  description: string;
}

export const constructionPhotos: ConstructionPhotoItem[] = [
  {
    id: 'crane-steel',
    title: 'High-Rise Steel Erection & Tower Crane',
    tag: 'Structural Frame',
    stage: 'LOD 400 Detailing',
    elevation: 'ELEV: +68.400m',
    image: bgCrane,
    description: 'Active superstructure steel assembly with synchronized heavy lifting crane coordination.'
  },
  {
    id: 'facade-glazing',
    title: 'Double-Skin Facade & Glazing Installation',
    tag: 'Envelope BIM',
    stage: 'LOD 350 Envelope',
    elevation: 'ELEV: +24.800m',
    image: bgFacade,
    description: 'Precision curtain wall panel assembly with pre-engineered bracket tolerances.'
  },
  {
    id: 'modern-tower',
    title: 'Modern Geometric Skyscraper Architecture',
    tag: 'Architectural Twin',
    stage: 'LOD 500 As-Built',
    elevation: 'ELEV: +142.000m',
    image: bgTower,
    description: 'Finished aerodynamic skyscraper featuring diagonal bracing and high-performance reflective envelope.'
  },
  {
    id: 'jobsite-structure',
    title: 'Industrial Heavy Foundation & Superstructure',
    tag: 'Site Coordination',
    stage: 'LOD 350 Site Logistics',
    elevation: 'ELEV: +0.000m (Datum)',
    image: bgJobsite,
    description: 'Multi-crane logistics planning, concrete formwork, and heavy cast-in-place columns.'
  }
];

interface MovingConstructionBackgroundProps {
  variant?: 'hero' | 'section' | 'ambient';
  intensity?: 'subtle' | 'medium' | 'vivid';
  showControls?: boolean;
  showFloatingCards?: boolean;
  showMovingStrip?: boolean;
  autoPlayInterval?: number;
}

export const MovingConstructionBackground: React.FC<MovingConstructionBackgroundProps> = ({
  variant = 'hero',
  intensity = 'medium',
  showControls = true,
  showFloatingCards = true,
  showMovingStrip = true,
  autoPlayInterval = 8000
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!shouldReduceMotion);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance photos when playing
  useEffect(() => {
    if (!isPlaying || shouldReduceMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % constructionPhotos.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, shouldReduceMotion, autoPlayInterval]);

  const activePhoto = constructionPhotos[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % constructionPhotos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + constructionPhotos.length) % constructionPhotos.length);
  };

  // Target >= 70% visual prominence of architectural buildings per user requirement
  const bgOpacityClass = intensity === 'vivid'
    ? 'opacity-85 sm:opacity-90'
    : intensity === 'subtle'
    ? 'opacity-70 sm:opacity-75'
    : 'opacity-75 sm:opacity-85';

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Cinematic Moving Backdrop Photos with Cross-Dissolve & Ken Burns Pan-Zoom (>=70% Visible) */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activePhoto.id}
          initial={{ opacity: 0, scale: 1.05, clipPath: 'inset(0 100% 0 0)' }}
          animate={{
            opacity: 1,
            scale: shouldReduceMotion ? 1 : [1.02, 1.07, 1.03],
            x: shouldReduceMotion ? 0 : [0, 16, -10, 0],
            y: shouldReduceMotion ? 0 : [0, -12, 6, 0],
            clipPath: 'inset(0 0% 0 0)'
          }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{
            clipPath: { duration: 1.2, delay: shouldReduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: 24, repeat: Infinity, ease: 'easeInOut' },
            x: { duration: 28, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 22, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activePhoto.image}
            alt={activePhoto.title}
            className={`w-full h-full object-cover object-center ${bgOpacityClass} filter contrast-105 saturate-[1.0]`}
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Measured Gradient Scrims: preserves 70%+ building visibility while keeping hero headlines legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-white/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-light opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />

      {/* 3. Floating Architectural Construction Photo Frames (Parallax Accents) */}
      {showFloatingCards && !shouldReduceMotion && (
        <>
          {/* Left Floating Construction Frame — Crane & Structural Steel */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              x: [0, 8, 0],
              rotate: [-2, 1, -2]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden xl:block absolute top-28 -left-6 w-72 p-2 rounded-2xl bg-white/75 backdrop-blur-md border border-blue-200/80 shadow-xl shadow-blue-500/10 pointer-events-auto group cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentIndex(0)}
          >
            <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
              <motion.img
                animate={{ scale: [1, 1.08, 1], y: [0, -4, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                src={bgCrane}
                alt="Crane structural construction"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-blue-600/90 text-[10px] font-mono text-white font-semibold backdrop-blur-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-200 animate-ping" />
                <span>ACTIVE HOIST</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <div className="text-[11px] font-display font-bold leading-tight drop-shadow-sm">Steel Erection Site</div>
                <div className="text-[9px] font-mono text-blue-200 flex items-center justify-between">
                  <span>LOD 400 Model</span>
                  <span>ELEV +68.4m</span>
                </div>
              </div>
            </div>
            <div className="p-1.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-blue-700 font-semibold">
                <HardHat className="w-3 h-3 text-blue-600" />
                Live Jobsite Feed
              </span>
              <span className="text-slate-400">0-CLASH PASS</span>
            </div>
          </motion.div>

          {/* Right Floating Construction Frame — Modern Skyscraper Architecture */}
          <motion.div
            animate={{
              y: [0, 16, 0],
              x: [0, -6, 0],
              rotate: [1, -2, 1]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden xl:block absolute top-36 -right-6 w-72 p-2 rounded-2xl bg-white/75 backdrop-blur-md border border-blue-200/80 shadow-xl shadow-blue-500/10 pointer-events-auto group cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentIndex(2)}
          >
            <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
              <motion.img
                animate={{ scale: [1, 1.07, 1], x: [0, -6, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                src={bgTower}
                alt="Modern skyscraper building"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/90 text-[10px] font-mono text-blue-300 font-semibold backdrop-blur-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>DIGITAL TWIN</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <div className="text-[11px] font-display font-bold leading-tight drop-shadow-sm">Architectural Envelope</div>
                <div className="text-[9px] font-mono text-blue-200 flex items-center justify-between">
                  <span>As-Built Model</span>
                  <span>ELEV +142.0m</span>
                </div>
              </div>
            </div>
            <div className="p-1.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-blue-700 font-semibold">
                <Building2 className="w-3 h-3 text-blue-600" />
                Facade Precision
              </span>
              <span className="text-emerald-600 font-semibold">100% SYNCED</span>
            </div>
          </motion.div>
        </>
      )}

      {/* 4. Continuously Moving Horizontal Panoramic Construction Filmstrip */}
      {showMovingStrip && !shouldReduceMotion && (
        <div className="absolute -bottom-8 left-0 right-0 h-28 overflow-hidden pointer-events-none opacity-25">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-4 whitespace-nowrap w-[200%]"
          >
            {[...constructionPhotos, ...constructionPhotos, ...constructionPhotos].map((photo, i) => (
              <div
                key={`strip-${i}`}
                className="inline-flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/60 border border-blue-200/50 backdrop-blur-xs shrink-0"
              >
                <div className="w-12 h-9 rounded-lg overflow-hidden shrink-0 border border-blue-300/40">
                  <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-left font-mono">
                  <div className="text-[10px] font-bold text-slate-800">{photo.title}</div>
                  <div className="text-[9px] text-blue-600">{photo.stage} · {photo.elevation}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* 5. Live Moving Photo Control Dock (Interactive Badge in Corner) */}
      {showControls && (
        <div className="absolute bottom-6 right-6 z-30 pointer-events-auto hidden sm:flex items-center gap-2 p-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-blue-200/90 shadow-lg shadow-blue-900/5">
          <div className="px-2.5 py-1 text-left border-r border-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-blue-400' : 'bg-slate-300'} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-blue-600' : 'bg-slate-400'}`} />
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-800 uppercase tracking-wider">
                {activePhoto.tag}
              </span>
            </div>
            <div className="text-[9px] font-mono text-blue-600 truncate max-w-[150px]">
              {activePhoto.elevation}
            </div>
          </div>

          {/* Quick Scene Buttons */}
          <div className="flex items-center gap-1 px-1">
            {constructionPhotos.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                }`}
                title={item.title}
                aria-label={`Switch to ${item.title}`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Play / Pause & Prev / Next */}
          <div className="flex items-center gap-0.5 pl-1 border-l border-slate-200">
            <button
              onClick={handlePrev}
              className="p-1 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Previous Photo"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Motion' : 'Play Motion'}
              aria-label={isPlaying ? 'Pause Motion' : 'Play Motion'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-blue-600" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Next Photo"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
