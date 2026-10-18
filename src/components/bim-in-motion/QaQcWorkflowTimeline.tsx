import React, { useState } from 'react';
import { qaqcWorkflowStages } from '../../data/bimInMotionData';
import { QaQcStage } from '../../types';
import { 
  FolderDown, 
  Crosshair, 
  FileCheck, 
  AlertOctagon, 
  UserCheck, 
  RefreshCw, 
  ShieldCheck, 
  Check, 
  ChevronRight,
  AlertCircle,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';

export const QaQcWorkflowTimeline: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(4);
  const activeStage = qaqcWorkflowStages.find(s => s.id === activeStageId) || qaqcWorkflowStages[3];

  const getStageIcon = (id: number) => {
    switch (id) {
      case 1: return <FolderDown className="w-5 h-5" />;
      case 2: return <Crosshair className="w-5 h-5" />;
      case 3: return <FileCheck className="w-5 h-5" />;
      case 4: return <AlertOctagon className="w-5 h-5" />;
      case 5: return <UserCheck className="w-5 h-5" />;
      case 6: return <RefreshCw className="w-5 h-5" />;
      case 7: return <ShieldCheck className="w-5 h-5" />;
      default: return <FileCheck className="w-5 h-5" />;
    }
  };

  const getStatusColorClass = (type: QaQcStage['statusType']) => {
    switch (type) {
      case 'Normal':
        return 'text-slate-600 bg-slate-100 border-slate-200';
      case 'Audit':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Issue':
        return 'text-blue-800 bg-blue-100 border-blue-300';
      case 'Resolved':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Approved':
        return 'text-blue-800 bg-blue-100 border-blue-300';
    }
  };

  return (
    <div className="space-y-8 bg-slate-50/80 p-6 md:p-8 rounded-2xl border border-slate-200/90 relative overflow-hidden">
      {/* Background blueprint grid watermark */}
      <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 uppercase tracking-wider mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Module 02 · Quality Governance
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900">
            Seven-Stage QA/QC Model Validation Workflow
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            A disciplined verification pipeline separating geometric clash detection from model information parameters, coordinate datums, and drawing consistency.
          </p>
        </div>

        {/* Status indicator */}
        <div className="text-[11px] font-mono text-slate-700 bg-[#DFEAF5]/90 px-3 py-1.5 rounded-lg border border-blue-200/90 flex items-center gap-1.5 self-start shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Verification Protocol Live</span>
        </div>
      </div>

      {/* Horizontal Workflow Timeline Bar */}
      <div className="relative z-10 pt-4 pb-2 overflow-x-auto">
        <div className="min-w-[760px] relative">
          {/* Connecting Progress Line (Blue Only) */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-slate-200 z-0">
            <div 
              className="h-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 transition-all duration-500"
              style={{ width: `${((activeStageId - 1) / (qaqcWorkflowStages.length - 1)) * 100}%` }}
            />
          </div>

          {/* 7 Stage Nodes */}
          <div className="flex items-center justify-between relative z-10">
            {qaqcWorkflowStages.map((stage) => {
              const isActive = stage.id === activeStageId;
              const isPassed = stage.id < activeStageId;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className="flex flex-col items-center group focus:outline-none cursor-pointer"
                >
                  {/* Circle Node */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative ${
                      isActive
                        ? 'bg-[#DCE7F3] text-blue-700 border-2 border-blue-600 scale-110 shadow-lg shadow-blue-500/20'
                        : isPassed
                        ? 'bg-[#E5EEF7] text-blue-600 border border-blue-300 hover:border-blue-500'
                        : 'bg-[#DFEAF5] text-slate-600 border border-blue-200/90 hover:border-blue-400'
                    }`}
                  >
                    {isPassed ? (
                      <Check className="w-5 h-5 text-blue-600" />
                    ) : (
                      getStageIcon(stage.id)
                    )}

                    <span className="absolute -top-1.5 -right-1.5 text-[9px] font-mono font-bold w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center">
                      0{stage.id}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <span
                    className={`text-xs font-medium mt-3 text-center max-w-[95px] line-clamp-2 transition-colors ${
                      isActive ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-slate-900'
                    }`}
                  >
                    {stage.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Stage Inspection Card */}
      <div className="relative z-10 bg-[#E8F1F9]/95 rounded-2xl border border-blue-200/90 p-6 sm:p-7 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${getStatusColorClass(activeStage.statusType)}`}>
              {getStageIcon(activeStage.id)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-blue-600 font-semibold">Stage 0{activeStage.id} of 07</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border font-medium ${getStatusColorClass(activeStage.statusType)}`}>
                  {activeStage.statusLabel}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold font-display text-slate-900 mt-0.5">
                {activeStage.name}
              </h4>
            </div>
          </div>

          {/* Quick Step Buttons */}
          <div className="flex items-center gap-2">
            <button
              disabled={activeStageId === 1}
              onClick={() => setActiveStageId(prev => Math.max(1, prev - 1))}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg transition-colors font-medium"
            >
              Previous
            </button>
            <button
              disabled={activeStageId === 7}
              onClick={() => setActiveStageId(prev => Math.min(7, prev + 1))}
              className="px-3.5 py-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700 font-bold disabled:opacity-40 rounded-lg transition-colors shadow-xs"
            >
              Next Stage
            </button>
          </div>
        </div>

        {/* Technical Audit Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h5 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              Disciplinary Audit Scope
            </h5>
            <p className="text-sm text-slate-600 leading-relaxed">
              {activeStage.shortDesc}
            </p>
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-slate-600 space-y-1">
              <div className="font-semibold text-slate-900">Engineering Protocol Note:</div>
              <div>
                {activeStage.id === 4 
                  ? 'Geometric clash tests are prioritized: Hard collisions (Structure vs MEP) take precedence over clearance and insulation tolerances.'
                  : activeStage.id === 3
                  ? 'Information completeness audit verifies parameter existence (COBie/UniFormat) before geometric clash coordination begins.'
                  : 'All model audits are recorded in the central CDE with digital transmittal audit trails.'}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
              Verification Matrix Checklist
            </h5>
            <div className="space-y-2">
              {activeStage.fullAuditCriteria.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#DFEAF5]/80 border border-blue-200/80 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
