import React, { useState } from 'react';
import { AlertOctagon, CheckCircle2, RotateCcw, ArrowRight, ShieldAlert, Eye, Layers } from 'lucide-react';
import clashResolutionModel from '../assets/images/bim_clash_resolution_model_1792317942291.jpg';

export const ClashDetectionDemo: React.FC = () => {
  const [resolutionStrategy, setResolutionStrategy] = useState<'initial' | 'reroute' | 'sleeve'>('initial');
  const [visualMode, setVisualMode] = useState<'3d-model' | 'schematic'>('3d-model');

  return (
    <div className="bg-[#EAF1F8] border border-blue-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-200/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold">
            <AlertOctagon className="w-4 h-4" />
            <span>Interactive Clash Resolution Sandbox</span>
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
            Coordination Scenario: 600x400 Supply Duct vs. W12x26 Structural Steel Beam
          </h3>
        </div>

        {/* Status Pill & Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2 self-start">
          <div className="flex items-center gap-1 bg-[#DFEAF5] p-1 rounded-xl border border-blue-300 text-xs font-mono">
            <button
              onClick={() => setVisualMode('3d-model')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                visualMode === '3d-model'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-blue-700'
              }`}
            >
              3D BIM Model View
            </button>
            <button
              onClick={() => setVisualMode('schematic')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                visualMode === 'schematic'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:text-blue-700'
              }`}
            >
              2D Section Schematic
            </button>
          </div>

          {resolutionStrategy === 'initial' ? (
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#DFEAF5] text-blue-700 border border-blue-300 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              PHYSICAL INTERFERENCE
            </span>
          ) : (
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#DCE7F3] text-blue-700 border border-blue-400 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              RESOLVED &amp; COORDINATED
            </span>
          )}
        </div>
      </div>

      {/* Main Visual Comparison Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive Diagram Area / 3D BIM Model View */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-5 min-h-[320px] flex flex-col justify-between relative overflow-hidden shadow-inner">
          {/* Elevation HUD */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="text-blue-400 font-bold">GRID B-4 INTERSECTION · LEVEL 03</span>
            <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-700">ELEVATION: +11.450m</span>
          </div>

          {visualMode === '3d-model' ? (
            <div className="my-3 relative rounded-xl overflow-hidden border border-blue-500/30 bg-slate-950 shadow-md">
              <img
                src={clashResolutionModel}
                alt="Navisworks Clash Detective federated BIM model showing HVAC duct colliding with structural steel beam and coordinated clearance solution"
                className="w-full h-64 object-cover object-center filter contrast-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                <span className="bg-red-950/90 text-red-300 px-2 py-0.5 rounded border border-red-500/40 font-bold">
                  ● CLASH: DUCT INTERSECTS W12x26 BEAM
                </span>
                <span className="bg-emerald-950/90 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 font-bold">
                  ✓ RESOLVED: 45° ELBOW CLEARANCE 75mm
                </span>
              </div>
            </div>
          ) : (
            /* Schematic SVG Visualization */
            <div className="relative py-8 flex items-center justify-center">
              <svg viewBox="0 0 500 220" className="w-full max-w-lg h-auto select-none">
                {/* Finished Ceiling Line */}
                <line x1="20" y1="30" x2="480" y2="30" stroke="#475569" strokeDasharray="4 4" strokeWidth="1" />
                <text x="30" y="24" fill="#94a3b8" fontSize="10" fontFamily="monospace">FINISHED CEILING LINE (+11.800m)</text>

                {/* Concrete Beam */}
                <rect x="180" y="30" width="140" height="90" fill="#475569" stroke="#94a3b8" strokeWidth="2" rx="2" />
                <text x="195" y="75" fill="#f1f5f9" fontSize="12" fontWeight="bold" fontFamily="monospace">PT BEAM (600x900)</text>

                {/* HVAC Duct Geometry */}
                {resolutionStrategy === 'initial' && (
                  <>
                    <rect x="40" y="60" width="420" height="45" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" opacity="0.85" />
                    <text x="60" y="88" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">SUPPLY AIR DUCT (600x400)</text>
                    
                    {/* Collision Point */}
                    <circle cx="250" cy="82" r="22" fill="#ef4444" opacity="0.4" />
                    <circle cx="250" cy="82" r="14" fill="#ef4444" opacity="0.9" className="animate-pulse" />
                    <text x="236" y="86" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">CLASH</text>
                  </>
                )}

                {resolutionStrategy === 'reroute' && (
                  <>
                    <path 
                      d="M 40 60 L 150 60 L 175 135 L 325 135 L 350 60 L 460 60 L 460 105 L 340 105 L 315 180 L 185 180 L 160 105 L 40 105 Z" 
                      fill="#0284c7" 
                      stroke="#38bdf8" 
                      strokeWidth="2" 
                    />
                    <text x="60" y="88" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">OFFSET REROUTE (-450mm JOG)</text>
                    <text x="200" y="162" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">CLEARANCE: 75mm OK</text>
                  </>
                )}

                {resolutionStrategy === 'sleeve' && (
                  <>
                    <rect x="40" y="60" width="420" height="45" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                    <circle cx="250" cy="82" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                    <rect x="220" y="60" width="60" height="45" fill="#38bdf8" opacity="0.4" />
                    <text x="195" y="145" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">ENGINEERED SLEEVE DIA 500</text>
                  </>
                )}
              </svg>
            </div>
          )}

          {/* Coordinate Readout */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pt-2 border-t border-slate-800">
            <span>Interference Status: {resolutionStrategy === 'initial' ? 'Active Collision Detected' : '0.00 mm (Clear)'}</span>
            <span className="text-blue-400">Navisworks Issue ID: #CL-MEP-0419</span>
          </div>
        </div>

        {/* Resolution Options */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Select Engineered Resolution Path
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setResolutionStrategy('initial')}
              className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                resolutionStrategy === 'initial'
                  ? 'bg-[#DCE7F3] border-blue-500 text-slate-900 shadow-sm'
                  : 'bg-[#DFEAF5] border-blue-200 text-slate-700 hover:bg-blue-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-blue-700">Option 01: Unresolved Collision</span>
                <span className="text-slate-400 font-normal">Baseline</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Direct physical conflict between 600x400 supply air duct and 600x900 post-tensioned concrete beam.
              </p>
            </button>

            <button
              onClick={() => setResolutionStrategy('reroute')}
              className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                resolutionStrategy === 'reroute'
                  ? 'bg-[#DCE7F3] border-blue-600 text-slate-900 shadow-sm'
                  : 'bg-[#DFEAF5] border-blue-200 text-slate-700 hover:bg-blue-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-blue-700">Option A: Offset Duct Routing</span>
                <span className="text-blue-600 font-normal">(Recommended)</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Jog duct below beam soffit with 45° elbows. Preserves structural integrity completely without cast-in sleeves.
              </p>
            </button>

            <button
              onClick={() => setResolutionStrategy('sleeve')}
              className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                resolutionStrategy === 'sleeve'
                  ? 'bg-[#DCE7F3] border-blue-600 text-slate-900 shadow-sm'
                  : 'bg-[#DFEAF5] border-blue-200 text-slate-700 hover:bg-blue-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-blue-700">Option B: Engineered Beam Sleeve</span>
                <span className="text-blue-600 font-normal">Requires SE Sign-off</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Locate cylindrical sleeve at neutral stress axis. Requires structural calculation check and extra rebar trim bars.
              </p>
            </button>
          </div>

          <div className="pt-2 text-xs text-slate-500 font-mono flex items-center justify-between">
            <span>Federated in Navisworks Manage</span>
            <span className="text-blue-600 font-bold">BCF 2.1 Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
};
