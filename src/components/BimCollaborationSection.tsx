import React, { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { 
  Users, 
  Monitor, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  MessageSquare,
  Sparkles,
  Maximize2,
  Tv,
  FileCheck
} from 'lucide-react';

import bgJobsite from '../assets/images/bg_modern_jobsite_1792156747851.jpg';
import bgTower from '../assets/images/bg_modern_building_tower_1792162103443.jpg';
import bgFacade from '../assets/images/bg_bim_glass_facade_1792156749000.jpg';
import bimOfficeStudio from '../assets/images/bim_engineering_studio_office_1792317943099.jpg';
import clashResolutionModel from '../assets/images/bim_clash_resolution_model_1792317942291.jpg';

export const BimCollaborationSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Mode toggle: Meeting Room Drawing Review vs Coordinated BIM Model
  const [viewMode, setViewMode] = useState<'meeting' | 'workstation' | 'model'>('meeting');

  // Headings words for dynamic reveal
  const titleWords = ['Multidisciplinary', 'Collaboration', '&', 'BIM', 'Engineering', 'Workstations'];

  return (
    <section 
      id="collaboration" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-[#E2ECF7] via-[#EDF3FA] to-[#E3EDF6] relative overflow-hidden border-t border-blue-200/80 scroll-mt-20"
    >
      {/* 
        High-Definition Architectural Building Background (>= 70% Visual Prominence)
        with 1-Second Delayed Scroll Reveal & Ken Burns Panning (No Grids)
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
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
          className="w-full h-full"
        >
          <img
            src={bgTower}
            alt="Modern skyscraper architectural glass facade background"
            className="w-full h-full object-cover object-center opacity-80 sm:opacity-85 filter brightness-[0.92] contrast-110 saturate-[1.05]"
          />
        </motion.div>
        
        {/* Controlled gradient scrim for clear typography while leaving building prominent */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#DFEAF5]/88 via-[#EBF2F9]/65 to-[#DFEAF5]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#DFEAF5]/65 via-transparent to-[#DFEAF5]/75 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header with Staggered Word Reveal */}
        <div className="max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#DFEAF5]/95 border border-blue-300 text-xs font-mono text-[#165DFF] shadow-xs backdrop-blur-md"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="font-bold">Multidisciplinary Engineering Alignment</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-700 font-medium">BIM Coordination In Action</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0B1530] tracking-tight leading-tight">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className={`inline-block mr-2 sm:mr-3 ${
                  word === 'BIM' || word === 'Workstations' ? 'text-[#165DFF]' : 'text-[#0B1530]'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base text-slate-700 font-body leading-relaxed"
          >
            Real construction success happens when experienced architects, structural engineers, and MEP modelers collaborate over shared digital drawings and federated 3D models before site mobilization.
          </motion.p>

          {/* Interactive Mode Selector */}
          <div className="flex items-center gap-2 pt-2 flex-wrap">
            <button
              onClick={() => setViewMode('meeting')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'meeting'
                  ? 'bg-[#165DFF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-[#DFEAF5] text-slate-700 border border-blue-300 hover:bg-blue-100'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>1. Meeting Room Drawing Review</span>
            </button>

            <button
              onClick={() => setViewMode('workstation')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'workstation'
                  ? 'bg-[#165DFF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-[#DFEAF5] text-slate-700 border border-blue-300 hover:bg-blue-100'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>2. Multi-Monitor BIM Modeling Workstation</span>
            </button>

            <button
              onClick={() => setViewMode('model')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                viewMode === 'model'
                  ? 'bg-[#165DFF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-[#DFEAF5] text-slate-700 border border-blue-300 hover:bg-blue-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3. Federated 3D Coordination Outcome</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Collaboration Showcase Viewport */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, scale: 0.98, x: -16 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-3xl bg-[#E5EEF7]/95 backdrop-blur-md border border-blue-200/90 shadow-2xl overflow-hidden p-6 sm:p-8"
        >
          {/* VIEW MODE 1: MEETING ROOM DRAWING & MODEL REVIEW */}
          {viewMode === 'meeting' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Visual Simulation: Conference Room with Authentic Engineering Studio Photo */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl min-h-[380px] p-6 flex flex-col justify-between">
                {/* Authentic Engineering Studio Photo */}
                <div className="absolute inset-0">
                  <img
                    src={bimOfficeStudio}
                    alt="BIM engineering studio coordination review around workstations and blueprints"
                    className="w-full h-full object-cover filter contrast-105 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/60" />
                </div>

                {/* Top Status Bar */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-200">
                  <span className="flex items-center gap-2 text-blue-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-blue-500/30 backdrop-blur-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    CONFERENCE SUITE · INTERDISCIPLINARY WORKSHOP
                  </span>
                  <span className="bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
                    SESSION ID: BCF-COORD-402
                  </span>
                </div>

                {/* Center: Live Coordination Callout */}
                <div className="relative z-10 my-4 p-4 rounded-xl bg-slate-900/90 border border-blue-500/30 backdrop-blur-md space-y-2 max-w-lg">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 border-b border-slate-800 pb-1.5">
                    <span className="text-white font-bold flex items-center gap-1.5">
                      <Tv className="w-3.5 h-3.5 text-blue-400" />
                      COORDINATION MEETING: DRAWING REVIEW &amp; MODEL FREEZE
                    </span>
                    <span className="text-emerald-400 font-bold">RESOLVED: 98.4%</span>
                  </div>
                  <div className="text-xs text-slate-200 leading-relaxed font-body">
                    Architects, structural engineers, and MEP leads reviewing 3D Revit geometry and A1 dimensioned blueprints to resolve ceiling clashes prior to construction sign-off.
                  </div>
                </div>

                {/* Bottom: Conference Table Blueprint Inspection */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-200 bg-slate-900/90 px-4 py-2.5 rounded-lg border border-slate-800 backdrop-blur-xs">
                  <span className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>Table Drawings: A1 Combined Services Sheets (CSD)</span>
                  </span>
                  <span className="text-blue-400 font-bold">REV-04 SIGNED OFF</span>
                </div>
              </div>

              {/* Right Explanatory Narrative */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#165DFF] font-bold uppercase tracking-wider">
                    Collaborative Decision-Making
                  </span>
                  <h3 className="text-2xl font-bold font-display text-[#0B1530]">
                    From Drawing Table to Digital Twin
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    Complex coordination issues cannot be solved in isolation. Our project managers and lead BIM coordinators convene regular design workshops with structural consultants and trade contractors.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#165DFF] shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700">
                      <strong>Multi-Trade Consensus:</strong> Disciplinary conflicts are debated and resolved on the digital whiteboard before drawing stamping.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#165DFF] shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700">
                      <strong>Direct BIM Authority:</strong> Decisions are logged in real-time into the BCF issue tracker and synchronized with Revit models.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setViewMode('model')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#165DFF] hover:text-blue-800 transition-colors pt-2"
                >
                  <span>Inspect Resulting Coordinated 3D Model</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: MULTI-MONITOR BIM WORKSTATION */}
          {viewMode === 'workstation' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Dual-Screen Production CAD/Revit Workstation Simulation */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-2 text-[#165DFF]">
                    <Monitor className="w-4 h-4" />
                    ENGINEERING DUAL-DISPLAY WORKSTATION · CAD / REVIT
                  </span>
                  <span className="text-slate-400">64-BIT WORKSTATION · RAM 128GB</span>
                </div>

                {/* Dual Screens Side-by-Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Left Screen: 2D Parametric Drafting & Parameter Inspector */}
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1">
                      <span>SCREEN 1: REVIT PROPERTIES</span>
                      <span className="text-blue-400">FAMILY: W-BEAM 460</span>
                    </div>
                    <div className="h-44 bg-slate-950 rounded p-2 text-[10px] font-mono text-slate-300 space-y-1 overflow-hidden">
                      <div className="text-slate-500">// Parameter Register</div>
                      <div className="flex justify-between"><span>Structural Material:</span><span className="text-blue-400">Steel ASTM A992</span></div>
                      <div className="flex justify-between"><span>Web Thickness:</span><span className="text-blue-400">12.2 mm</span></div>
                      <div className="flex justify-between"><span>Flange Width:</span><span className="text-blue-400">190.0 mm</span></div>
                      <div className="flex justify-between"><span>COBie Classification:</span><span className="text-emerald-400">Pr_20_85_15</span></div>
                      <div className="flex justify-between"><span>LOD Level:</span><span className="text-amber-400">LOD 400 Shop</span></div>
                      <div className="flex justify-between"><span>Fire Rating:</span><span className="text-blue-400">120 Minutes</span></div>
                      <div className="pt-2 text-center text-blue-500 font-bold">100% PARAMETRIC BINDING</div>
                    </div>
                  </div>

                  {/* Right Screen: 3D Navisworks Viewport with Orbiting Geometry */}
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1">
                      <span>SCREEN 2: 3D COORDINATION</span>
                      <span className="text-emerald-400">STABLE 3D VIEW</span>
                    </div>
                    <div className="h-44 bg-slate-950 rounded p-2 flex items-center justify-center relative overflow-hidden">
                      <div className="w-28 h-28">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
                          <polygon points="50,10 85,30 50,50 15,30" fill="rgba(37,99,235,0.3)" stroke="#60A5FA" strokeWidth="1.5" />
                          <polygon points="15,30 50,50 50,85 15,65" fill="rgba(37,99,235,0.4)" stroke="#60A5FA" strokeWidth="1.5" />
                          <polygon points="50,50 85,30 85,65 50,85" fill="rgba(37,99,235,0.5)" stroke="#60A5FA" strokeWidth="1.5" />
                          <circle cx="50" cy="50" r="3" fill="#38BDF8" />
                        </svg>
                      </div>
                      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-400">
                        ELEMENTS: 148,200 · 0 CLASH
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <span>SPECIALISTS: STRUCTURAL DETAILER &amp; MEP MODELER</span>
                  <span className="text-emerald-400">ISO 19650 COMPLIANT</span>
                </div>
              </div>

              {/* Right Explanatory Narrative */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#165DFF] font-bold uppercase tracking-wider">
                    Engineering Rigor
                  </span>
                  <h3 className="text-2xl font-bold font-display text-[#0B1530]">
                    Dedicated High-Performance Workstations
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    Our BIM production engineers operate high-spec multicore workstations optimized for million-element Revit models, computational Dynamo routines, and laser scan point clouds without lag.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#165DFF] shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700">
                      <strong>Parametric Precision:</strong> Every element carries dimensional constraints, manufacturer details, and procurement schedules.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#165DFF] shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700">
                      <strong>Clash-Proof Modeling:</strong> Modelers check clearances against federated architecture and structure before issuing drawing sheets.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 3: FEDERATED 3D COORDINATION OUTCOME */}
          {viewMode === 'model' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Coordinated 3D Federated Building Visualization */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-slate-950 border border-blue-500/40 shadow-xl p-6 min-h-[380px] flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="text-blue-400 flex items-center gap-1.5 font-bold">
                    <Layers className="w-4 h-4" />
                    LOD 400 FEDERATED DISCIPLINARY OVERLAY
                  </span>
                  <span className="bg-emerald-950/80 text-emerald-400 px-2.5 py-0.5 rounded border border-emerald-500/40">
                    STATUS: READY FOR FABRICATION
                  </span>
                </div>

                {/* Real 3D Clash Detection & Resolution Engineering Visual */}
                <div className="my-4 relative rounded-xl overflow-hidden border border-blue-500/30 bg-slate-900 shadow-inner group">
                  <img
                    src={clashResolutionModel}
                    alt="Technically accurate 3D BIM model showing existing clash detected and coordinated clearance routing solution"
                    className="w-full h-56 object-cover object-center filter contrast-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                    <span className="flex items-center gap-1.5 text-red-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      CLASH DETECTED (LEFT)
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      COORDINATED SOLUTION (RIGHT)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-300 border-t border-slate-800 pt-3">
                  <span>DISCIPLINES SYNCHRONIZED: ARCH + STR + MEPF</span>
                  <span className="text-[#165DFF] font-bold">TOLERANCE ±0mm</span>
                </div>
              </div>

              {/* Right Explanatory Narrative */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#165DFF] font-bold uppercase tracking-wider">
                    The Final Deliverable
                  </span>
                  <h3 className="text-2xl font-bold font-display text-[#0B1530]">
                    Zero-Clash Constructability
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    When meeting room collaboration and rigorous workstation modeling converge, the result is an accurate federated digital model that contractor teams can trust on the jobsite.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#165DFF] shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700">
                      <strong>Flawless Site Execution:</strong> Pre-assembled spools and rebar cages fit the first time without torching or field delays.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#165DFF] shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700">
                      <strong>As-Built Digital Twin:</strong> Verified geometries form the foundation for asset lifecycle operations and facility management.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
