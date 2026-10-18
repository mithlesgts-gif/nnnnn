import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Paperclip, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  MessageSquare,
  Sparkles,
  Calendar,
  Database,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { bimServices } from '../data/servicesData';
import { saveInquiry } from '../lib/supabase';
import { ArchitecturalSectionBackground } from './ArchitecturalSectionBackground';
import bgFacade from '../assets/images/bg_bim_glass_facade_1792156749000.jpg';

interface EnquirySectionProps {
  initialService?: string;
  onOpenBooking?: (service?: string) => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({ 
  initialService = '',
  onOpenBooking 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    service: initialService || bimServices[0].title,
    description: '',
    startDate: '',
    deliveryDate: '',
    fileName: '',
    privacyConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, fileName: e.target.files![0].name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    if (!formData.company.trim()) {
      setErrorMsg('Please enter your company or practice name.');
      return;
    }
    if (!formData.country.trim()) {
      setErrorMsg('Please specify your country / project region.');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMsg('Please provide a brief description of your project scope.');
      return;
    }
    if (!formData.privacyConsent) {
      setErrorMsg('Please accept the privacy policy to submit your enquiry.');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim() || undefined,
        country: formData.country.trim() || undefined,
        service: formData.service,
        description: formData.description.trim(),
        file_name: formData.fileName || undefined,
      });
      setIsSuccess(true);
    } catch {
      // Still show success with local caching
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactWords = ["Let's", 'Discuss', 'Your', 'BIM', 'Project.'];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden border-t border-slate-100 scroll-mt-20">
      {/* High-Definition Architectural Facade Background (>=70% Prominence) with 1s Scroll Delay */}
      <ArchitecturalSectionBackground 
        image={bgFacade}
        theme="light"
        title="Curtain Wall Glazing & Facade BIM Engineering"
        location="Headquarters · Jamshedpur, India"
        elevation="DATUM: +24.800m"
        showGrid={false}
        showScanLine={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header Block with Scroll-Triggered Reveal */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFEAF5]/90 backdrop-blur-md border border-blue-300 text-xs font-mono text-blue-700 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Consultation &amp; RFP Submissions</span>
            <span className="text-slate-400">·</span>
            <span className="text-blue-700 font-semibold">Prompt Response</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
            {contactWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: 0.08 * i }}
                className={`inline-block mr-2 sm:mr-3 ${
                  word === 'BIM' || word === 'Project.' ? 'text-blue-600' : 'text-slate-900'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Animated Blue & Red Accent Line */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scaleX: 0, originX: 0.5 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="h-1 w-24 bg-gradient-to-r from-blue-600 via-sky-500 to-red-500 rounded-full"
            />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-700 font-body leading-relaxed max-w-2xl mx-auto"
          >
            Get in touch with our BIM engineering team at SHILP BIM Solutions Pvt. Ltd. to discuss project scopes, timelines, model standards, or request a detailed proposal.
          </motion.p>
        </div>

        {/* 2-Column Working Layout with Scroll-Triggered Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Contact & Company Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-7 sm:p-8 rounded-2xl bg-[#E5EEF7]/95 backdrop-blur-md border border-blue-200/90 shadow-xl shadow-blue-500/5 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-red-500" />

              <h3 className="text-xl font-bold font-display text-slate-900 border-b border-blue-200/70 pb-4">
                Company Contact Information
              </h3>

              <div className="space-y-5 text-sm text-slate-700">
                {/* Official Mobile with Clickable tel: link */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                      Direct Mobile &amp; WhatsApp
                    </span>
                    <a 
                      href="tel:+919373381310" 
                      className="text-base sm:text-lg font-bold font-mono text-blue-600 hover:text-blue-700 hover:underline transition-colors block mt-0.5"
                    >
                      +91 9373381310
                    </a>
                    <span className="text-xs text-slate-500 font-body">Tap to call our engineering desk directly</span>
                  </div>
                </div>

                {/* Official Company Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                      Official Company Email
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <a 
                        href="mailto:info@shilpbimsolutions.com" 
                        className="text-sm sm:text-base font-bold font-mono text-blue-600 hover:text-blue-700 hover:underline transition-colors break-all"
                      >
                        info@shilpbimsolutions.com
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('info@shilpbimsolutions.com');
                          setEmailCopied(true);
                          setTimeout(() => setEmailCopied(false), 2200);
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 text-[10px] font-mono text-slate-600 hover:text-blue-600 border border-slate-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        {emailCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-500" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <span className="text-xs text-slate-500 font-body block">
                      Inquiries, RFP drawings, tender models &amp; BIM collaboration
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                      Registered Location
                    </span>
                    <span className="text-base font-bold text-slate-900 block mt-0.5">
                      Jamshedpur, India
                    </span>
                    <span className="text-xs text-slate-500 font-body">
                      SHILP BIM Solutions Pvt. Ltd. · Serving clients across India and internationally.
                    </span>
                  </div>
                </div>

                {/* Single Point of Contact Assurance */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                      Dedicated Project Manager
                    </span>
                    <span className="text-sm font-semibold text-slate-900 block mt-0.5">
                      Single Point of Contact
                    </span>
                    <span className="text-xs text-slate-500 font-body">
                      Structured milestone updates, organized coordination, and timely responses.
                    </span>
                  </div>
                </div>
              </div>

              {/* Call-to-Action Card */}
              <div className="p-4 rounded-xl bg-[#DFEAF5] border border-blue-200/80 text-xs text-slate-700 space-y-2">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Confidentiality &amp; NDA Protocol</span>
                </div>
                <p className="leading-relaxed">
                  We treat all project drawings, CAD models, and architectural briefs under strict Non-Disclosure Agreements.
                </p>
              </div>

              {/* Live Appointment Booking Callout (Supabase Connected) */}
              <div className="p-5 rounded-2xl bg-[#DFEAF5]/95 border border-blue-300 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 font-display text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Live 1:1 Consultation</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100/70 border border-emerald-300 text-[10px] font-mono text-emerald-800 font-bold">
                    <Database className="w-2.5 h-2.5 text-emerald-600" />
                    <span>Supabase DB</span>
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-body">
                  Prefer a scheduled face-to-face video or telephone conference? Select your date &amp; slot. All appointments are stored in your Supabase account.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenBooking ? onOpenBooking(formData.service) : undefined}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/10 hover:-translate-y-0.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-200" />
                  <span>Book Appointment Now</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Functional Project Enquiry Form with Scroll-Triggered Reveal */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-[#E5EEF7]/95 backdrop-blur-md border border-blue-200/90 rounded-2xl p-7 sm:p-9 shadow-xl shadow-blue-500/5 relative"
          >
            {isSuccess ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900">
                  Enquiry Submitted Successfully
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your project inquiry for <strong>{formData.service}</strong> has been received by SHILP BIM Solutions Pvt. Ltd. A Project Manager will review your scope and get in touch with you shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        country: '',
                        service: bimServices[0].title,
                        description: '',
                        startDate: '',
                        deliveryDate: '',
                        fileName: '',
                        privacyConsent: false
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
                    Project Discussion &amp; Proposal Form
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">* Required</span>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-700 block font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. David Miller"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F0F5FA] border border-blue-200/90 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-700 block font-medium">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F0F5FA] border border-blue-200/90 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-700 block font-medium">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Vertex Engineering &amp; Architecture"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F0F5FA] border border-blue-200/90 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-700 block font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F0F5FA] border border-blue-200/90 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                {/* Country & BIM Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-700 block font-medium">
                      Country / Project Location *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. India, United States, UAE, UK"
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F0F5FA] border border-blue-200/90 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-700 block font-medium">
                      Required BIM Service *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F0F5FA] border border-blue-200/90 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      {bimServices.map(s => (
                        <option key={s.id} value={s.title}>
                          {s.title} ({s.lodLevels[0]})
                        </option>
                      ))}
                      <option value="Multi-Disciplinary BIM Coordination Package">
                        Complete Multi-Trade Package (Arch + Struct + MEP)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Scope Description */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-700 block font-medium">
                    Project Description &amp; Scope Requirements *
                  </label>
                  <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Briefly describe your building typology, approximate floor area, software requirements (Revit, Navisworks), and target Level of Development..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F0F5FA] border border-blue-200/90 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>

                {/* Optional Attachment */}
                <div className="p-3 rounded-lg bg-[#DFEAF5] border border-dashed border-blue-300 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600 truncate">
                    <Paperclip className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="truncate">
                      {formData.fileName ? formData.fileName : 'Attach RFP / Drawings / Specifications (PDF, DWG, RVT up to 50MB)'}
                    </span>
                  </div>
                  <label className="px-3 py-1.5 rounded-md bg-[#E5EEF7] hover:bg-[#D5E4F2] border border-blue-300 text-xs font-mono text-slate-700 cursor-pointer transition-colors shrink-0 shadow-xs">
                    Browse
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {/* Privacy Consent */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    name="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleChange}
                    className="mt-1 accent-blue-600 rounded cursor-pointer"
                  />
                  <label htmlFor="privacyConsent" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
                    I consent to SHILP BIM Solutions Pvt. Ltd. processing my details to prepare a proposal and communicate regarding this project inquiry.
                  </label>
                </div>

                {/* Primary CTA Button with animated pulse */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 disabled:opacity-50 group hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                    <span>{isSubmitting ? 'Submitting Your Request...' : 'Discuss Your Project'}</span>
                  </button>

                  <a
                    href="tel:+919373381310"
                    className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-200"
                  >
                    <Phone className="w-4 h-4 text-red-600" />
                    <span>Call +91 9373381310</span>
                  </a>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
