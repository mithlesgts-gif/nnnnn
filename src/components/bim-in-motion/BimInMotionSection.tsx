import React, { useState } from 'react';
import { BimProcessGallery } from './BimProcessGallery';
import { QaQcWorkflowTimeline } from './QaQcWorkflowTimeline';
import { ConstructionTimelineSimulator } from './ConstructionTimelineSimulator';
import { Activity, ShieldCheck, Compass, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { DynamicBuildingVideoBackground } from '../DynamicBuildingVideoBackground';

export const BimInMotionSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'gallery' | 'qaqc' | 'timeline'>('all');
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="bim-in-motion" className="py-24 bg-gradient-to-b from-[#E2ECF7] via-[#EDF3FA] to-[#E3EDF6] relative overflow-hidden border-t border-blue-200/80 scroll-mt-20">
      {/* Dynamic Moving Building Construction Video Background */}
      <DynamicBuildingVideoBackground
        initialVideoId="curtain-wall"
        overlayTheme="cool-blue"
        opacity={0.25}
        showControls={false}
      />

      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-sky-400/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Master Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFEAF5]/90 border border-blue-300 text-xs font-mono text-blue-700 shadow-xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Interactive Engineering Suite</span>
            <span className="text-slate-400">·</span>
            <span className="text-blue-700 font-semibold">LOD 100 → LOD 500</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
            BIM in Motion — <span className="text-blue-600">From Model</span> to <span className="text-blue-700">Construction</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-body">
            Explore how coordinated digital models, engineering validation and construction sequencing connect design intent with informed construction delivery.
          </p>

          {/* Quick jump tabs */}
          <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
            <button
              onClick={() => setActiveSubTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeSubTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'bg-[#DFEAF5] text-slate-700 hover:text-slate-900 border border-blue-200 hover:bg-[#D5E4F2]'
              }`}
            >
              All Modules
            </button>
            <button
              onClick={() => setActiveSubTab('gallery')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeSubTab === 'gallery'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'bg-[#DFEAF5] text-slate-700 hover:text-slate-900 border border-blue-200 hover:bg-[#D5E4F2]'
              }`}
            >
              1. Process Gallery
            </button>
            <button
              onClick={() => setActiveSubTab('qaqc')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeSubTab === 'qaqc'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'bg-[#DFEAF5] text-slate-700 hover:text-slate-900 border border-blue-200 hover:bg-[#D5E4F2]'
              }`}
            >
              2. QA/QC Workflow
            </button>
            <button
              onClick={() => setActiveSubTab('timeline')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeSubTab === 'timeline'
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'bg-[#DFEAF5] text-slate-700 hover:text-slate-900 border border-blue-200 hover:bg-[#D5E4F2]'
              }`}
            >
              3. Interactive Phasing Timeline
            </button>
          </div>
        </div>

        {/* 1. BIM Process Gallery */}
        {(activeSubTab === 'all' || activeSubTab === 'gallery') && (
          <div className="pt-4">
            <BimProcessGallery />
          </div>
        )}

        {/* 2. QA/QC Workflow Timeline */}
        {(activeSubTab === 'all' || activeSubTab === 'qaqc') && (
          <div className="pt-6">
            <QaQcWorkflowTimeline />
          </div>
        )}

        {/* 3. Interactive Construction Timeline Simulator */}
        {(activeSubTab === 'all' || activeSubTab === 'timeline') && (
          <div className="pt-6">
            <ConstructionTimelineSimulator />
          </div>
        )}

        {/* Bottom CTA Strip */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white border border-blue-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold font-display text-white">
              Ready to implement BIM in motion on your active project?
            </h4>
            <p className="text-sm text-blue-200">
              Consult with our dedicated Project Managers for tailored LOD matrices and delivery timelines.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30"
            >
              <span>Discuss Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 font-medium text-sm transition-all"
            >
              Explore All Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
