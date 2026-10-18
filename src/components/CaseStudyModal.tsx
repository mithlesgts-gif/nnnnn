import React from 'react';
import { ProjectCaseStudy } from '../types';
import { X, CheckCircle2, AlertTriangle, Layers, Calendar, MapPin, Maximize2, ShieldCheck, ArrowRight } from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onEnquire: (projectTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onEnquire }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#EAF1F8] border border-blue-200/90 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Project Image Banner */}
        <div className="relative h-64 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white bg-slate-900/70 hover:bg-slate-900 rounded-full transition-colors z-10 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Metadata Overlay */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-300">
              <span>{project.category}</span>
              <span className="text-slate-400">·</span>
              <span>{project.clientSector}</span>
              <span className="text-slate-400">·</span>
              <span className="text-white font-semibold">{project.lod}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#DFEAF5] border border-blue-200/80">
              <span className="text-[10px] font-mono text-slate-500 block">Gross Area</span>
              <span className="text-xs font-bold text-slate-900 font-mono">{project.area}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-100/70 border border-blue-300/80">
              <span className="text-[10px] font-mono text-blue-700 block">Level of Detail</span>
              <span className="text-xs font-bold text-blue-800 font-mono">{project.lod}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#DFEAF5] border border-blue-200/80">
              <span className="text-[10px] font-mono text-slate-500 block">Sector Classification</span>
              <span className="text-xs font-bold text-slate-900 font-mono truncate block">{project.clientSector}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#DFEAF5] border border-blue-200/80">
              <span className="text-[10px] font-mono text-slate-500 block">Software Used</span>
              <span className="text-xs font-bold text-slate-900 font-mono truncate block">{project.software[0]}</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
              Capability Brief &amp; Engineering Summary
            </h4>
            <p className="text-slate-700 leading-relaxed text-sm font-body">
              {project.summary}
            </p>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-2">
              <div className="text-xs font-mono font-bold text-red-600 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Coordination Challenge
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-body">
                {project.challenge}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#DFEAF5] border border-blue-200/80 space-y-2">
              <div className="text-xs font-mono font-bold text-blue-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Engineered BIM Solution
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-body">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
              Demonstrated Engineering Results
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.results.map((res, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#DFEAF5] border border-blue-200/80 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
              Standard Milestone Deliverables
            </h4>
            <div className="space-y-2">
              {project.deliverables.map((del, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#DFEAF5] border border-blue-200/80 text-xs text-slate-800">
                  <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 bg-[#DFEAF5] border-t border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-600">
            Have a project with similar coordination requirements?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onEnquire(project.title);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Discuss a Similar Project
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#E5EEF7] border border-blue-300 text-slate-700 hover:bg-[#D5E4F2] text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
