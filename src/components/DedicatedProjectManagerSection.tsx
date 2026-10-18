import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  UserCheck, 
  MessageSquare, 
  GitBranch, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import type { Variants } from 'motion/react';

import { DynamicBuildingVideoBackground } from './DynamicBuildingVideoBackground';

interface DedicatedProjectManagerSectionProps {
  onOpenBooking?: (service?: string) => void;
}

export const DedicatedProjectManagerSection: React.FC<DedicatedProjectManagerSectionProps> = ({ onOpenBooking }) => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const pmWords = ['One', 'Project.', 'One', 'Dedicated', 'Project', 'Manager.'];

  const pillars = [
    {
      id: 0,
      title: 'Single Point of Contact',
      subtitle: 'One Dedicated Lead',
      description: 'One dedicated manager for all project-related communication. No phone tag or fragmented email chains — your assigned Project Manager knows your scope, BEP standards, and milestone priorities inside and out.',
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      tag: 'Direct Accountability'
    },
    {
      id: 1,
      title: 'Clear Communication',
      subtitle: 'Organized & Responsive',
      description: 'Organized updates, coordination meetings, and timely responses. Daily or weekly communication protocols tailored to your team\'s workflow and international time zones.',
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      tag: 'Structured Protocol'
    },
    {
      id: 2,
      title: 'Project Coordination',
      subtitle: 'Interdisciplinary Alignment',
      description: 'Structured communication between relevant modeling teams, engineering consultants, and trade stakeholders to keep all disciplines synchronized in the common coordinate system.',
      icon: <GitBranch className="w-6 h-6 text-blue-600" />,
      tag: 'Multi-Trade Federation'
    },
    {
      id: 3,
      title: 'Progress Tracking',
      subtitle: 'Milestone Transparency',
      description: 'Visibility into milestones, deliverables, model freezing schedules, and project status via live cloud dashboards and shared issue logs.',
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      tag: 'Real-Time Visibility'
    },
    {
      id: 4,
      title: 'Quality and Delivery',
      subtitle: 'Rigorous Verification',
      description: 'Coordinated reviews and a disciplined delivery process. Every model, shop drawing, and schedule undergoes internal multi-stage audit before submission.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      tag: 'Zero-Collision Audit'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' }
    }
  };

  return (
    <section 
      id="project-management" 
      className="py-24 relative overflow-hidden border-t border-blue-200/80 scroll-mt-20 bg-gradient-to-b from-[#E3EDF6] via-[#EDF3FA] to-[#E2ECF7]"
    >
      {/* Dynamic Moving Building Video Background (Tower Crane Logistics) */}
      <DynamicBuildingVideoBackground 
        initialVideoId="crane-logistics"
        overlayTheme="cool-blue"
        opacity={0.32}
        showControls={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header Block with Scroll-Triggered Reveal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -12 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFEAF5]/90 backdrop-blur-md border border-blue-300 text-xs font-mono text-blue-700 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Client Communication &amp; Governance</span>
            <span className="text-slate-400">·</span>
            <span className="text-blue-700 font-semibold">1:1 Dedication</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            {pmWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: 0.08 * i }}
                className={`inline-block mr-2 sm:mr-3 ${
                  word === 'Dedicated' || word === 'Project' || word === 'Manager.' ? 'text-blue-600' : 'text-slate-900'
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
            className="text-base sm:text-lg text-slate-700 leading-relaxed font-body max-w-2xl mx-auto"
          >
            Every project is assigned one dedicated Project Manager who serves as your single point of contact throughout the engagement. From initial coordination and progress updates to issue resolution and final delivery, your Project Manager keeps communication clear, organized, and consistent.
          </motion.p>
        </div>

        {/* 5 Benefits Grid: 3 on top, 2 on bottom + 1 highlight with Staggered Scroll Reveal */}
        <motion.div 
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {pillars.map((item) => {
            const isHovered = activeCard === item.id;
            return (
              <motion.div
                key={item.id}
                variants={shouldReduceMotion ? undefined : cardVariants}
                onMouseEnter={() => setActiveCard(item.id)}
                className={`group bg-[#E5EEF7]/95 rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isHovered 
                    ? 'border-blue-400 shadow-xl shadow-blue-500/10 -translate-y-1.5' 
                    : 'border-blue-200/80 hover:border-blue-300 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Top accent gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl border bg-blue-50 border-blue-200 text-blue-600 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-500 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-blue-600 font-semibold block mb-0.5">
                      {item.subtitle}
                    </span>
                    <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Structured Collaboration</span>
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                </div>
              </motion.div>
            );
          })}

          {/* Interactive Project Manager Workflow Callout Card with Intentional ~1-Second Scroll Delay */}
          <motion.div 
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, delay: 0.95, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 text-white rounded-2xl p-7 border border-blue-500/50 flex flex-col justify-between shadow-xl shadow-blue-600/20 relative overflow-hidden group"
          >
            {/* Background geometric line */}
            <div className="absolute inset-0 bg-grid-light opacity-10 pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-mono tracking-wider uppercase text-blue-100 font-semibold">
                  Direct Line of Communication
                </span>
              </div>

              <h3 className="text-xl font-bold font-display text-white">
                Seamless International Coordination
              </h3>

              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-body">
                Whether you are an architectural firm in the US, a structural consultant in the UK, or a contractor in the UAE, your dedicated Project Manager bridges time zones and coordinates directly inside your Autodesk Construction Cloud or CDE hub.
              </p>

              <div className="pt-2 space-y-1.5 text-xs text-blue-50 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" />
                  <span>Single contact point for all RFIs &amp; models</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" />
                  <span>Direct phone &amp; video coordination</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => onOpenBooking ? onOpenBooking('Dedicated Project Manager Consultation') : undefined}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-blue-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Book Free 1:1 PM Consultation</span>
              </button>
              <a
                href="#contact"
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-blue-700/80 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-blue-400/40"
              >
                <span>Scope RFP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
