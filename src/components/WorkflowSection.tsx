import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Search, Compass, Box, Layers, Send, CheckCircle2 } from 'lucide-react';
import { DynamicBuildingVideoBackground } from './DynamicBuildingVideoBackground';
import { ArchitecturalDrawingMotion } from './ArchitecturalDrawingMotion';

export const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3);
  const shouldReduceMotion = useReducedMotion();

  const workflowWords = ['Our', 'Five-Stage', 'BIM', 'Delivery', 'Process'];

  const workflowSteps = [
    {
      step: 1,
      title: 'Understand',
      subtitle: 'Drawings, Specs & Requirements Review',
      description: 'We audit all incoming architectural, structural, and civil inputs, verifying 2D drawing revisions, local municipal building codes, project benchmarks, and design specifications.',
      deliverables: ['Design discrepancy log', 'Benchmark survey verification', 'File structure audit', 'Scope demarcations'],
      icon: <Search className="w-5 h-5" />
    },
    {
      step: 2,
      title: 'Plan',
      subtitle: 'BIM Standards & Execution Protocol',
      description: 'Establish project-specific BIM Execution Plans (BEP), shared coordinate systems, model element breakdown, Level of Development (LOD) matrices, and delivery milestones.',
      deliverables: ['BIM Execution Plan (BEP)', 'Shared parameter templates', 'Common Data Environment (CDE) setup', 'Clash tolerance matrix'],
      icon: <Compass className="w-5 h-5" />
    },
    {
      step: 3,
      title: 'Model',
      subtitle: 'Disciplinary Model Development',
      description: 'Develop intelligent, parametric 3D models for Architecture, Structure, and MEP systems strictly aligned with agreed Level of Development (LOD 200–400) and manufacturer specifications.',
      deliverables: ['Parametric Revit (.RVT) models', 'Rebar and connection detailing', 'Parametric family libraries (.RFA)', 'Automated schedules'],
      icon: <Box className="w-5 h-5" />
    },
    {
      step: 4,
      title: 'Coordinate',
      subtitle: 'Clash Detection & Multi-Trade Resolution',
      description: 'Federate all disciplinary models in Navisworks Manage. Run automated clash matrices, eliminate false positives, host virtual coordination meetings, and engineer practical reroute solutions.',
      deliverables: ['Navisworks (.NWD) federated models', 'BCF clash coordination logs', 'Combined Services Drawings (CSD)', 'Builders Work in Connection (BWIC)'],
      icon: <Layers className="w-5 h-5" />
    },
    {
      step: 5,
      title: 'Deliver',
      subtitle: 'Approved Models, Drawings & Handover',
      description: 'Extract 100% synchronized 2D shop drawings, fabrication spool cut-lists, quantity take-off spreadsheets, and LOD 500 digital twin models populated with COBie asset metadata.',
      deliverables: ['Approved Shop Drawing sets (PDF/DWG)', 'Bill of Quantities (BOQ)', 'LOD 500 As-Built Model', 'COBie asset register'],
      icon: <Send className="w-5 h-5" />
    }
  ];

  return (
    <section 
      id="workflow" 
      className="py-24 relative overflow-hidden border-t border-blue-200/80 scroll-mt-20 bg-gradient-to-b from-[#E7EFF7] via-[#EFF5FA] to-[#E5EEF7]"
    >
      {/* Dynamic Moving Building Video Background (Structural Rise Simulation) */}
      <DynamicBuildingVideoBackground
        initialVideoId="structural-rise"
        overlayTheme="cool-blue"
        opacity={0.32}
        showControls={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header with Scroll-Triggered Reveal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -12 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFEAF5]/90 backdrop-blur-md border border-blue-300 text-xs font-mono text-blue-700 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Structured Engineering Protocol</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
            {workflowWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: 0.08 * i }}
                className={`inline-block mr-2 sm:mr-3 ${
                  word === 'Delivery' || word === 'Process' ? 'text-blue-600' : 'text-slate-900'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Accent Line */}
          <div className="flex justify-center">
            <motion.div
              initial={shouldReduceMotion ? {} : { scaleX: 0, originX: 0.5 }}
              whileInView={shouldReduceMotion ? {} : { scaleX: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              className="h-1 w-24 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 rounded-full"
            />
          </div>

          <motion.p 
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-base sm:text-lg text-slate-600 font-body leading-relaxed"
          >
            A methodical, transparent engineering pipeline that ensures accurate models, timely milestones, and zero on-site clashes.
          </motion.p>
        </div>

        {/* Horizontal Process Steps Bar with Staggered Scroll Reveal */}
        <motion.div 
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {workflowSteps.map((ws) => {
            const isCurrent = ws.step === activeStep;
            return (
              <button
                key={ws.step}
                onClick={() => setActiveStep(ws.step)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer ${
                  isCurrent
                    ? 'bg-[#DDE9F6] border-blue-600 shadow-xl shadow-blue-500/10 scale-102 ring-2 ring-blue-500/20'
                    : 'bg-[#E5EEF7]/95 backdrop-blur-md border-blue-200/90 hover:border-blue-400 text-slate-700 hover:text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-blue-700' : 'text-slate-500'}`}>
                    STEP 0{ws.step}
                  </span>
                  <div className={`p-2 rounded-lg ${isCurrent ? 'bg-blue-600 text-white shadow-xs' : 'bg-[#DFEAF5] text-slate-700'}`}>
                    {ws.icon}
                  </div>
                </div>

                <div className="pt-4 space-y-1">
                  <h3 className={`text-lg font-bold font-display ${isCurrent ? 'text-blue-900' : 'text-slate-900'}`}>
                    {ws.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {ws.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Active Stage Deep-Dive Card with Intentional ~1-Second Scroll Delay */}
        {(() => {
          const currentWs = workflowSteps.find(w => w.step === activeStep) || workflowSteps[2];
          return (
            <motion.div 
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, delay: 0.95, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="p-8 rounded-2xl bg-[#E5EEF7]/95 backdrop-blur-md border border-blue-200/90 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl shadow-blue-600/5"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold">
                  <span>DELIVERY PIPELINE STAGE 0{currentWs.step}</span>
                  <span className="text-slate-300">·</span>
                  <span>{currentWs.subtitle}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                  {currentWs.title}: {currentWs.subtitle}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-body">
                  {currentWs.description}
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#DFEAF5] p-6 rounded-xl border border-blue-200/80 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-800 font-bold">
                  Standard Milestone Deliverables
                </div>
                <div className="space-y-2">
                  {currentWs.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Interactive Architectural Drawing Motion Suite */}
        <div className="pt-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
              Drawing &amp; Kinematic Geometry Engine
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Architectural Drawings &amp; BIM Models in Motion
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-body">
              Watch floor plans draw line-by-line, structural steel grids trace level-by-level, and coordinated MEP services unfold in layered synchronization.
            </p>
          </div>
          <ArchitecturalDrawingMotion />
        </div>
      </div>
    </section>
  );
};
