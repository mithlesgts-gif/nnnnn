import React, { useState } from 'react';
import { BimService } from '../types';
import { 
  X, 
  CheckCircle2, 
  Layers, 
  FileText, 
  HelpCircle, 
  Building2,
  Boxes,
  AlertTriangle,
  ScanLine,
  ClipboardCheck,
  Clock,
  Calculator,
  PenTool,
  Component,
  ShieldCheck
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: BimService | null;
  onClose: () => void;
  onEnquire: (serviceTitle: string) => void;
  onSelectRelated: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onEnquire,
  onSelectRelated
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scope' | 'workflow' | 'faqs'>('overview');

  if (!service) return null;

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'Boxes': return <Boxes className="w-6 h-6 text-blue-600" />;
      case 'Layers': return <Layers className="w-6 h-6 text-blue-600" />;
      case 'AlertTriangle': return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case 'FileText': return <FileText className="w-6 h-6 text-blue-600" />;
      case 'ScanLine': return <ScanLine className="w-6 h-6 text-blue-600" />;
      case 'ClipboardCheck': return <ClipboardCheck className="w-6 h-6 text-blue-600" />;
      case 'Clock': return <Clock className="w-6 h-6 text-blue-600" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-blue-600" />;
      case 'PenTool': return <PenTool className="w-6 h-6 text-blue-600" />;
      case 'Component': return <Component className="w-6 h-6 text-blue-600" />;
      default: return <Building2 className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#EAF1F8] border border-blue-200/90 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-[#DFEAF5] border-b border-blue-200/80 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#E5EEF7] border border-blue-200 text-blue-600 shrink-0 shadow-xs">
              {renderIcon(service.iconName)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-600">
                <span className="font-semibold">SHILP BIM CAPABILITY SPECIFICATION</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-700 font-semibold">{service.lodLevels.join(' · ')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                {service.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-[#D2E2F0] hover:bg-[#C5D8EA] border border-blue-300 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 sm:px-8 border-b border-blue-200/80 bg-[#E5EEF7] overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-700 bg-[#DFEAF5]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview &amp; Benefits
          </button>
          <button
            onClick={() => setActiveTab('scope')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'scope'
                ? 'border-blue-600 text-blue-700 bg-[#DFEAF5]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Scope &amp; Deliverables
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'workflow'
                ? 'border-blue-600 text-blue-700 bg-[#DFEAF5]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Execution Workflow
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'faqs'
                ? 'border-blue-600 text-blue-700 bg-[#DFEAF5]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Technical FAQs
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                  Service Description
                </h4>
                <p className="text-slate-700 leading-relaxed text-base font-body">
                  {service.fullDesc}
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                  Operational Value &amp; Engineering Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#DFEAF5] border border-blue-200/80 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Software Suite */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                  Software Toolset
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.software.map((sw, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-[#DFEAF5] border border-blue-200 text-xs font-mono text-blue-700 font-medium">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scope' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                  Standard Scope of Modeling &amp; Engineering
                </h4>
                <div className="space-y-2">
                  {service.scope.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#DFEAF5] border border-blue-200/80 text-xs text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                  Deliverables Issued
                </h4>
                <div className="space-y-2">
                  {service.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#DFEAF5] border border-blue-200/80 text-xs text-slate-800">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                Four-Stage Delivery Workflow
              </h4>
              <div className="space-y-3">
                {service.workflow.map((wf, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#DFEAF5] border border-blue-200/80 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      0{i + 1}
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-bold text-slate-900 text-sm font-display">{wf.step}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">{wf.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold">
                Technical FAQs
              </h4>
              <div className="space-y-3">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#DFEAF5] border border-blue-200/80 space-y-1.5">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 sm:p-6 bg-[#DFEAF5] border-t border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Dedicated Project Manager coordination</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onEnquire(service.title);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Discuss This Service
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
