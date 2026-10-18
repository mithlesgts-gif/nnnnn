import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { projectCaseStudies } from '../data/projectsData';
import { ProjectCaseStudy } from '../types';
import { ArrowRight, Eye, Building2, MapPin } from 'lucide-react';
import { ArchitecturalSectionBackground } from './ArchitecturalSectionBackground';
import structuralSteelImg from '../assets/images/structural_steel_tower_erection.jpg';

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', 'Architecture', 'Structure', 'MEP', 'BIM Coordination', 'Shop Drawings', 'Scan-to-BIM'];

  const filteredProjects = activeCategory === 'All'
    ? projectCaseStudies
    : projectCaseStudies.filter(p => p.category === activeCategory);

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
    <section id="projects" className="py-24 bg-gradient-to-b from-[#E2ECF7] via-[#EDF3FA] to-[#E3EDF6] relative overflow-hidden border-t border-blue-200/80 scroll-mt-20">
      {/* High-Definition Structural Steelwork & Crane Background (>=70% Visual Prominence) with 1s Scroll Delay */}
      <ArchitecturalSectionBackground 
        image={structuralSteelImg}
        theme="light"
        title="Structural Steel Erection & Crane Logistics"
        location="International Typologies / Jamshedpur"
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFEAF5]/90 border border-blue-300 text-xs font-mono text-blue-700 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Demonstrated Project Capabilities</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="space-y-3"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
                BIM Capabilities &amp; Disciplinary Case Studies
              </h2>

              {/* Animated Blue & Red Accent Line */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                className="h-1 w-24 bg-gradient-to-r from-blue-600 via-sky-500 to-red-500 rounded-full"
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-slate-700 font-body leading-relaxed"
            >
              Explore our multidisciplinary BIM delivery across commercial, infrastructure, healthcare, and digital twin conversion typologies.
            </motion.p>
          </div>

          {/* Category Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-1.5 flex-wrap p-1.5 bg-[#DFEAF5] border border-blue-300/80 rounded-xl"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-blue-200/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid with Staggered Scroll-Triggered Reveal */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onClick={() => onSelectProject(project)}
              className="group bg-[#E5EEF7]/95 backdrop-blur-md rounded-2xl border border-blue-200/90 hover:border-blue-500 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              {/* Project Image */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Inline Category Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-mono text-white bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded border border-white/20">
                  <span>{project.category}</span>
                  <span className="text-blue-400">·</span>
                  <span className="text-blue-300 font-semibold">{project.lod}</span>
                </div>

                {/* View Case Study Trigger Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-mono text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 group-hover:bg-blue-600 transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-slate-500">
                    {project.clientSector} · {project.area}
                  </div>
                  <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Scope Highlights */}
                <div className="pt-3 border-t border-slate-100 space-y-1">
                  <div className="text-[11px] font-mono text-slate-500">Key Outcome:</div>
                  <div className="text-xs text-slate-700 line-clamp-1 font-medium">
                    {project.results[0]}
                  </div>
                </div>

                {/* Action Link */}
                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Explore Technical Case Study</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
