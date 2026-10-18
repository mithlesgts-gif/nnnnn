import React, { useState } from 'react';
import { motion } from 'motion/react';
import { bimServices } from '../data/servicesData';
import { BimService } from '../types';
import { 
  Building2, 
  Boxes, 
  Layers, 
  AlertTriangle, 
  FileText, 
  ScanLine, 
  ClipboardCheck, 
  Clock, 
  Calculator, 
  PenTool, 
  CheckCircle2, 
  Component, 
  ArrowRight, 
  ArrowUpRight 
} from 'lucide-react';
import { ArchitecturalSectionBackground } from './ArchitecturalSectionBackground';
import bgTower from '../assets/images/bg_modern_building_tower_1792162103443.jpg';

interface ServicesSectionProps {
  onSelectService: (service: BimService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [showAllServices, setShowAllServices] = useState<boolean>(false);

  const displayedServices = showAllServices ? bimServices : bimServices.slice(0, 6);

  const headingWords = ['BIM', 'Services', '&', 'Specialized', 'Engineering', 'Capabilities'];

  const renderServiceIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'Boxes': return <Boxes className="w-6 h-6 text-blue-600" />;
      case 'Layers': return <Layers className="w-6 h-6 text-blue-600" />;
      case 'AlertTriangle': return <AlertTriangle className="w-6 h-6 text-blue-600" />;
      case 'FileText': return <FileText className="w-6 h-6 text-blue-600" />;
      case 'ScanLine': return <ScanLine className="w-6 h-6 text-blue-600" />;
      case 'ClipboardCheck': return <ClipboardCheck className="w-6 h-6 text-blue-600" />;
      case 'Clock': return <Clock className="w-6 h-6 text-blue-600" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-blue-600" />;
      case 'PenTool': return <PenTool className="w-6 h-6 text-blue-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-blue-600" />;
      case 'Component': return <Component className="w-6 h-6 text-blue-600" />;
      default: return <Building2 className="w-6 h-6 text-blue-600" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-[#E2ECF7] via-[#EDF3FA] to-[#E3EDF6] relative overflow-hidden border-t border-blue-200/80 scroll-mt-20">
      {/* High-Definition Architectural Skyscraper Background (>=70% Visual Prominence) with 1s Scroll Delay */}
      <ArchitecturalSectionBackground 
        image={bgTower}
        theme="light"
        title="Aerodynamic High-Rise Geometric Tower"
        location="Global Delivery / Jamshedpur"
        elevation="DATUM: +142.000m"
        showGrid={false}
        showScanLine={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header with Scroll-Triggered Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFEAF5]/90 backdrop-blur-md border border-blue-300 text-xs font-mono text-blue-700 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Full Disciplinary Capabilities</span>
              <span className="text-slate-400">·</span>
              <span className="text-blue-700 font-semibold">LOD 100 to 500</span>
            </motion.div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
                {headingWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.45, delay: 0.08 * i }}
                    className={`inline-block mr-2 sm:mr-3 ${
                      word === 'Capabilities' || word === 'Engineering' ? 'text-blue-600' : 'text-slate-900'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>

              {/* Animated Blue & Red Accent Line */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                className="h-1 w-28 bg-gradient-to-r from-blue-600 via-sky-500 to-red-500 rounded-full"
              />
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-slate-700 font-body leading-relaxed"
            >
              From architectural massing models to structural steel &amp; rebar detailing, clash-free MEP coordination, and 4D/5D digital twin delivery.
            </motion.p>
          </div>

          {/* Toggle All 12 Services */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="px-4 py-2.5 rounded-xl bg-[#DFEAF5] hover:bg-blue-100 border border-blue-300 text-xs font-mono text-blue-700 font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>{showAllServices ? 'Show Top 6 Services' : 'View All 12 Capabilities'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

        {/* Services Grid with Staggered Scroll-Triggered Reveal */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {displayedServices.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              onClick={() => onSelectService(service)}
              className="group bg-[#E5EEF7]/95 backdrop-blur-md rounded-2xl border border-blue-200/90 hover:border-blue-500 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer relative overflow-hidden"
            >
              {/* Subtle hover accent corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Icon & LOD Tagline */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/60 group-hover:border-blue-300 transition-colors">
                    {renderServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 font-medium">
                    {service.lodLevels[0]}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                  {service.shortDesc}
                </p>

                {/* Key Scope Preview */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {service.scope.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                <span>View Full Scope &amp; Deliverables</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
