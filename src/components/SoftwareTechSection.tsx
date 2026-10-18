import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Box, 
  GitBranch, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Terminal, 
  FileCode, 
  Cpu, 
  Eye, 
  ExternalLink 
} from 'lucide-react';
import bgTower from '../assets/images/bg_modern_building_tower_1792162103443.jpg';
import bgFacade from '../assets/images/bg_bim_glass_facade_1792156749000.jpg';
import { ArchitecturalSectionBackground } from './ArchitecturalSectionBackground';

interface SoftwareWorkbenchItem {
  id: string;
  name: string;
  category: string;
  version: string;
  headline: string;
  description: string;
  workflowCapabilities: string[];
  hudMetrics: { label: string; val: string }[];
  visualType: 'revit' | 'navisworks' | 'autocad' | 'tekla';
}

export const SoftwareTechSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<string>('revit');

  const workbenchItems: SoftwareWorkbenchItem[] = [
    {
      id: 'revit',
      name: 'Autodesk Revit',
      category: 'Parametric BIM Authoring',
      version: 'v2024–2026',
      headline: 'Architectural, Structural & MEP Parametric Intelligence',
      description: 'Central authoring environment for LOD 200 to LOD 400 models. We build parametric families (.RFA) with embedded engineering metadata, manufacturer specifications, and bidirectional schedule linkages.',
      workflowCapabilities: [
        'Curtain wall & unitized glazing family development',
        'Complex reinforced concrete rebar & post-tensioned geometry',
        'Multi-tier HVAC ductwork, hydraulic drainage & electrical conduit routing',
        'Automated live Bill of Quantities (BOQ) and room schedules'
      ],
      hudMetrics: [
        { label: 'FAMILY LIBRARY', val: '5,000+ Verified RFAs' },
        { label: 'COBIE COMPLIANT', val: '100% Parameter Rich' },
        { label: 'WORKSHARING', val: 'Revit Cloud Collaboration' }
      ],
      visualType: 'revit'
    },
    {
      id: 'navisworks',
      name: 'Navisworks Manage',
      category: 'Spatial Clash & TimeLiner',
      version: 'v2025/2026',
      headline: 'Federated Model Auditing & Multi-Trade Collision Resolution',
      description: 'Assembling distinct architectural, structural, and trade models into unified .NWD coordination packages. Automated batch clash tests eliminate trade interferences before materials are ordered.',
      workflowCapabilities: [
        'Hard vs Soft spatial collision detection algorithms',
        'BCF (BIM Collaboration Format) issue tracking & viewpoint logs',
        'TimeLiner 4D construction schedule linking with Primavera P6',
        'Clearance envelope verification for plant equipment maintenance'
      ],
      hudMetrics: [
        { label: 'CLASH ACCURACY', val: '0 Unresolved Clashes' },
        { label: 'COORDINATION CACHE', val: 'NWD / IFC OpenBIM' },
        { label: 'FIELD REWORK REDUCTION', val: 'Up to 24% Savings' }
      ],
      visualType: 'navisworks'
    },
    {
      id: 'autocad',
      name: 'AutoCAD & Civil 3D',
      category: '2D Drafting & Civil Infrastructure',
      version: 'AutoCAD 2026',
      headline: 'Sub-Millimeter 2D Construction Documentation & Site Datums',
      description: 'Extracting synchronized 2D General Arrangement (GA) drawings, builders work openings (BWIC), and coordinating legacy 2D CAD architectural archives for complete BIM transformation.',
      workflowCapabilities: [
        'CAD-to-BIM 3D conversion with survey benchmark verification',
        'Combined Services Drawings (CSD) & Builders Work (BWIC)',
        'Civil topography, utility trenches & drainage slope profiles',
        'Standardized AIA / ISO layer naming and drawing block standards'
      ],
      hudMetrics: [
        { label: 'DRAWING ACCURACY', val: '±1.0 mm Vector Precision' },
        { label: 'EXTRACTION TIME', val: '100% Synced from 3D' },
        { label: 'SHEET STANDARDS', val: 'ISO 13567 Aligned' }
      ],
      visualType: 'autocad'
    },
    {
      id: 'tekla',
      name: 'Tekla Structures',
      category: 'Fabrication Steel & Rebar Detailing',
      version: '2024+',
      headline: 'LOD 400 Shop Drawing Extraction & CNC Automated Data',
      description: 'High-density structural steel connection engineering, baseplate bolt patterns, and automated Bar Bending Schedules (BBS) for reinforced concrete placement on critical sites.',
      workflowCapabilities: [
        'Grade 500 rebar scheduling & placement 3D diagrams',
        'Moment and shear connection steel fabrication drawings',
        'Direct export to CNC beam lines & fabrication machinery',
        'Zero-error cast-in sleeve penetrations in structural columns'
      ],
      hudMetrics: [
        { label: 'LOD LEVEL', val: 'LOD 400 Fabrication' },
        { label: 'STEEL WASTAGE', val: '< 2.5% Optimal Cut' },
        { label: 'OUTPUT COMPLIANCE', val: 'AISC / BS 8666' }
      ],
      visualType: 'tekla'
    }
  ];

  const activeItem = workbenchItems.find(i => i.id === activeTab) || workbenchItems[0];

  return (
    <section id="software" className="py-24 bg-gradient-to-b from-white via-[#EAF2FF]/40 to-white relative overflow-hidden border-t border-slate-100 scroll-mt-20">
      {/* High-Definition Architectural Skyscraper Background (>=70% Prominence) with 1s Scroll Delay */}
      <ArchitecturalSectionBackground 
        image={bgTower}
        theme="light"
        title="Digital BIM Engineering & Computational Technology Stack"
        location="Global Interoperability / Jamshedpur"
        elevation="DATUM: +84.000m"
        showGrid={false}
        showScanLine={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Header Block with Left-to-Right Reveal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -12 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#165DFF] shadow-xs"
          >
            <Cpu className="w-3.5 h-3.5 text-[#165DFF]" />
            <span>Digital Engineering Ecosystem</span>
            <span className="text-slate-300">·</span>
            <span className="text-[#0B1530] font-bold">Autodesk &amp; OpenBIM</span>
          </motion.div>

          <motion.h2 
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0B1530] tracking-tight"
          >
            Autodesk Revit, Navisworks &amp; <span className="text-[#165DFF]">Digital Tooling</span>
          </motion.h2>

          <motion.p 
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base text-[#26344D] font-body leading-relaxed max-w-2xl mx-auto"
          >
            We deploy verified software configurations tailored to international building codes, LOD requirements, and Common Data Environments.
          </motion.p>

          {/* Software Switcher Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
            {workbenchItems.map((item) => {
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#165DFF] text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400'
                      : 'bg-[#DFEAF5] text-slate-700 hover:text-[#165DFF] border border-blue-300 hover:bg-[#D5E4F2]'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-[#D2E2F0] text-slate-700'
                  }`}>
                    {item.version}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Software Workbench Screen */}
        <motion.div 
          key={activeItem.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden bg-[#0B1530] border border-blue-500/30 shadow-2xl shadow-blue-950/50 text-white"
        >
          {/* Top Software HUD Toolbar */}
          <div className="px-6 py-3.5 bg-slate-950 border-b border-blue-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs font-mono font-bold text-blue-300 ml-2">
                WORKBENCH · {activeItem.name.toUpperCase()} ENGINE
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="hidden sm:inline">CATEGORY: <strong className="text-white">{activeItem.category}</strong></span>
              <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-400/30">
                ACTIVE PIPELINE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider block mb-1">
                  {activeItem.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {activeItem.headline}
                </h3>
                <p className="text-sm text-slate-300 mt-2.5 font-body leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              {/* Verified Capabilities Checklist */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  Verified Engineering Deliverables:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeItem.workflowCapabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-blue-500/10">
                      <CheckCircle2 className="w-4 h-4 text-[#2878FF] shrink-0 mt-0.5" />
                      <span className="leading-tight">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* HUD Metrics Pills */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {activeItem.hudMetrics.map((metric, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/90 border border-blue-500/20 text-center">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">{metric.label}</div>
                    <div className="text-xs font-mono font-bold text-white mt-1">{metric.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Visual Simulation Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-blue-400/30 p-4 aspect-square flex flex-col justify-between">
                {/* Background Wireframe Linework - Optical Glow Scrim */}
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(22,93,255,0.18)_0%,transparent_70%)]"
                />

                {/* Specific Software Diagrams */}
                {activeItem.visualType === 'revit' && (
                  <div className="relative z-10 w-full h-full flex flex-col justify-between p-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-blue-300">
                      <span>3D ISOMETRIC ENVELOPE</span>
                      <span className="text-emerald-400">LOD 350 VERIFIED</span>
                    </div>
                    {/* Architectural 3D Revit Wireframe Graphic */}
                    <svg viewBox="0 0 300 200" className="w-full h-44 text-[#2878FF] drop-shadow-lg">
                      <polygon points="150,20 270,70 150,120 30,70" fill="rgba(22,93,255,0.12)" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="30,70 150,120 150,190 30,140" fill="rgba(40,120,255,0.15)" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="150,120 270,70 270,140 150,190" fill="rgba(22,93,255,0.22)" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="90" y1="95" x2="90" y2="165" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 2" />
                      <line x1="210" y1="95" x2="210" y2="165" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 2" />
                    </svg>
                    <div className="text-[10px] font-mono text-slate-400 bg-slate-900/90 p-2 rounded-lg border border-blue-500/20">
                      REVIT ELEMENT ID: #482910 · MULLION GRID: 1,500 mm
                    </div>
                  </div>
                )}

                {activeItem.visualType === 'navisworks' && (
                  <div className="relative z-10 w-full h-full flex flex-col justify-between p-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-blue-300">
                      <span>CLASH DETECTION MATRIX</span>
                      <span className="text-emerald-400">0 HARD CLASHES</span>
                    </div>
                    {/* Navisworks Clash Simulation Graphic */}
                    <div className="my-auto space-y-2 font-mono text-xs">
                      <div className="p-2 rounded bg-slate-900/90 border border-emerald-500/40 flex items-center justify-between text-emerald-300">
                        <span>CLASH TEST #01: DUCT vs BEAM</span>
                        <span className="font-bold">RESOLVED</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900/90 border border-emerald-500/40 flex items-center justify-between text-emerald-300">
                        <span>CLASH TEST #02: PIPE vs COLUMN</span>
                        <span className="font-bold">CLEAR (+85mm)</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900/90 border border-blue-500/40 flex items-center justify-between text-blue-300">
                        <span>CLASH TEST #03: CABLE TRAY vs SLAB</span>
                        <span className="font-bold">COORDINATED</span>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 bg-slate-900/90 p-2 rounded-lg border border-blue-500/20">
                      TOLERANCE THRESHOLD: 5.0 mm · BCF ISSUE LOG V4.2
                    </div>
                  </div>
                )}

                {activeItem.visualType === 'autocad' && (
                  <div className="relative z-10 w-full h-full flex flex-col justify-between p-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-blue-300">
                      <span>DIMENSIONED GA DRAFTING</span>
                      <span className="text-blue-400">AUTOCAD 2026</span>
                    </div>
                    {/* AutoCAD 2D Floor Plan Graphic */}
                    <svg viewBox="0 0 300 200" className="w-full h-44 text-blue-400">
                      <rect x="30" y="30" width="240" height="140" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                      <line x1="30" y1="100" x2="270" y2="100" stroke="#3B82F6" strokeWidth="1" />
                      <line x1="150" y1="30" x2="150" y2="170" stroke="#3B82F6" strokeWidth="1" />
                      <rect x="70" y="50" width="40" height="30" fill="rgba(37,99,235,0.2)" stroke="#60A5FA" strokeWidth="1" />
                      <rect x="190" y="110" width="40" height="40" fill="rgba(37,99,235,0.2)" stroke="#60A5FA" strokeWidth="1" />
                    </svg>
                    <div className="text-[10px] font-mono text-slate-400 bg-slate-900/90 p-2 rounded-lg border border-blue-500/20">
                      GRID SPACING: 8,400 mm · SCALE: 1:50 VECTOR PDF
                    </div>
                  </div>
                )}

                {activeItem.visualType === 'tekla' && (
                  <div className="relative z-10 w-full h-full flex flex-col justify-between p-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-blue-300">
                      <span>STRUCTURAL STEEL DETAILED</span>
                      <span className="text-amber-400">LOD 400 CNC</span>
                    </div>
                    {/* Structural Steel Node Graphic */}
                    <svg viewBox="0 0 300 200" className="w-full h-44 text-sky-400">
                      <line x1="150" y1="20" x2="150" y2="180" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" />
                      <line x1="40" y1="100" x2="260" y2="100" stroke="#60A5FA" strokeWidth="8" strokeLinecap="round" />
                      <circle cx="150" cy="100" r="14" fill="#1E293B" stroke="#F59E0B" strokeWidth="3" />
                      <circle cx="130" cy="100" r="3" fill="#F59E0B" />
                      <circle cx="170" cy="100" r="3" fill="#F59E0B" />
                    </svg>
                    <div className="text-[10px] font-mono text-slate-400 bg-slate-900/90 p-2 rounded-lg border border-blue-500/20">
                      MOMENT FLANGE BOLTS: M24 GRADE 8.8 · CNC CODE VALIDATED
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
