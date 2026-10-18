import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PrivacyTermsModals: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#181F27] border border-[#39A9FF]/30 rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#101419] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#181F27] border border-[#39A9FF]/30 text-[#39A9FF]">
              {type === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions of Service'}
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Shilp BIM Solutions Private Limited · Effective October 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
          {type === 'privacy' ? (
            <>
              <h4 className="font-bold text-white text-base">1. Information We Collect</h4>
              <p>
                Shilp BIM Solutions Private Limited collects business contact details (name, corporate email, telephone, company name) and project drawing files submitted via our website forms or cloud repositories for the purpose of preparing technical proposals and executing BIM consultancy contracts.
              </p>

              <h4 className="font-bold text-white text-base">2. Project Data &amp; Intellectual Property Confidentiality</h4>
              <p>
                All drawings, CAD designs, specifications, point cloud scans, and 3D Revit models provided to Shilp BIM Solutions remain the exclusive intellectual property of the client. We do not distribute, sell, or publicly showcase client models or identifiable project details without an express written release. Mutual Non-Disclosure Agreements (NDAs) govern all client deliverables.
              </p>

              <h4 className="font-bold text-white text-base">3. Data Security &amp; Storage</h4>
              <p>
                We implement industry-standard encryption protocols (TLS/SSL for transmission and AES-256 for resting data) across all project repositories, including Autodesk Construction Cloud and segregated local storage arrays.
              </p>

              <h4 className="font-bold text-white text-base">4. Contacting Our Data Protection Officer</h4>
              <p>
                For data protection inquiries or to request deletion of your contact records, email: <strong>contact@shilpbim.com</strong>.
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-white text-base">1. Scope of BIM Consultancy Services</h4>
              <p>
                Shilp BIM Solutions Private Limited provides Building Information Modeling, clash detection, shop drawing extraction, and digital construction advisory services strictly in accordance with approved BIM Execution Plans (BEP) and written Statements of Work (SOW).
              </p>

              <h4 className="font-bold text-white text-base">2. Level of Development (LOD) &amp; Design Liability</h4>
              <p>
                Our BIM models reflect the design intent provided by the Architect of Record and Structural/MEP Engineers of Record. Shilp BIM Solutions coordinates trades and models constructability solutions; final engineering calculations and structural approvals remain the responsibility of licensed professional engineers of record.
              </p>

              <h4 className="font-bold text-white text-base">3. Milestones &amp; Model Approvals</h4>
              <p>
                Deliverables are issued in accordance with agreed milestone schedules. Clients are afforded an agreed review period to review clash reports and model submissions before final sign-off and milestone invoicing.
              </p>

              <h4 className="font-bold text-white text-base">4. Governing Law</h4>
              <p>
                These terms are governed by and construed in accordance with the laws of India, subject to international arbitration clauses specified in individual corporate contracts.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#101419] border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#39A9FF] text-[#101419] font-semibold text-xs transition-colors"
          >
            I Understand &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
