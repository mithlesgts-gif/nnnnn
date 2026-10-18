import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ShieldCheck, CheckCircle2, UserCheck, Layers, Building2, Box, Cpu } from 'lucide-react';
import { ArchitecturalSectionBackground } from './ArchitecturalSectionBackground';
import bgJobsite from '../assets/images/bg_modern_jobsite_1792156747851.jpg';
import concreteFormworkSite from '../assets/images/concrete_formwork_crane_site.jpg';
import bimOfficeStudio from '../assets/images/bim_engineering_studio_office_1792317943099.jpg';
import artisanLogo from '../assets/images/shilp_artisan_logo.jpg';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  // Headline words for word-by-word dynamic reveal
  const headlineWords = [
    'Architectural', 'Precision.', 'Modern', 'Engineering', 'to', 'Digital', 'Twins.'
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden border-t border-blue-200/80 scroll-mt-20 bg-gradient-to-b from-[#EBF2F9] via-[#F3F8FC] to-[#E9F1F8]"
    >
      {/* 
        Authentic Concrete Formwork, Tower Cranes & Construction Jobsite Background
        with Smooth Reveal & Ken Burns Panning (No Grids)
      */}
      <ArchitecturalSectionBackground
        image={concreteFormworkSite}
        theme="light"
        title="Reinforced Concrete Structure & Site Logistics"
        location="Jamshedpur / Global Delivery"
        elevation="DATUM: +14.200m"
        showGrid={false}
        showScanLine={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Positioning with Left Slide-In Entrance Animation */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header Badge */}
            <motion.div 
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#DFEAF5]/90 backdrop-blur-md border border-blue-300/80 text-xs font-mono text-[#165DFF] shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#165DFF] animate-pulse" />
              <span className="font-bold">About SHILP BIM Solutions Pvt. Ltd.</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-700 font-medium">Jamshedpur, India</span>
            </motion.div>

            {/* Word-by-word Heading Reveal */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#0B1530] tracking-tight leading-tight">
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                    className={`inline-block mr-2 sm:mr-3 ${
                      word === 'Engineering' || word === 'Digital' || word === 'Twins.' 
                        ? 'text-[#165DFF]' 
                        : 'text-[#0B1530]'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>

              {/* Animated Accent Line */}
              <motion.div
                initial={shouldReduceMotion ? {} : { scaleX: 0, originX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.75, delay: 0.6, ease: 'easeOut' }}
                className="h-1 w-28 bg-gradient-to-r from-[#165DFF] via-[#2878FF] to-blue-400 rounded-full"
              />
            </div>

            {/* Staggered Article Sequences */}
            <motion.div 
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="space-y-4 text-slate-700 font-body leading-relaxed text-base"
            >
              <p>
                <strong>SHILP BIM Solutions Pvt. Ltd.</strong> is a premier Building Information Modeling (BIM) and AEC technology consultancy headquartered in Jamshedpur, India, delivering high-precision engineering services to international architectural practices, engineering consultants, and general contractors.
              </p>
              <p>
                Our multidisciplinary engineering teams leverage cutting-edge digital construction technologies, Autodesk Revit parametric authoring, Tekla structural detailing, and Navisworks multi-trade clash federation to bridge design intent with constructability.
              </p>
              <p>
                Operating across the complete project lifecycle from <strong>LOD 100 conceptual planning to LOD 500 verified as-built digital twins</strong>, we safeguard project budgets, eliminate costly field rework, and ensure flawless construction release.
              </p>
            </motion.div>

            {/* Core Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <motion.div 
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="p-5 rounded-2xl bg-[#E2EDF7]/95 backdrop-blur-md border border-blue-200/90 space-y-1.5 shadow-sm hover:border-[#165DFF] hover:shadow-md transition-all"
              >
                <div className="text-sm font-bold text-[#0B1530] font-display flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#165DFF]" />
                  <span>One Dedicated Manager</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A single point of direct contact and governance overseeing your project from initial model audit to final drawing issue.
                </p>
              </motion.div>

              <motion.div 
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.95 }}
                className="p-5 rounded-2xl bg-[#E2EDF7]/95 backdrop-blur-md border border-blue-200/90 space-y-1.5 shadow-sm hover:border-[#165DFF] hover:shadow-md transition-all"
              >
                <div className="text-sm font-bold text-[#0B1530] font-display flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#165DFF]" />
                  <span>ISO 19650 Standards</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Disciplined Common Data Environment workflows, strict parameter naming conventions, and verified audit trails.
                </p>
              </motion.div>
            </div>

            {/* Quality Checklist */}
            <motion.div 
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#0B1530]"
            >
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#165DFF]" />
                Coordinated Architecture, Structure &amp; MEP
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#165DFF]" />
                Structured Single-Point Governance
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#165DFF]" />
                Zero Field Collision Delivery
              </span>
            </motion.div>
          </div>

          {/* Right Visual Architectural & Digital Twin Showcase */}
          <motion.div 
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 36 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative space-y-6"
          >
            {/* Primary Corporate Brand Showcase Card with Cool Blue Tint */}
            <div className="relative rounded-3xl overflow-hidden border border-blue-200/90 shadow-2xl bg-[#E6EFF8]/95 backdrop-blur-md p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#165DFF] shadow-lg shrink-0">
                  <img
                    src={artisanLogo}
                    alt="SHILP BIM Solutions Pvt. Ltd. Corporate Brand Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#165DFF] uppercase tracking-wider">
                    Corporate Identity &amp; Standards
                  </div>
                  <h3 className="text-lg font-bold font-display text-[#0B1530]">
                    SHILP BIM Solutions Pvt. Ltd.
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    Engineering precision with modern BIM digital twins
                  </div>
                </div>
              </div>

              {/* Authentic BIM Engineering Office & Workstations Photo */}
              <div className="relative rounded-2xl overflow-hidden h-56 bg-slate-900 border border-blue-200 group">
                <img
                  src={bimOfficeStudio}
                  alt="BIM Engineers collaborating at multi-monitor workstations reviewing 3D Revit models and blueprints"
                  className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1530] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Engineering Studio &amp; Workstations
                  </span>
                  <span className="text-blue-300 font-bold">LOD 400/500</span>
                </div>
              </div>

              {/* Verification Callout */}
              <div className="p-4 rounded-xl bg-[#D6E4F2] border border-blue-300/80 text-xs font-mono text-[#0B1530] flex items-center justify-between">
                <div>
                  <div className="font-bold">GLOBAL DELIVERY ENGINE</div>
                  <div className="text-[11px] text-slate-600 font-body">Headquartered in Jamshedpur, India</div>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#165DFF] text-white font-bold text-[10px]">
                  VERIFIED
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
