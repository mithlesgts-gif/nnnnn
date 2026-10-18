import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  ChevronDown, 
  Layers, 
  Box, 
  ShieldCheck, 
  Building2, 
  Compass, 
  GitBranch, 
  Calendar,
  CheckCircle2,
  HardHat,
  MousePointer,
  Magnet,
  Sparkles,
  Video
} from 'lucide-react';
import { HeroBlueprintAnimation } from './HeroBlueprintAnimation';
import { DynamicBuildingVideoBackground } from './DynamicBuildingVideoBackground';
import heroConstructionImg from '../assets/images/hero_commercial_construction_1792317940744.jpg';

interface HeroSectionProps {
  onOpenBooking?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [bgMode, setBgMode] = useState<'photo' | 'video'>('photo');

  const marqueeKeywords = [
    'BIM Modeling',
    'Architectural BIM',
    'Structural BIM',
    'MEP Coordination',
    'Clash Detection',
    'Scan to BIM',
    'Digital Construction',
    'Shop Drawings',
    '4D Construction Simulation',
    'Revit Content Creation'
  ];

  // Headline words for smooth purposeful entrance reveal
  const headlineWordsRow1 = ['Building', 'Better', 'with', 'BIM.'];
  const headlineWordsRow2 = ['Delivering', 'with', 'Precision.'];

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-4 overflow-hidden bg-gradient-to-b from-[#E2ECF7] via-[#EDF3FA] to-[#E3EDF6]">
      {/* 1. Authentic Commercial Construction Site Photography Background with Navy-Blue Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <img
          src={heroConstructionImg}
          alt="High-rise commercial building under construction with exposed concrete, steel, cranes, and workers in PPE"
          className="w-full h-full object-cover object-center filter contrast-110 brightness-[0.88] saturate-[1.05] transition-opacity duration-700"
          style={{ opacity: bgMode === 'photo' ? 0.65 : 0.25 }}
        />
        {/* Subtle Navy-Blue Overlay Scrim ensuring WCAG AA contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09152C]/88 via-[#0F224A]/74 to-[#09152C]/86 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09152C]/65 via-transparent to-[#09152C]/85 pointer-events-none" />
      </div>

      {/* 2. Dynamic Moving Looping Building Construction Video in Background */}
      <DynamicBuildingVideoBackground
        initialVideoId="structural-rise"
        overlayTheme="navy-dark"
        opacity={bgMode === 'video' ? 0.60 : 0.20}
        showControls={true}
      />

      {/* 3. Subtle Precision Datum Elevation Linework (No Square Grids, Stable) */}
      <HeroBlueprintAnimation />

      {/* Background Media Switcher (Photo vs Video) */}
      <div className="hidden md:flex absolute top-28 right-8 z-30 items-center gap-1.5 p-1 rounded-xl bg-[#09152C]/85 backdrop-blur-md border border-blue-500/30 text-white text-xs font-mono">
        <button
          onClick={() => setBgMode('photo')}
          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
            bgMode === 'photo' ? 'bg-[#165DFF] text-white font-bold shadow-xs' : 'text-blue-300 hover:text-white'
          }`}
          title="Switch to Authentic High-Rise Construction Photo"
        >
          Site Photo
        </button>
        <button
          onClick={() => setBgMode('video')}
          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
            bgMode === 'video' ? 'bg-[#165DFF] text-white font-bold shadow-xs' : 'text-blue-300 hover:text-white'
          }`}
          title="Switch to Looping 4D Construction Video"
        >
          Live 4D Video
        </button>
      </div>

      {/* Dedicated Flanking Engineering Cards (Non-Overlapping, Stationary) */}
      {/* Left Dedicated Flank: LOD 350 Multi-Discipline Model Coordination */}
      <motion.div 
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden 2xl:flex flex-col justify-between absolute top-40 left-8 w-64 p-4 rounded-2xl bg-[#09152C]/90 backdrop-blur-md border border-blue-500/30 shadow-xl shadow-blue-950/40 pointer-events-auto z-20 group hover:border-[#165DFF] transition-all text-white"
      >
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 text-blue-400 font-bold">
            <Building2 className="w-4 h-4 text-blue-400" />
            LOD 350 MODEL
          </span>
          <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[9px] font-bold border border-blue-500/30">
            COORDINATED
          </span>
        </div>
        <div className="my-2 space-y-1">
          <div className="text-xs font-bold text-white font-display">
            Multi-Trade BIM Federation
          </div>
          <div className="text-[11px] text-slate-300 font-body leading-relaxed">
            Architectural envelope, structural sheer walls &amp; MEP ceiling plenums.
          </div>
        </div>
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-300">
          <span>TOLERANCE: ±1mm</span>
          <span className="text-emerald-400 font-bold">0 CLASH</span>
        </div>
      </motion.div>

      {/* Right Dedicated Flank: LOD 500 Digital Twin As-Built Asset */}
      <motion.div 
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden 2xl:flex flex-col justify-between absolute top-40 right-8 w-64 p-4 rounded-2xl bg-[#09152C]/90 backdrop-blur-md border border-blue-500/30 shadow-xl shadow-blue-950/40 pointer-events-auto z-20 group hover:border-[#165DFF] transition-all text-white"
      >
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 text-blue-400 font-bold">
            <Box className="w-4 h-4 text-blue-400" />
            DIGITAL TWIN
          </span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[9px] font-bold">
            LOD 500 READY
          </span>
        </div>
        <div className="my-2 space-y-1">
          <div className="text-xs font-bold text-white font-display">
            As-Built Facilities Data
          </div>
          <div className="text-[11px] text-slate-300 font-body leading-relaxed">
            COBie metadata, asset life-cycle registers &amp; verified sensor points.
          </div>
        </div>
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-300">
          <span>FM INTEGRATION</span>
          <span className="text-blue-400 font-bold">ISO 19650</span>
        </div>
      </motion.div>

      {/* Main Center Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 space-y-7 my-auto">
        {/* Controlled, Directional Headline Reveal (Stationary Once Loaded) */}
        <div className="space-y-4 relative">
          {/* Engineering Badge */}
          <div className="flex items-center justify-center select-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#09152C]/85 border border-blue-500/40 text-xs font-mono text-blue-300 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="font-semibold">Integrated BIM Solutions</span>
              <span className="text-blue-500">·</span>
              <span className="text-white font-medium">LOD 100 to LOD 500</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-[1.08] text-white drop-shadow-md">
            {/* Phrase 1: "Building Better with BIM." */}
            <div className="block">
              {headlineWordsRow1.map((word, idx) => (
                <motion.span
                  key={`h1-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block mr-3 sm:mr-5 ${
                    word === 'BIM.' ? 'text-[#38BDF8] drop-shadow-md' : 'text-white'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Phrase 2: "Delivering with Precision." */}
            <div className="block mt-1 sm:mt-2">
              {headlineWordsRow2.map((word, idx) => (
                <motion.span
                  key={`h2-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block mr-3 sm:mr-5 ${
                    word === 'Precision.' 
                      ? 'text-[#60A5FA] relative underline decoration-[#38BDF8]/60 decoration-wavy decoration-2 sm:decoration-4' 
                      : 'text-white'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>
        </div>

        {/* Clear, Readable Engineering Value Proposition */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-xl text-slate-100 max-w-3xl mx-auto font-body leading-relaxed font-normal drop-shadow-sm"
        >
          Integrated Building Information Modeling (BIM) solutions engineered to accelerate multidisciplinary coordination, eliminate field clashes, and deliver construction-ready accuracy from <span className="text-sky-300 font-semibold">LOD 100 conceptual design</span> to <span className="text-sky-300 font-semibold">LOD 500 digital twins</span>.
        </motion.p>

        {/* Primary and Secondary Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#165DFF] hover:bg-[#2878FF] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
          >
            <Calendar className="w-5 h-5 text-blue-200" />
            <span>Book Free 1:1 Consultation</span>
          </button>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0B1736]/90 text-white hover:text-blue-300 border border-blue-500/40 hover:border-[#165DFF] font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md"
          >
            <span>Discuss Project</span>
            <ArrowUpRight className="w-4 h-4 text-blue-300 group-hover:text-white" />
          </a>

          <a
            href="#lifecycle-animation"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-blue-950/80 hover:bg-blue-900/90 text-blue-200 font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 border border-blue-500/40 backdrop-blur-md"
          >
            <span>Watch Construction Lifecycle</span>
          </a>
        </motion.div>

        {/* Responsive Telemetry Cards Strip (Dark Navy Tinted Glass Surfaces) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto text-left"
        >
          <div className="p-3.5 rounded-2xl bg-[#09152C]/90 backdrop-blur-md border border-blue-500/30 shadow-md shadow-blue-950/20 hover:border-blue-400 transition-all text-white">
            <span className="text-[10px] font-mono text-blue-400 font-bold block">1:1 GOVERNANCE</span>
            <span className="text-xs font-bold text-white font-display">Dedicated PM</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Direct Lead Accountability</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#09152C]/90 backdrop-blur-md border border-blue-500/30 shadow-md shadow-blue-950/20 hover:border-blue-400 transition-all text-white">
            <span className="text-[10px] font-mono text-blue-400 font-bold block">PRECISION MATRIX</span>
            <span className="text-xs font-bold text-white font-display">Zero Clash Model</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Navisworks Hard/Soft Audit</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#09152C]/90 backdrop-blur-md border border-blue-500/30 shadow-md shadow-blue-950/20 hover:border-blue-400 transition-all text-white">
            <span className="text-[10px] font-mono text-blue-400 font-bold block">FULL LIFECYCLE</span>
            <span className="text-xs font-bold text-white font-display">LOD 100 to 500</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Concept to Digital Twin</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#09152C]/90 backdrop-blur-md border border-blue-500/30 shadow-md shadow-blue-950/20 hover:border-blue-400 transition-all text-white">
            <span className="text-[10px] font-mono text-blue-400 font-bold block">GLOBAL STANDARDS</span>
            <span className="text-xs font-bold text-white font-display">ISO 19650</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Common Data Environment</span>
          </div>
        </motion.div>
      </div>

      {/* Continuously Moving Engineering Keyword Marquee Strip */}
      <div className="w-full bg-[#081226] text-white py-3.5 border-y border-blue-900/60 overflow-hidden relative mt-10 z-20 shadow-inner">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono tracking-wider uppercase">
          {[...marqueeKeywords, ...marqueeKeywords].map((word, idx) => (
            <span key={idx} className="flex items-center gap-8">
              <span className={idx % 3 === 0 ? 'text-[#2878FF] font-bold' : idx % 3 === 1 ? 'text-sky-300 font-bold' : 'text-slate-200'}>
                {word}
              </span>
              <span className="text-blue-500/50" aria-hidden="true">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
