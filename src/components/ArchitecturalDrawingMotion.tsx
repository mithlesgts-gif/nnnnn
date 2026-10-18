import React, { useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { 
  PenTool, 
  Layers, 
  RotateCcw, 
  Play, 
  Pause, 
  ZoomIn, 
  Building2, 
  Maximize2,
  Compass,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const ArchitecturalDrawingMotion: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const [activeTab, setActiveTab] = useState<'plan' | 'structural' | 'mep' | 'section'>('plan');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mepLayers, setMepLayers] = useState({
    arch: true,
    structure: true,
    hvac: true,
    electrical: true,
    plumbing: true
  });

  const handleRestart = () => {
    setAnimationKey((prev) => prev + 1);
    setIsPlaying(true);
  };

  const toggleMepLayer = (layer: keyof typeof mepLayers) => {
    setMepLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Top Controls & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#DFEAF5]/95 backdrop-blur-md border border-blue-200/90 shadow-sm">
        {/* Discipline Mode Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => { setActiveTab('plan'); handleRestart(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'plan'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Floor Plan Line-by-Line</span>
          </button>
          <button
            onClick={() => { setActiveTab('structural'); handleRestart(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'structural'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Structural Grid Erection</span>
          </button>
          <button
            onClick={() => { setActiveTab('mep'); handleRestart(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'mep'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>MEP Coordinated Layers</span>
          </button>
          <button
            onClick={() => { setActiveTab('section'); handleRestart(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'section'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Section Cut Unfold</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current text-blue-600" />}
          </button>
          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            title="Redraw from Scratch"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => (prev === 1 ? 1.25 : 1))}
            className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 text-xs font-mono font-medium ${
              zoomLevel > 1 
                ? 'bg-blue-50 border-blue-300 text-blue-700' 
                : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Toggle Detail Zoom"
          >
            <ZoomIn className="w-4 h-4" />
            <span>{zoomLevel}x</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Drawing Canvas Viewport */}
      <div className="relative rounded-2xl bg-[#0B1530] border border-blue-900/60 p-6 overflow-hidden shadow-2xl min-h-[440px] flex items-center justify-center">
        {/* CAD Blueprint Grid Background */}
        <div className="absolute inset-0 bg-grid-fine-light opacity-10 pointer-events-none" />
        
        {/* Coordinate HUD Stamps */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-blue-400">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>PROJECT UCS: [E 492100.0, N 248900.0]</span>
          <span className="text-slate-600">·</span>
          <span>SCALE 1:50</span>
        </div>

        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-slate-900/80 px-2.5 py-1 rounded border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" />
          <span>PARAMETRIC REVIT KINEMATICS ACTIVE</span>
        </div>

        {/* Scalable Container with Smooth Zoom Transition */}
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="w-full max-w-4xl h-[360px] flex items-center justify-center relative select-none"
        >
          {/* TAB 1: 2D ARCHITECTURAL FLOOR PLAN LINE-BY-LINE DRAW */}
          {activeTab === 'plan' && (
            <svg
              key={`plan-${animationKey}`}
              viewBox="0 0 800 450"
              className="w-full h-full text-blue-400"
            >
              {/* Grid Lines */}
              <g stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4">
                <line x1="80" y1="40" x2="80" y2="410" />
                <line x1="240" y1="40" x2="240" y2="410" />
                <line x1="400" y1="40" x2="400" y2="410" />
                <line x1="560" y1="40" x2="560" y2="410" />
                <line x1="720" y1="40" x2="720" y2="410" />
                <line x1="50" y1="80" x2="750" y2="80" />
                <line x1="50" y1="200" x2="750" y2="200" />
                <line x1="50" y1="360" x2="750" y2="360" />
              </g>

              {/* Grid Bubbles */}
              <g fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" fontSize="11" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">
                <circle cx="80" cy="30" r="12" /><text x="80" y="30" fill="#93C5FD">A</text>
                <circle cx="240" cy="30" r="12" /><text x="240" y="30" fill="#93C5FD">B</text>
                <circle cx="400" cy="30" r="12" /><text x="400" y="30" fill="#93C5FD">C</text>
                <circle cx="560" cy="30" r="12" /><text x="560" y="30" fill="#93C5FD">D</text>
                <circle cx="720" cy="30" r="12" /><text x="720" y="30" fill="#93C5FD">E</text>

                <circle cx="35" cy="80" r="12" /><text x="35" y="80" fill="#93C5FD">1</text>
                <circle cx="35" cy="200" r="12" /><text x="35" y="200" fill="#93C5FD">2</text>
                <circle cx="35" cy="360" r="12" /><text x="35" y="360" fill="#93C5FD">3</text>
              </g>

              {/* Outer Perimeter Wall - Self Drawing Path */}
              <motion.path
                d="M 80,80 L 720,80 L 720,360 L 400,360 L 400,320 L 240,320 L 240,360 L 80,360 Z"
                fill="rgba(30, 58, 138, 0.15)"
                stroke="#60A5FA"
                strokeWidth="3.5"
                initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                animate={isPlaying ? { pathLength: 1 } : { pathLength: 1 }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
              />

              {/* Interior Core Partitions */}
              <motion.path
                d="M 240,80 L 240,200 L 400,200 L 400,80 M 560,80 L 560,240 M 240,260 L 400,260"
                fill="none"
                stroke="#93C5FD"
                strokeWidth="2"
                initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                animate={isPlaying ? { pathLength: 1 } : { pathLength: 1 }}
                transition={{ duration: 2.2, delay: 1.0, ease: 'easeInOut' }}
              />

              {/* Door Swing Arcs */}
              <motion.path
                d="M 240,140 A 30,30 0 0,1 270,170 L 240,170 M 400,140 A 30,30 0 0,0 370,170 L 400,170"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="2 2"
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.2 }}
              />

              {/* Room Tags */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                fontSize="11"
                fontFamily="sans-serif"
                fill="#F8FAFC"
              >
                <text x="160" y="140" textAnchor="middle" fontWeight="bold">CONFERENCE A</text>
                <text x="160" y="156" textAnchor="middle" fontSize="9" fill="#94A3B8">Area: 48.6 m²</text>

                <text x="320" y="140" textAnchor="middle" fontWeight="bold">BIM LAB CORE</text>
                <text x="320" y="156" textAnchor="middle" fontSize="9" fill="#38BDF8">LOD 350 Model</text>

                <text x="480" y="140" textAnchor="middle" fontWeight="bold">OFFICE SUITE</text>
                <text x="480" y="156" textAnchor="middle" fontSize="9" fill="#94A3B8">Area: 64.2 m²</text>

                <text x="320" y="300" textAnchor="middle" fontWeight="bold">MEP SERVICE SHAFT</text>
                <text x="320" y="315" textAnchor="middle" fontSize="9" fill="#34D399">Vertical Riser</text>
              </motion.g>

              {/* Dimension Strings */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.6 }}
                stroke="#38BDF8"
                strokeWidth="1"
                fontSize="9"
                fontFamily="monospace"
                fill="#38BDF8"
              >
                <line x1="80" y1="400" x2="720" y2="400" />
                <line x1="80" y1="392" x2="80" y2="408" />
                <line x1="720" y1="392" x2="720" y2="408" />
                <text x="400" y="394" textAnchor="middle" fill="#38BDF8">DIM: 32,000 mm</text>
              </motion.g>
            </svg>
          )}

          {/* TAB 2: STRUCTURAL GRID & STEEL FRAME ERECTION LEVEL-BY-LEVEL */}
          {activeTab === 'structural' && (
            <svg
              key={`structural-${animationKey}`}
              viewBox="0 0 800 450"
              className="w-full h-full"
            >
              {/* Foundation Piles */}
              <motion.g
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {[120, 260, 400, 540, 680].map((x, i) => (
                  <g key={`pile-${i}`} fill="#1E293B" stroke="#0284C7" strokeWidth="1.5">
                    <rect x={x - 18} y="390" width="36" height="30" rx="3" />
                    <line x1={x} y1="390" x2={x} y2="420" stroke="#38BDF8" strokeDasharray="3 3" />
                    <text x={x} y="410" fontSize="8" fill="#7DD3FC" textAnchor="middle" fontFamily="monospace">P-{i + 1}</text>
                  </g>
                ))}
                <line x1="80" y1="390" x2="720" y2="390" stroke="#64748B" strokeWidth="3" />
                <text x="400" y="380" fontSize="10" fill="#94A3B8" textAnchor="middle" fontFamily="monospace">GROUND SLAB DATUM ±0.000m</text>
              </motion.g>

              {/* Heavy Vertical Columns (Basement to Level 3) */}
              {[120, 260, 400, 540, 680].map((x, i) => (
                <motion.line
                  key={`col-${i}`}
                  x1={x}
                  y1="390"
                  x2={x}
                  y2="100"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                  animate={isPlaying ? { pathLength: 1 } : { pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                />
              ))}

              {/* Horizontal Floor Beams - Level 1, 2, 3 */}
              {[
                { y: 300, level: 'LOD 400 LEVEL 01 (+4.500m)', delay: 1.2 },
                { y: 200, level: 'LOD 400 LEVEL 02 (+9.000m)', delay: 1.8 },
                { y: 100, level: 'ROOF TRUSS DATUM (+13.500m)', delay: 2.3 }
              ].map((tier, idx) => (
                <g key={`tier-${idx}`}>
                  <motion.line
                    x1="100"
                    y1={tier.y}
                    x2="700"
                    y2={tier.y}
                    stroke="#60A5FA"
                    strokeWidth="6"
                    initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                    animate={isPlaying ? { pathLength: 1 } : { pathLength: 1 }}
                    transition={{ duration: 1.4, delay: tier.delay, ease: 'easeInOut' }}
                  />
                  <motion.text
                    x="715"
                    y={tier.y + 4}
                    fontSize="9"
                    fill="#38BDF8"
                    fontFamily="monospace"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: tier.delay + 0.6 }}
                  >
                    {tier.level}
                  </motion.text>
                </g>
              ))}

              {/* Diagonal Bracing Trusses */}
              <motion.path
                d="M 120,390 L 260,300 M 260,390 L 120,300 M 540,300 L 680,200 M 680,300 L 540,200"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                animate={isPlaying ? { pathLength: 1 } : { pathLength: 1 }}
                transition={{ duration: 1.5, delay: 2.6 }}
              />

              {/* Moment Connection Callout */}
              <motion.circle
                cx="400"
                cy="200"
                r="18"
                fill="none"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                transition={{ delay: 3.0, duration: 1.8, repeat: Infinity }}
              />
              <motion.text
                x="400"
                y="170"
                fill="#FCA5A5"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.1 }}
              >
                MOMENT SHEAR NODE (0 CLASH)
              </motion.text>
            </svg>
          )}

          {/* TAB 3: MEP COORDINATED LAYERS (HVAC, ELECTRICAL, PLUMBING) */}
          {activeTab === 'mep' && (
            <svg
              key={`mep-${animationKey}`}
              viewBox="0 0 800 450"
              className="w-full h-full"
            >
              {/* Architecture Background Walls */}
              {mepLayers.arch && (
                <g stroke="#334155" strokeWidth="2" fill="none">
                  <rect x="80" y="60" width="640" height="320" rx="4" />
                  <line x1="280" y1="60" x2="280" y2="380" strokeDasharray="3 3" />
                  <line x1="520" y1="60" x2="520" y2="380" strokeDasharray="3 3" />
                  <text x="180" y="90" fill="#64748B" fontSize="11" fontFamily="sans-serif">CORRIDOR A</text>
                  <text x="400" y="90" fill="#64748B" fontSize="11" fontFamily="sans-serif">PLENUM CEILING VOID</text>
                </g>
              )}

              {/* Structural Columns */}
              {mepLayers.structure && (
                <g fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.5">
                  <rect x="140" y="100" width="24" height="24" rx="2" />
                  <rect x="390" y="100" width="24" height="24" rx="2" />
                  <rect x="630" y="100" width="24" height="24" rx="2" />
                  <rect x="140" y="280" width="24" height="24" rx="2" />
                  <rect x="390" y="280" width="24" height="24" rx="2" />
                  <rect x="630" y="280" width="24" height="24" rx="2" />
                </g>
              )}

              {/* HVAC Rectangular Supply Air Duct (Cyan) */}
              {mepLayers.hvac && (
                <motion.g
                  initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                >
                  <path
                    d="M 60,180 L 740,180 L 740,220 L 60,220 Z"
                    fill="rgba(6, 182, 212, 0.2)"
                    stroke="#06B6D4"
                    strokeWidth="3"
                  />
                  {/* Duct diffusers */}
                  <rect x="220" y="165" width="40" height="15" fill="#22D3EE" />
                  <rect x="460" y="165" width="40" height="15" fill="#22D3EE" />
                  <text x="400" y="205" fill="#E0F2FE" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    SUPPLY AIR DUCT 1200x500mm (SMACNA CL-A)
                  </text>
                </motion.g>
              )}

              {/* Electrical Cable Trays (Amber) */}
              {mepLayers.electrical && (
                <motion.path
                  d="M 100,130 L 700,130 M 340,130 L 340,340 M 580,130 L 580,340"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeDasharray="6 3"
                  initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 0.5 }}
                />
              )}

              {/* Chilled Water & Sprinkler Fire Piping (Emerald) */}
              {mepLayers.plumbing && (
                <motion.g
                  initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                >
                  <path
                    d="M 110,250 L 690,250 M 230,250 L 230,330 M 470,250 L 470,330"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                  />
                  {/* Sprinkler heads */}
                  <circle cx="230" cy="330" r="4" fill="#34D399" />
                  <circle cx="470" cy="330" r="4" fill="#34D399" />
                  <text x="590" y="242" fill="#6EE7B7" fontSize="10" fontFamily="monospace">
                    CHW FLOW Ø150mm
                  </text>
                </motion.g>
              )}
            </svg>
          )}

          {/* TAB 4: SECTION CUTAWAY UNFOLDING FROM LEFT TO RIGHT */}
          {activeTab === 'section' && (
            <svg
              key={`section-${animationKey}`}
              viewBox="0 0 800 450"
              className="w-full h-full text-blue-400"
            >
              {/* Left-to-Right Animated Section Reveal */}
              <motion.g
                initial={shouldReduceMotion ? {} : { clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Structural Foundation Pad */}
                <rect x="80" y="380" width="640" height="30" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
                <text x="400" y="400" fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  REINFORCED CONCRETE RAFT FOUNDATION · THICKNESS 1,800mm
                </text>

                {/* Slabs (Level 1, 2, 3) */}
                <rect x="80" y="280" width="640" height="14" fill="#334155" stroke="#60A5FA" strokeWidth="1.5" />
                <rect x="80" y="180" width="640" height="14" fill="#334155" stroke="#60A5FA" strokeWidth="1.5" />
                <rect x="80" y="80" width="640" height="14" fill="#334155" stroke="#60A5FA" strokeWidth="1.5" />

                {/* Staircase Run */}
                <path
                  d="M 160,380 L 160,350 L 190,350 L 190,320 L 220,320 L 220,290 L 250,290 L 250,280"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                />

                {/* Vertical Glazing Curtain Wall Envelope on Right */}
                <line x1="710" y1="80" x2="710" y2="380" stroke="#06B6D4" strokeWidth="4" />
                {[120, 160, 200, 240, 280, 320, 360].map((y, i) => (
                  <circle key={`transom-${i}`} cx="710" cy={y} r="3" fill="#22D3EE" />
                ))}
                <text x="690" y="230" fill="#22D3EE" fontSize="9" fontFamily="monospace" transform="rotate(-90 690,230)">
                  DOUBLE-SKIN CURTAIN WALL
                </text>

                {/* Ceiling Void MEP Racks */}
                <rect x="300" y="210" width="280" height="22" fill="rgba(6, 182, 212, 0.25)" stroke="#06B6D4" strokeWidth="1" strokeDasharray="3 3" />
                <text x="440" y="225" fill="#E0F2FE" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  COORDINATED MEP CEILING VOID (CLEARANCE 650mm)
                </text>
              </motion.g>
            </svg>
          )}
        </div>

        {/* Dynamic MEP Layer Toggle Pill Strip when in MEP tab */}
        {activeTab === 'mep' && (
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => toggleMepLayer('arch')}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                mepLayers.arch ? 'bg-slate-700 text-white border border-slate-500' : 'bg-slate-900/60 text-slate-500 border border-slate-800'
              }`}
            >
              Architecture
            </button>
            <button
              onClick={() => toggleMepLayer('structure')}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                mepLayers.structure ? 'bg-blue-900 text-blue-200 border border-blue-500' : 'bg-slate-900/60 text-slate-500 border border-slate-800'
              }`}
            >
              Structure
            </button>
            <button
              onClick={() => toggleMepLayer('hvac')}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                mepLayers.hvac ? 'bg-cyan-900 text-cyan-200 border border-cyan-500' : 'bg-slate-900/60 text-slate-500 border border-slate-800'
              }`}
            >
              HVAC Ducts
            </button>
            <button
              onClick={() => toggleMepLayer('electrical')}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                mepLayers.electrical ? 'bg-amber-900 text-amber-200 border border-amber-500' : 'bg-slate-900/60 text-slate-500 border border-slate-800'
              }`}
            >
              Cable Trays
            </button>
            <button
              onClick={() => toggleMepLayer('plumbing')}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                mepLayers.plumbing ? 'bg-emerald-900 text-emerald-200 border border-emerald-500' : 'bg-slate-900/60 text-slate-500 border border-slate-800'
              }`}
            >
              Piping &amp; Fire
            </button>
          </div>
        )}
      </div>

      {/* Explanatory Caption Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        <div className="p-4 rounded-xl bg-[#E2EDF7]/95 border border-blue-200/90 space-y-1">
          <span className="text-[10px] font-mono text-blue-600 font-bold block">1. VECTOR LINEWORK</span>
          <div className="text-xs font-bold text-slate-900">Synchronized Parametric Lines</div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Floor plans and elevations generated directly from centralized 3D Revit models, ensuring 100% coordination between views.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#E2EDF7]/95 border border-blue-200/90 space-y-1">
          <span className="text-[10px] font-mono text-blue-600 font-bold block">2. MULTI-TIER LAYERING</span>
          <div className="text-xs font-bold text-slate-900">Disciplinary Hierarchy</div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Priority routing ensures gravity drainage and large HVAC ducts take precedence before flexible conduit and domestic lines.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#E2EDF7]/95 border border-blue-200/90 space-y-1">
          <span className="text-[10px] font-mono text-blue-600 font-bold block">3. SECTIONAL INTEGRITY</span>
          <div className="text-xs font-bold text-slate-900">Constructability Validation</div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Section cutaways verify vertical riser clearances, structural slab penetrations, and ceiling plenum accessibility.
          </p>
        </div>
      </div>
    </div>
  );
};
