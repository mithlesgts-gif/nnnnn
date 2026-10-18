import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Boxes, 
  Layers, 
  GitBranch, 
  UserCheck, 
  ArrowRight, 
  ArrowUpRight, 
  Briefcase, 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Users, 
  Cpu
} from 'lucide-react';
import { sampleCareerRoles } from '../data/careersData';
import { CareerRole } from '../types';
import { CareerApplicationModal } from './CareerApplicationModal';
import { useReducedMotion } from 'motion/react';
import { ArchitecturalSectionBackground } from './ArchitecturalSectionBackground';
import bgJobsite from '../assets/images/bg_modern_jobsite_1792156747851.jpg';

interface CareersSectionProps {
  onOpenApplication?: (roleTitle?: string) => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({ onOpenApplication }) => {
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [modalRoleTitle, setModalRoleTitle] = useState<string>('');
  const shouldReduceMotion = useReducedMotion();

  const disciplines = ['All', 'Architecture', 'Structure', 'MEP', 'Coordination', 'Project Management'];

  const filteredRoles = activeCategoryFilter === 'All' 
    ? sampleCareerRoles 
    : sampleCareerRoles.filter(r => r.discipline === activeCategoryFilter);

  const handleApply = (roleTitle?: string) => {
    if (onOpenApplication) {
      onOpenApplication(roleTitle);
    } else {
      setModalRoleTitle(roleTitle || '');
      setIsAppModalOpen(true);
    }
  };

  const getDisciplineIcon = (discipline: CareerRole['discipline']) => {
    switch (discipline) {
      case 'Architecture':
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'Structure':
        return <Boxes className="w-5 h-5 text-blue-600" />;
      case 'MEP':
        return <Layers className="w-5 h-5 text-blue-600" />;
      case 'Coordination':
        return <GitBranch className="w-5 h-5 text-blue-600" />;
      case 'Project Management':
        return <UserCheck className="w-5 h-5 text-blue-600" />;
      default:
        return <Briefcase className="w-5 h-5 text-blue-600" />;
    }
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' as const }
    }
  };

  return (
    <section 
      id="careers" 
      className="py-24 bg-gradient-to-b from-white via-[#EAF2FF]/30 to-white relative overflow-hidden border-t border-slate-100 scroll-mt-20"
    >
      {/* High-Definition Architectural Building Background (>=70% Prominence) with 1s Scroll Delay */}
      <ArchitecturalSectionBackground 
        image={bgJobsite}
        theme="light"
        title="BIM Engineering Studio & Talent Hub"
        location="Jamshedpur Engineering Center"
        elevation="DATUM: +12.000m"
        showGrid={false}
        showScanLine={true}
      />



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header with Scroll-Triggered Reveal */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Careers at SHILP BIM</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-red-600 font-semibold">Join Our Engineering Team</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight"
          >
            Build Your Future <span className="text-blue-600">with SHILP BIM</span>
          </motion.h2>

          {/* Animated Blue & Red Accent Line */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scaleX: 0, originX: 0.5 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 w-24 bg-gradient-to-r from-blue-600 via-sky-500 to-red-500 rounded-full"
            />
          </div>

          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg text-slate-700 font-body leading-relaxed max-w-3xl mx-auto pt-2"
          >
            "Be part of a team shaping the future of Building Information Modeling. At SHILP BIM Solutions Pvt. Ltd., we value technical expertise, collaboration, creativity, and continuous learning. Explore opportunities to contribute to meaningful BIM and digital construction projects."
          </motion.blockquote>

          {/* Action Row: Explore Open Positions & Direct Apply */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-3"
          >
            <a
              href="#open-roles-grid"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Open Positions</span>
            </a>

            <button
              onClick={() => handleApply()}
              className="px-6 py-3 rounded-xl bg-[#DFEAF5] hover:bg-[#D2E2F0] border border-blue-300 hover:border-red-400 text-slate-800 font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 text-red-500" />
            </button>
          </motion.div>
        </div>

        {/* Culture & Working at SHILP BIM Pillars */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="p-6 rounded-2xl bg-[#E5EEF7]/95 border border-blue-200/90 shadow-sm space-y-3 hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#DFEAF5] text-blue-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-display text-slate-900 text-sm">
              Technical Expertise
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Work with advanced BIM authoring and coordination platforms across LOD 100 to LOD 500 digital twin projects.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#E5EEF7]/95 border border-blue-200/90 shadow-sm space-y-3 hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#DFEAF5] text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-display text-slate-900 text-sm">
              Cross-Trade Collaboration
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Integrate with multidisciplinary engineering teams, general contractors, and architects on complex built assets.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#E5EEF7]/95 border border-blue-200/90 shadow-sm space-y-3 hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#DFEAF5] text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-display text-slate-900 text-sm">
              Continuous Learning
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Regular technical mentoring in ISO 19650 protocols, parametric family authoring, and computational BIM automation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#E5EEF7]/95 border border-blue-200/90 shadow-sm space-y-3 hover:border-blue-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-red-100/70 text-red-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold font-display text-slate-900 text-sm">
              Quality &amp; Precision
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A disciplined engineering environment where zero collision and fabrication accuracy are the foundational benchmarks.
            </p>
          </div>
        </motion.div>

        {/* Roles Section Anchor & Category Filter Bar */}
        <div id="open-roles-grid" className="space-y-6 pt-4 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-200/80 pb-4">
            <div>
              <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                Explore Sample Role Categories
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900">
                Core BIM Career Disciplines
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap p-1 bg-[#DFEAF5] border border-blue-200/90 rounded-xl">
              {disciplines.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveCategoryFilter(d)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeCategoryFilter === d
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-[#D5E4F2]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Sample Role Notice: Explicit transparent note */}
          <div className="p-4 rounded-xl bg-[#DFEAF5] border border-blue-200/80 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>
                These career cards represent our ongoing multidisciplinary discipline tracks. Recruitment inquiries are evaluated actively based on project schedules.
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 shrink-0">
              Jamshedpur Engineering Center &amp; Global Accounts
            </span>
          </div>

          {/* 5 Attractive Career Cards with Staggered Scroll-Triggered Reveal */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredRoles.map((role, idx) => (
              <motion.div
                key={role.id}
                variants={cardVariants}
                className="group bg-[#E5EEF7]/95 backdrop-blur-md rounded-2xl border border-blue-200/90 hover:border-blue-500 p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 relative overflow-hidden"
              >
                {/* Top Accent Line with Blue & Red variation */}
                <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
                  idx === 1 || idx === 3 ? 'bg-gradient-to-r from-blue-600 to-red-500' : 'bg-blue-600'
                }`} />

                <div className="space-y-6">
                  {/* Top Bar with Icon, Title, and Discipline */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                        <span className="font-semibold text-blue-600">{role.department}</span>
                        <span aria-hidden="true">·</span>
                        <span>{role.discipline}</span>
                      </div>
                      <h4 className="text-xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                        {role.title}
                      </h4>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/70 text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
                      {getDisciplineIcon(role.discipline)}
                    </div>
                  </div>

                  {/* Scope Overview */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {role.scopeOverview}
                  </p>

                  {/* Software Stack */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      Primary Software Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {role.primarySoftware.map((soft) => (
                        <span 
                          key={soft}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-mono text-slate-700 border border-slate-200"
                        >
                          {soft}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Competencies */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      Core Functional Competencies
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {role.keyCompetencies.map((comp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Apply CTA and Sample Tag */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-slate-500">
                    <span>Sample Role Category</span>
                    <span className="mx-1.5 text-slate-300">·</span>
                    <span className="text-blue-700 font-semibold">Active Talent Pool</span>
                  </div>

                  <button
                    onClick={() => handleApply(role.title)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-blue-500/10 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact Option for Candidates to Share Resumes Directly */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white relative overflow-hidden border border-slate-800 shadow-xl"
        >
          {/* Subtle Blueprint Grid Accent */}
          <div className="absolute inset-0 bg-grid-light opacity-10 pointer-events-none" />

          {/* Accent red geometric triangle in corner */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-blue-500/30 text-xs font-mono text-blue-400">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Share Your Resume &amp; Portfolio Directly</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Don't See Your Exact Discipline Listed?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                We are always eager to connect with forward-thinking BIM modelers, scan-to-BIM specialists, MEP engineers, and computational designers. Share your CV and portfolio with our technical team in Jamshedpur.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-slate-300">
                <a 
                  href="tel:+919373381310" 
                  className="flex items-center gap-2 text-white hover:text-blue-400 font-bold transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call: +91 9373381310</span>
                </a>
                <span className="text-slate-600" aria-hidden="true">|</span>
                <a 
                  href="mailto:info@shilpbimsolutions.com" 
                  className="flex items-center gap-2 text-white hover:text-blue-400 font-bold transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Email: info@shilpbimsolutions.com</span>
                </a>
                <span className="text-slate-600" aria-hidden="true">|</span>
                <span className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>Headquartered in Jamshedpur, India</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => handleApply('Direct Resume Submission')}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Your Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+919373381310"
                className="w-full py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Speak to Recruitment</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Career Application Modal */}
      <CareerApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        selectedRoleTitle={modalRoleTitle}
      />
    </section>
  );
};
