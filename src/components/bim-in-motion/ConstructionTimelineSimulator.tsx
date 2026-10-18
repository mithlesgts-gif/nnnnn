import React, { useState, useEffect, useRef } from 'react';
import { constructionPhases } from '../../data/bimInMotionData';
import { ConstructionPhase } from '../../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Calendar, 
  Activity, 
  Building2,
  HardHat
} from 'lucide-react';

export const ConstructionTimelineSimulator: React.FC = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(2);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const activePhase: ConstructionPhase = constructionPhases[currentPhaseIndex];
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentPhaseIndex((prev) => {
          if (prev >= constructionPhases.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleRestart = () => {
    setCurrentPhaseIndex(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentPhaseIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPhaseIndex((prev) => Math.min(constructionPhases.length - 1, prev + 1));
  };

  return (
    <div className="space-y-8 bg-slate-50/80 p-6 md:p-8 rounded-2xl border border-slate-200/90 relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-grid-light opacity-60 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 uppercase tracking-wider mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Module 04 · Interactive 4D Simulation
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900">
            4D Construction Sequencing &amp; Phasing Simulator
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Watch the building assemble phase-by-phase from excavation through superstructure, envelope, MEP coordination, and digital twin commissioning.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#DFEAF5]/90 px-3.5 py-1.5 rounded-lg border border-blue-200/90 text-slate-700 shadow-xs">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Timeline Horizon: <strong className="text-slate-900">86 Weeks Total</strong></span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Dynamic Building Construction Visualization (Layered Architectural Canvas) */}
        <div className="lg:col-span-7 bg-[#EAF1F8] rounded-2xl border border-blue-200/90 p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[440px] bg-grid-light shadow-md">
          {/* Top HUD */}
          <div className="flex items-center justify-between text-xs font-mono z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-900 font-bold">PHASE 0{activePhase.id} OF 07</span>
              <span className="text-slate-300">·</span>
              <span className="text-blue-600 font-semibold">{activePhase.durationWeeks}</span>
            </div>
            <div className="text-slate-600 font-medium">
              {activePhase.progressPercent}% Target Progress
            </div>
          </div>

          {/* Procedural Building Construction Graphic */}
          <div className="relative flex-1 flex items-center justify-center py-6 select-none">
            <div className="relative w-full max-w-md h-64 flex flex-col items-center justify-end">
              {/* Sky / Grid Background */}
              <div className="absolute inset-0 bg-radial-light opacity-50 pointer-events-none" />

              {/* Tower Crane (Visible in Phases 2, 3) */}
              {activePhase.elementTypesVisible.cranes && (
                <div className="absolute -top-6 right-16 w-32 h-44 z-20 transition-opacity duration-700">
                  <div className="absolute bottom-0 right-10 w-2.5 h-40 bg-amber-500 border border-amber-600" />
                  <div className="absolute top-0 -left-6 w-36 h-2 bg-amber-500 border border-amber-600" />
                  <div className="absolute top-0 right-6 w-12 h-2.5 bg-amber-600" />
                  <div className="absolute top-2 left-6 w-0.5 h-20 bg-slate-500 border-dashed" />
                  <div className="absolute top-22 left-5 w-3 h-2 bg-amber-500 rounded-xs" />
                </div>
              )}

              {/* Roof Penthouse / Commissioning Beacon (Phases 6, 7) */}
              {(currentPhaseIndex >= 5) && (
                <div className="w-48 h-8 bg-slate-200 border-2 border-slate-400 rounded-t flex items-center justify-around px-2 z-10 transition-all duration-500">
                  <div className="w-6 h-4 bg-blue-100 border border-blue-400 rounded-xs" />
                  <div className="w-10 h-5 bg-slate-300 border border-slate-500 rounded-xs" />
                  <div className="w-6 h-4 bg-blue-100 border border-blue-400 rounded-xs" />
                  {currentPhaseIndex === 6 && (
                    <span className="absolute -top-4 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] animate-ping" />
                  )}
                </div>
              )}

              {/* Floors 05 to 01 (Superstructure) */}
              {activePhase.elementTypesVisible.superstructure ? (
                <div className="w-64 space-y-1 z-10 transition-all duration-700">
                  {[5, 4, 3, 2, 1].map((floorNum) => (
                    <div
                      key={floorNum}
                      className={`h-9 rounded-xs border transition-all duration-500 relative flex items-center justify-between px-3 ${
                        activePhase.elementTypesVisible.envelope
                          ? 'bg-blue-50/90 border-blue-400 shadow-sm'
                          : 'bg-slate-100 border-slate-300'
                      }`}
                    >
                      <div className="w-2 h-full bg-slate-400" />
                      <div className="w-2 h-full bg-slate-400" />

                      {/* Central Core */}
                      <div className="w-12 h-full bg-slate-200 border-x border-slate-300 flex items-center justify-center text-[9px] font-mono text-slate-700 font-bold">
                        CORE
                      </div>

                      {/* MEP Overlay inside ceiling void */}
                      {activePhase.elementTypesVisible.mepPipes && (
                        <div className="absolute top-1 left-8 right-8 flex flex-col gap-0.5">
                          <div className="h-1 bg-cyan-500 rounded-full" title="Supply Air Duct" />
                          <div className="h-0.5 bg-blue-600 rounded-full" title="Chilled Water" />
                          <div className="h-0.5 bg-red-600 rounded-full" title="Fire Sprinkler" />
                        </div>
                      )}

                      {/* Interior fitout */}
                      {activePhase.elementTypesVisible.interior && (
                        <div className="absolute inset-x-12 bottom-1 h-3 flex items-center justify-around">
                          <span className="w-3 h-1.5 bg-amber-400 rounded-xs" />
                          <span className="w-4 h-1.5 bg-blue-400 rounded-xs" />
                          <span className="w-3 h-1.5 bg-amber-400 rounded-xs" />
                        </div>
                      )}

                      <div className="w-2 h-full bg-slate-400" />
                      <div className="w-2 h-full bg-slate-400" />

                      <span className="absolute -left-7 text-[10px] font-mono text-slate-500">
                        L0{floorNum}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                /* Excavation / Foundation state */
                <div className="w-64 h-24 border-2 border-dashed border-amber-400 bg-amber-50 rounded-xl flex flex-col items-center justify-center p-3 text-center space-y-1 z-10">
                  <HardHat className="w-6 h-6 text-amber-600 animate-bounce" />
                  <div className="text-xs font-mono font-bold text-amber-900">
                    {activePhase.id === 1 ? 'Bulk Excavation to -9.0m Datum' : 'Deep Piling & Raft Concrete Pouring'}
                  </div>
                  <div className="text-[10px] text-amber-700 font-mono">
                    {activePhase.id === 1 ? 'Secant retaining walls active' : 'Mass foundation concrete placement'}
                  </div>
                </div>
              )}

              {/* Grade Datum */}
              <div className="w-80 h-7 bg-slate-200 border-t-2 border-slate-400 flex items-center justify-between px-4 z-10 mt-1">
                <span className="text-[10px] font-mono text-slate-600 font-semibold">DATUM ±0.000m (GRADE)</span>
                <span className="text-[10px] font-mono text-blue-600 font-bold">SUBSTRUCTURE</span>
              </div>

              {/* Sub-surface */}
              <div className="w-80 h-10 bg-slate-300 border-t border-slate-400 flex items-center justify-around px-4">
                <div className="w-4 h-full bg-slate-400 border-x border-slate-500" />
                <div className="w-16 h-full bg-slate-400/80 border-x border-slate-500 flex items-center justify-center text-[9px] font-mono text-slate-800 font-bold">
                  RAFT -9.0M
                </div>
                <div className="w-4 h-full bg-slate-400 border-x border-slate-500" />
              </div>
            </div>
          </div>

          {/* Bottom Visualizer Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-xs ${activePhase.elementTypesVisible.superstructure ? 'bg-slate-500' : 'bg-slate-300'}`} />
                Structure
              </span>
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-xs ${activePhase.elementTypesVisible.envelope ? 'bg-blue-600' : 'bg-slate-300'}`} />
                Envelope
              </span>
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-xs ${activePhase.elementTypesVisible.mepPipes ? 'bg-cyan-500' : 'bg-slate-300'}`} />
                MEP
              </span>
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-xs ${activePhase.elementTypesVisible.interior ? 'bg-amber-500' : 'bg-slate-300'}`} />
                Fit-out
              </span>
            </div>
            <span>Synchro 4D Simulated</span>
          </div>
        </div>

        {/* Phase Details & Key Activities */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold">
              <span>Phase {activePhase.id} of 7</span>
              <span className="text-slate-300">·</span>
              <span>{activePhase.discipline}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              {activePhase.name}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              {activePhase.description}
            </p>
          </div>

          {/* Key Activities Checklist */}
          <div className="space-y-2 bg-[#DFEAF5]/80 p-4 rounded-xl border border-blue-200/80 shadow-xs">
            <h5 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Milestone Construction Deliverables
            </h5>
            <div className="space-y-2 pt-1">
              {activePhase.keyActivities.map((act: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                <span>{isPlaying ? 'Pause Simulation' : 'Play Full 4D Sequence'}</span>
              </button>

              <button
                onClick={handleRestart}
                className="p-3 rounded-xl bg-[#DFEAF5] border border-blue-200 text-slate-700 hover:bg-blue-100 transition-colors shadow-xs cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrev}
                disabled={currentPhaseIndex === 0}
                className="p-3 rounded-xl bg-[#DFEAF5] border border-blue-200 text-slate-700 hover:bg-blue-100 disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentPhaseIndex === constructionPhases.length - 1}
                className="p-3 rounded-xl bg-[#DFEAF5] border border-blue-200 text-slate-700 hover:bg-blue-100 disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scrub Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>Timeline Scrub</span>
                <span>{activePhase.durationWeeks}</span>
              </div>
              <input
                type="range"
                min="0"
                max={constructionPhases.length - 1}
                value={currentPhaseIndex}
                onChange={(e) => {
                  setCurrentPhaseIndex(Number(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Phase Step Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 border-t border-slate-200">
        {constructionPhases.map((phase, idx) => {
          const isSelected = idx === currentPhaseIndex;
          const isDone = idx < currentPhaseIndex;

          return (
            <button
              key={phase.id}
              onClick={() => {
                setCurrentPhaseIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-[#DCE7F3] border-blue-600 shadow-md shadow-blue-500/10'
                  : isDone
                  ? 'bg-[#E5EEF7] border-blue-200 text-slate-700 hover:bg-[#DCE7F3]'
                  : 'bg-transparent border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={isSelected ? 'text-blue-600 font-bold' : isDone ? 'text-slate-600' : 'text-slate-400'}>
                  0{phase.id}
                </span>
                <span className="text-slate-400">{phase.durationWeeks.split(' ')[0]}</span>
              </div>
              <div className={`text-xs font-semibold truncate mt-1 ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                {phase.name.split('&')[0]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
