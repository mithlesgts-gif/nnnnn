import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { leadershipTeam, LeaderProfile } from '../data/leadershipData';
import { BackgroundDesignElements } from './BackgroundDesignElements';
import { ArchitecturalSectionBackground } from './ArchitecturalSectionBackground';
import bgTower from '../assets/images/bg_modern_building_tower_1792162103443.jpg';
import { 
  Building2, 
  Layers, 
  Compass, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  GitBranch,
  UserCheck
} from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Word-by-word heading reveal
  const headingWords = ['The', 'People', 'Behind', 'Our', 'Precision'];

  const renderDisciplineIcon = (type: LeaderProfile['iconType']) => {
    switch (type) {
      case 'compass':
        return <Compass className="w-6 h-6 text-blue-600" />;
      case 'building':
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'layers':
        return <Layers className="w-6 h-6 text-blue-600" />;
      default:
        return <Compass className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section 
      id="leadership" 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-[#E3EDF6] via-[#EDF3FA] to-[#E2ECF7] relative overflow-hidden border-t border-blue-200/80"
    >
      <span id="approach" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      {/* High-Definition Architectural Tower Background (>=70% Visual Prominence) with 1s Scroll Delay */}
      <ArchitecturalSectionBackground 
        image={bgTower}
        theme="light"
        title="Modern Architectural Tower & Executive Governance"
        location="Jamshedpur Corporate Hub"
        elevation="DATUM: +142.000m"
        showGrid={false}
        showScanLine={true}
      />



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header with Word-by-Word Staggered Reveal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFEAF5]/90 border border-blue-300 text-xs font-mono text-blue-700 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Operational &amp; Delivery Leadership</span>
            <span className="text-slate-400" aria-hidden="true">·</span>
            <span className="text-blue-700 font-semibold">Technical Excellence</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`inline-block mr-2 sm:mr-3 ${
                  word === 'Precision' ? 'text-blue-600' : 'text-slate-900'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Animated Blue & Red Accent Line */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scaleX: 0, originX: 0.5 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              className="h-1 w-24 bg-gradient-to-r from-blue-600 via-sky-500 to-red-500 rounded-full"
            />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-base sm:text-lg text-slate-700 leading-relaxed font-body max-w-2xl mx-auto"
          >
            Meet the leadership team guiding our operations, technical coordination, and project delivery at SHILP BIM Solutions Pvt. Ltd.
          </motion.p>
        </div>

        {/* 3 Balanced Leadership Cards (Desktop Horizontal, Mobile Stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {leadershipTeam.map((leader, index) => {
            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.55, delay: 0.2 + index * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group bg-[#E5EEF7]/95 rounded-2xl border border-blue-200/90 hover:border-blue-400 p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 relative overflow-hidden"
              >
                {/* Top Accent Gradient Line with Selective Red Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 ${
                  index === 1 ? 'bg-gradient-to-r from-blue-600 to-red-500' : 'bg-gradient-to-r from-blue-500 to-blue-700'
                } group-hover:h-2`} />

                {/* Subtle Architectural Grid Corner Watermark */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  {/* Top Medallion with Initials & Architectural Illustration (Strictly No Photos) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Initials-based Profile Medallion with Technical Compass / Grid Styling */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-lg tracking-wider border shadow-sm transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100/70 border-blue-200 text-blue-600 group-hover:border-blue-400">
                          {leader.initials}
                        </div>
                        {/* Status / Discipline Mini Dot */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-xs bg-blue-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                          Leadership Profile
                        </span>
                        <div className="text-xs font-mono font-semibold text-slate-700">
                          {leader.discipline}
                        </div>
                      </div>
                    </div>

                    {/* Discipline Icon Box */}
                    <div className="p-2.5 rounded-xl border transition-colors bg-blue-50/80 border-blue-200/80 group-hover:border-blue-300">
                      {renderDisciplineIcon(leader.iconType)}
                    </div>
                  </div>

                  {/* Name and Designation Directly Beneath */}
                  <div className="pt-2 border-t border-slate-100">
                    <h3 className="text-2xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-mono font-bold mt-1 text-blue-600">
                      {leader.designation}
                    </p>
                  </div>

                  {/* Proposed Leadership Profile Description */}
                  <div className="p-4 rounded-xl bg-[#D6E3F0]/90 border border-blue-200/80 relative">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
                      {leader.leadershipMessage}
                    </p>
                  </div>

                  {/* Responsibilities & Technical Governance */}
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      Key Operational Focus
                    </div>
                    <div className="space-y-1.5">
                      {leader.focusAreas.map((focus, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
                          <span>{focus}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Assurance Strip */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 relative z-10">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    SHILP BIM Leadership
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Precision Governance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
