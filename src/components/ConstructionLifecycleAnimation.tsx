import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  Maximize2, 
  Compass, 
  Box, 
  Building2, 
  HardHat, 
  GitBranch, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Eye
} from 'lucide-react';

import bgJobsite from '../assets/images/bg_modern_jobsite_1792156747851.jpg';
import bgCrane from '../assets/images/bg_crane_structure_1792156747263.jpg';
import bgFacade from '../assets/images/bg_bim_glass_facade_1792156749000.jpg';
import bgTower from '../assets/images/bg_modern_building_tower_1792162103443.jpg';
import artisanLogo from '../assets/images/shilp_artisan_logo.jpg';
import blueprintImg from '../assets/library/blueprint_drawing_table.jpg';
import clashResolutionImg from '../assets/images/bim_clash_resolution_model_1792317942291.jpg';
import structuralSteelImg from '../assets/images/structural_steel_tower_erection.jpg';

export interface ConstructionStage {
  id: number;
  name: string;
  shortLabel: string;
  software: string;
  lod: string;
  elevation: string;
  title: string;
  subtitle: string;
  description: string;
  keyDeliverables: string[];
  metrics: { label: string; value: string }[];
  bgImage?: string;
}

export const constructionStages: ConstructionStage[] = [
  {
    id: 1,
    name: 'Concept & Planning',
    shortLabel: '01. Concept & 2D CAD',
    software: 'AutoCAD / Civil 3D',
    lod: 'LOD 100 - 200',
    elevation: 'DATUM 0.000m',
    title: 'Stage 1: Architectural Sketches & 2D CAD Linework',
    subtitle: 'From Hand Sketches to Dimensioned Digital Site Blueprints',
    description: 'Site plans, spatial grids, municipal setback lines, and dimensioned architectural plans are generated. The 2D drawings are audited for geometric integrity before initiating 3D spatial modeling.',
    keyDeliverables: [
      'Topographical survey alignment & project base point',
      'Architectural GA floor plans & elevation drawings',
      'Structural grid coordinates & column centerlines',
      'BIM Execution Plan (BEP) parameter definitions'
    ],
    metrics: [
      { label: 'Grid Precision', value: '±1.0 mm' },
      { label: 'Coordinate System', value: 'Shared UCS' },
      { label: 'Code Compliance', value: 'NBC / ISO 19650' }
    ],
    bgImage: blueprintImg
  },
  {
    id: 2,
    name: 'BIM Modeling',
    shortLabel: '02. Revit 3D Modeling',
    software: 'Autodesk Revit',
    lod: 'LOD 300 - 350',
    elevation: 'LEVEL 01 - 12',
    title: 'Stage 2: Parametric Architectural, Structural & MEP Assembly',
    subtitle: 'Transforming 2D Blueprints into Coordinated 3D Building Models',
    description: 'Architectural envelopes, deep concrete piles, core sheer walls, and multi-tier MEP service conduits are modeled parametrically. Element metadata, materials, and thermal values are assigned.',
    keyDeliverables: [
      'Parametric Revit Families (.RFA) with engineering attributes',
      'Structural reinforced concrete frame & steel connection details',
      'MEP gravity drainage, HVAC ductwork, and sprinkler routes',
      'Automated Bill of Quantities (BOQ) and room schedules'
    ],
    metrics: [
      { label: 'Disciplinary Models', value: '3 Disciplines' },
      { label: 'Parameter Richness', value: 'COBie Ready' },
      { label: 'Modeling Standard', value: 'BIM Forum 2024' }
    ]
  },
  {
    id: 3,
    name: 'Structural Construction',
    shortLabel: '03. Superstructure Build',
    software: 'Tekla Structures / Revit',
    lod: 'LOD 400 Fabrication',
    elevation: 'ELEV +48.600m',
    title: 'Stage 3: Foundation Placement & Rising Superstructure',
    subtitle: 'Sequential Construction Progress from Ground Foundations Upward',
    description: 'Foundations and bored piles are poured, followed by columns, moment-resisting steel frames, post-tensioned floor slabs, and elevator structural cores rising sequentially floor by floor.',
    keyDeliverables: [
      'Bar Bending Schedules (BBS) & rebar cage assemblies',
      'Cast-in MEP sleeve penetration drawings',
      'Structural steel erection shop drawings & cut-lists',
      'Tower crane hook radius and site logistics sequencing'
    ],
    metrics: [
      { label: 'Structural Steel', value: 'Grade 350 MPa' },
      { label: 'Rebar BBS Wastage', value: '< 2.4%' },
      { label: 'Erection Accuracy', value: '100% Verified' }
    ],
    bgImage: structuralSteelImg
  },
  {
    id: 4,
    name: 'BIM Coordination',
    shortLabel: '04. Navisworks Clash Audit',
    software: 'Navisworks Manage',
    lod: 'LOD 350 / 400',
    elevation: 'FULL FEDERATION',
    title: 'Stage 4: Multi-Disciplinary Federation & Clash Resolution',
    subtitle: 'Eliminating Costly Field Clashes Before Construction Release',
    description: 'Federated multidisciplinary model review in Navisworks Manage. Automated clash tests identify physical interferences between MEP ducts, sprinkler pipes, and structural transfer beams.',
    keyDeliverables: [
      'Automated clash detection matrix & BCF issue tracking',
      'Combined Services Drawings (CSD) & Builders Work (BWIC)',
      'Virtual coordination meetings & resolution sign-offs',
      'Zero-clash model signoff prior to fabrication release'
    ],
    metrics: [
      { label: 'Clash Resolution', value: '100% Zero-Clash' },
      { label: 'Rework Savings', value: 'Est. 18-24%' },
      { label: 'Model Federation', value: 'Real-Time NWD' }
    ],
    bgImage: clashResolutionImg
  },
  {
    id: 5,
    name: 'Building Completion',
    shortLabel: '05. Completion & Twin',
    software: 'Autodesk Construction Cloud / Digital Twin',
    lod: 'LOD 500 As-Built',
    elevation: 'COMPLETED ASSET',
    title: 'Stage 5: High-Performance Facade & Digital Twin Handover',
    subtitle: 'Photorealistic Architectural Visualization & FM-Ready Asset Model',
    description: 'High-performance curtain wall glass panels, architectural finishes, landscaping, and building management sensors are finalized. The completed building is handed over as an intelligent LOD 500 Digital Twin.',
    keyDeliverables: [
      'LOD 500 Verified As-Built 3D Digital Twin model',
      'Synchronized Facilities Management (FM) COBie asset data',
      'Photorealistic exterior & interior architectural visualizations',
      'Complete warranty, O&M manuals, and digital asset lifecycle'
    ],
    metrics: [
      { label: 'Lifecycle Readiness', value: 'LOD 500 Twin' },
      { label: 'As-Built Tolerance', value: '±3 mm Laser' },
      { label: 'Handover Quality', value: 'ISO 19650-2' }
    ],
    bgImage: bgTower
  }
];

export const ConstructionLifecycleAnimation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(!shouldReduceMotion);
  const [progress, setProgress] = useState<number>(0);

  // Auto-progress stages when playing
  useEffect(() => {
    if (!isPlaying || shouldReduceMotion) return;

    const intervalTime = 70; // update tick
    const totalStageDuration = 7000; // 7 seconds per stage
    const stepIncrement = (intervalTime / totalStageDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStageId((curr) => (curr >= 5 ? 1 : curr + 1));
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, shouldReduceMotion, activeStageId]);

  const activeStage = constructionStages.find(s => s.id === activeStageId) || constructionStages[0];

  const handleStageSelect = (stageId: number) => {
    setActiveStageId(stageId);
    setProgress(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setActiveStageId(1);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden bg-[#0B1530] border border-blue-500/30 shadow-2xl shadow-blue-950/60 text-white relative">
      {/* Top Header Bar / Software HUD */}
      <div className="px-5 py-3.5 bg-slate-950/90 border-b border-blue-500/20 flex flex-wrap items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-blue-400/50 shrink-0 shadow-xs">
            <img src={artisanLogo} alt="SHILP BIM Solutions" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
                SHILP BIM Solutions Pvt. Ltd.
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                LIFECYCLE ENGINE
              </span>
            </div>
            <div className="text-[11px] font-display text-slate-300 font-semibold">
              Construction From Scratch to Completion · Interactive Visualizer
            </div>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <span className="text-blue-400 font-bold">SOFTWARE:</span>
            <span className="text-white">{activeStage.software}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-900/40 border border-blue-400/30 text-blue-300">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span className="font-bold">{activeStage.lod}</span>
          </div>
        </div>
      </div>

      {/* Main 16:9 Cinematic Animation Viewport */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-b from-slate-950 via-[#0B1530] to-slate-950 flex items-center justify-center">
        {/* Stage 1: 2D CAD Blueprint Linework */}
        {activeStageId === 1 && (
          <div className="absolute inset-0 flex items-center justify-center p-8 overflow-hidden">
            {/* Authentic Architectural Drafting Blueprint Photography Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={blueprintImg}
                alt="Architectural technical drawings and drafting table"
                className="w-full h-full object-cover filter brightness-[0.4] contrast-125 saturate-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1530]/90 via-[#0B1530]/75 to-[#0B1530]/85" />
            </div>

            {/* Animated Drafting Vector Drawing */}
            <svg viewBox="0 0 800 450" className="w-full h-full max-h-[380px] text-blue-400 relative z-10 drop-shadow-md">
              {/* Site Boundary & Dimension Lines */}
              <motion.rect
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                x="80" y="50" width="640" height="350"
                fill="none" stroke="#2878FF" strokeWidth="1.5" strokeDasharray="6 4"
              />

              {/* Grid Lines with Axis Callouts */}
              <line x1="80" y1="120" x2="720" y2="120" stroke="#165DFF" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="80" y1="200" x2="720" y2="200" stroke="#165DFF" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="80" y1="280" x2="720" y2="280" stroke="#165DFF" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="80" y1="360" x2="720" y2="360" stroke="#165DFF" strokeWidth="1" strokeOpacity="0.4" />

              <line x1="180" y1="50" x2="180" y2="400" stroke="#165DFF" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="300" y1="50" x2="300" y2="400" stroke="#165DFF" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="420" y1="50" x2="420" y2="400" stroke="#165DFF" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="540" y1="50" x2="540" y2="400" stroke="#165DFF" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="660" y1="50" x2="660" y2="400" stroke="#165DFF" strokeWidth="1" strokeOpacity="0.4" />

              {/* Structural Core & Column Centerlines drawing in real time */}
              <motion.rect
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
                x="260" y="140" width="280" height="200"
                fill="rgba(22, 93, 255, 0.08)" stroke="#60A5FA" strokeWidth="2"
              />

              {/* Columns */}
              {[180, 300, 420, 540, 660].map((cx, i) =>
                [120, 200, 280, 360].map((cy, j) => (
                  <motion.rect
                    key={`${i}-${j}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + (i + j) * 0.05 }}
                    x={cx - 8} y={cy - 8} width="16" height="16"
                    fill="#3B82F6" stroke="#93C5FD" strokeWidth="1"
                  />
                ))
              )}

              {/* Dimension Ticks & Dimension Text */}
              <text x="400" y="35" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                ◄── TOTAL SPAN: 64,000 mm ──►
              </text>
              <text x="50" y="230" fill="#93C5FD" fontSize="12" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 50 230)" fontWeight="bold">
                ◄── BUILDING DEPTH: 35,000 mm ──►
              </text>
            </svg>

            {/* Corner CAD Status Overlay */}
            <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-lg bg-black/60 border border-blue-500/30 text-[11px] font-mono text-blue-300 backdrop-blur-xs flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '20s' }} />
              <span>DWG LAYOUT: 1:100 SCALE · AUTOCAD AUDIT PASS</span>
            </div>
          </div>
        )}

        {/* Stage 2: 3D Revit Parametric Model Assembly */}
        {activeStageId === 2 && (
          <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-b from-[#0B1530] to-slate-950">
            {/* 3D Isometric Wireframe Frame */}
            <div className="relative w-full h-full max-w-2xl flex items-center justify-center">
              <svg viewBox="0 0 600 360" className="w-full h-full text-blue-400 drop-shadow-xl">
                {/* Isometric Building Foundation Grid */}
                <polygon points="300,40 540,140 300,240 60,140" fill="rgba(22,93,255,0.06)" stroke="#2878FF" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Ground Level Structural Frame */}
                <motion.polygon
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  points="300,100 480,175 300,250 120,175"
                  fill="rgba(40,120,255,0.12)" stroke="#60A5FA" strokeWidth="2"
                />

                {/* 3D Structural Columns Rising */}
                {[
                  [120, 175, 120, 95],
                  [180, 150, 180, 70],
                  [300, 250, 300, 170],
                  [300, 100, 300, 20],
                  [420, 150, 420, 70],
                  [480, 175, 480, 95]
                ].map(([x1, y1, x2, y2], idx) => (
                  <motion.line
                    key={idx}
                    initial={{ y2: y1 }}
                    animate={{ y2 }}
                    transition={{ duration: 1.2, delay: idx * 0.15 }}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#38BDF8" strokeWidth="3" strokeLinecap="round"
                  />
                ))}

                {/* Level 2 Floor Slab */}
                <motion.polygon
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  points="300,40 480,115 300,190 120,115"
                  fill="rgba(56,189,248,0.15)" stroke="#38BDF8" strokeWidth="1.8"
                />

                {/* MEP Ducts & Piping Overlay in Blue & Cyan */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 1.2 }}
                  d="M 140,110 L 260,160 L 380,110 L 440,135"
                  fill="none" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 1.5 }}
                  d="M 220,140 L 220,70 L 340,20"
                  fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="4 2"
                />
              </svg>

              {/* Revit Modeling Palette HUD */}
              <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/80 border border-blue-400/30 backdrop-blur-md text-[10px] font-mono space-y-1">
                <div className="text-blue-300 font-bold flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-blue-400" />
                  <span>AUTODESK REVIT 2025</span>
                </div>
                <div className="text-slate-300">FAMILY: GlazedCurtainWall_TypeA</div>
                <div className="text-emerald-400">PARAMETERS: 42 Coordinated</div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: Superstructure Construction & Cranes */}
        {activeStageId === 3 && (
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              initial={{ scale: 1.05, opacity: 0.8 }}
              animate={{ scale: 1.12, opacity: 1 }}
              transition={{ duration: 8, ease: 'easeInOut' }}
              src={bgCrane}
              alt="Structural Steel and Tower Crane"
              className="w-full h-full object-cover filter contrast-110 brightness-95"
            />
            {/* Dark Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Augmented Reality Engineering HUD Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-400/40 text-xs font-mono text-blue-300 backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span>LOD 400 STEEL ERECTION: LEVEL 08 COMPLETE</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-black/70 border border-slate-700 text-xs font-mono text-slate-300">
                  <span>CRANE RADIUS: 55.0 m · HOOK LOAD: 8.4 TONNES</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="space-y-1 bg-slate-950/85 p-3 rounded-xl border border-blue-500/30 backdrop-blur-md max-w-sm">
                  <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-blue-400" />
                    <span>Real-World Construction Verification</span>
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed font-body">
                    On-site structural components are synchronized daily with the central Tekla and Revit fabrication models.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 4: Multi-Discipline BIM Coordination (Navisworks) */}
        {activeStageId === 4 && (
          <div className="absolute inset-0 overflow-hidden bg-slate-950">
            <motion.img
              initial={{ scale: 1.04 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 8, ease: 'easeInOut' }}
              src={clashResolutionImg}
              alt="Navisworks federated clash detection and resolution model"
              className="w-full h-full object-cover filter contrast-110 opacity-75"
            />
            <div className="absolute inset-0 bg-[#0B1530]/60 backdrop-blur-xs" />

            {/* Navisworks Clash Matrix Visualizer */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-blue-400/40 text-xs font-mono text-blue-300">
                  <GitBranch className="w-4 h-4 text-blue-400" />
                  <span>NAVISWORKS MANAGE · FEDERATED MODEL COORDINATION</span>
                </div>
                <div className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/40 flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>0 HARD CLASHES DETECTED</span>
                </div>
              </div>

              {/* Clash Matrix Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-blue-500/30 backdrop-blur-md">
                  <div className="text-[10px] font-mono text-blue-400 font-bold uppercase">HVAC vs Structure</div>
                  <div className="text-xs font-bold text-white mt-0.5">Duct Sleeves Cleared</div>
                  <div className="text-[10px] text-slate-400 mt-1">24 Sleeve cast-ins validated</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-blue-500/30 backdrop-blur-md">
                  <div className="text-[10px] font-mono text-sky-400 font-bold uppercase">Piping vs Electrical</div>
                  <div className="text-xs font-bold text-white mt-0.5">Gravity Drainage Clear</div>
                  <div className="text-[10px] text-slate-400 mt-1">Cable tray elevations resolved</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Facade vs Slab Edge</div>
                  <div className="text-xs font-bold text-white mt-0.5">Bracket Fixings Locked</div>
                  <div className="text-[10px] text-slate-400 mt-1">Zero perimeter clash release</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage 5: Completed Skyscraper & LOD 500 Digital Twin */}
        {activeStageId === 5 && (
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              initial={{ scale: 1.02 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 9, ease: 'easeInOut' }}
              src={bgTower}
              alt="Completed Skyscraper and Digital Twin"
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Handover Badge & Digital Twin Seal */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/90 text-xs font-mono text-white font-bold shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-blue-200" />
                  <span>LOD 500 AS-BUILT DIGITAL TWIN DELIVERED</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-blue-400/30 text-xs font-mono text-blue-200">
                  <span>FACILITY MANAGEMENT READY</span>
                </div>
              </div>

              <div className="bg-slate-950/85 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-md max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-400 shrink-0">
                    <img src={artisanLogo} alt="SHILP BIM Solutions" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-display font-bold text-white">
                      SHILP BIM Solutions Pvt. Ltd.
                    </div>
                    <div className="text-xs text-blue-300 font-mono">
                      Precision BIM Engineering · Completed Asset Handover
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Progress Bar at bottom of viewport */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stage Scrubbing & Interactive Controls Bar */}
      <div className="p-4 sm:p-6 bg-slate-950/95 border-t border-blue-500/20 space-y-4">
        {/* Play/Pause & Stage Switcher Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/30 active:scale-95"
              aria-label={isPlaying ? 'Pause Construction Animation' : 'Play Construction Animation'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Restart from Stage 1"
              aria-label="Restart Animation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
              STAGE {activeStageId} OF 5
            </span>
          </div>

          {/* 5 Stage Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 w-full md:w-auto">
            {constructionStages.map((stage) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageSelect(stage.id)}
                  className={`px-3 py-2 rounded-xl text-left font-mono text-[11px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 border border-blue-400'
                      : 'bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <div className="truncate font-semibold">{stage.shortLabel}</div>
                  <div className={`text-[9px] truncate ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                    {stage.lod}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Description & Technical Deliverables */}
        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-blue-400 font-bold">{activeStage.subtitle}</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-mono text-slate-400">{activeStage.elevation}</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold font-display text-white">
              {activeStage.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
              {activeStage.description}
            </p>
          </div>

          {/* Technical Deliverables Checklist */}
          <div className="lg:col-span-5 bg-slate-900/70 p-3.5 rounded-2xl border border-blue-500/20 space-y-2">
            <div className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between">
              <span>Verified Stage Deliverables</span>
              <span className="text-slate-400 font-normal">ISO 19650 Quality</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {activeStage.keyDeliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
