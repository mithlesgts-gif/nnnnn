import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { blogPosts } from '../data/blogData';
import { BlogPost } from '../types';
import { Clock, ArrowRight, BookOpen, X, Sparkles, FileText } from 'lucide-react';
import bgTower from '../assets/images/bg_modern_building_tower_1792162103443.jpg';

export const InsightsBlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const shouldReduceMotion = useReducedMotion();

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
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="insights" className="py-24 bg-gradient-to-b from-[#E2ECF7] via-[#EDF3FA] to-[#E3EDF6] relative overflow-hidden border-t border-blue-200/80 scroll-mt-20">
      {/* Architectural Skyscraper Background (Darkened by at least 10% with Cool Blue Scrim) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1.02, 1.07, 1.02], y: [0, -10, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <img
            src={bgTower}
            alt="Modern skyscraper architectural background"
            className="w-full h-full object-cover object-center opacity-[0.22] filter brightness-[0.88] contrast-110 saturate-[0.8] mix-blend-multiply"
          />
        </motion.div>
        {/* Cool-Blue Overlay Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#DFEAF5]/85 via-[#EBF2F9]/70 to-[#DFEAF5]/90" />
        <div className="absolute inset-0 bg-grid-light opacity-35" />
      </div>

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
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>AEC Engineering Knowledge Base</span>
              <span className="text-slate-400">·</span>
              <span className="text-red-600 font-semibold">Technical Insights</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="space-y-3"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
                Technical Insights &amp; BIM Best Practices
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
              Practical engineering articles on Level of Development specifications, Navisworks clash matrices, and reality capture standards.
            </motion.p>
          </div>
        </div>

        {/* 3-Article Grid Scrolling Naturally with Staggered Scroll-Triggered Reveal */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              onClick={() => setSelectedPost(post)}
              className="group bg-[#E5EEF7]/95 backdrop-blur-md rounded-2xl border border-blue-200/90 hover:border-blue-500 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer relative overflow-hidden"
            >
              {/* Dynamic Accent Top Border */}
              <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
                idx % 2 === 1 ? 'bg-red-500' : 'bg-blue-600'
              }`} />

              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className={`font-semibold ${idx % 2 === 1 ? 'text-red-600' : 'text-blue-600'}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-body">
                  {post.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-blue-200/70 space-y-3">
                <div className="text-[11px] font-mono text-slate-500">
                  Published · {post.date}
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Article Detail Reading Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-[#EBF2F9] border border-blue-200 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 sm:p-8 bg-[#DFEAF5] border-b border-blue-200/80 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-blue-600">
                  <span>{selectedPost.category}</span>
                  <span className="text-slate-400">·</span>
                  <span>{selectedPost.readTime}</span>
                  <span className="text-slate-400">·</span>
                  <span>{selectedPost.date}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                  {selectedPost.title}
                </h2>
                <div className="text-xs font-mono text-slate-600">
                  Authored by SHILP BIM Technical Engineering Team
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-lg bg-[#D2E2F0] hover:bg-[#C5D8EA] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm sm:text-base text-slate-800 leading-relaxed font-body">
              {selectedPost.content.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="p-5 bg-[#DFEAF5] border-t border-blue-200/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-600">
                SHILP BIM Solutions Technical Library
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
